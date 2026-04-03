import { Router, Request, Response } from 'express';
import { streamText, LanguageModelV1, smoothStream } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

const router = Router();

/**
 * POST /api/chat
 *
 * Streams an AI chat response for resume assistance.
 * This route mirrors the Next.js App Router handler at
 * frontend/src/app/api/chat/route.ts and is intended for
 * standalone backend deployments.
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { messages, target_role, config, job, resume } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'messages array is required' });
      return;
    }

    // Resolve AI provider and model from config
    const provider = config?.provider ?? 'openai';
    const modelId = config?.model ?? 'gpt-4o-mini';
    const apiKey = config?.apiKey as string | undefined;

    let model: LanguageModelV1;

    if (provider === 'anthropic') {
      const anthropic = createAnthropic({ apiKey: apiKey ?? process.env.ANTHROPIC_API_KEY });
      model = anthropic(modelId) as unknown as LanguageModelV1;
    } else {
      const openai = createOpenAI({ apiKey: apiKey ?? process.env.OPENAI_API_KEY });
      model = openai(modelId) as unknown as LanguageModelV1;
    }

    const systemPrompt = `You are an expert resume assistant. Help the user improve their resume.
Target role: ${target_role ?? 'Not specified'}.
Job context: ${job ? JSON.stringify(job) : 'No job specified'}.
Current resume: ${resume ? `${resume.first_name} ${resume.last_name} - ${resume.target_role}` : 'No resume data'}.`;

    const result = streamText({
      model,
      system: systemPrompt,
      messages,
      maxSteps: 5,
      experimental_transform: smoothStream({ delayInMs: 20, chunking: 'word' }),
    });

    // Pipe streaming response
    const dataStream = result.toDataStreamResponse({
      sendUsage: false,
      getErrorMessage: (error) => {
        if (!error) return 'Unknown error';
        if (error instanceof Error) return error.message;
        return JSON.stringify(error);
      },
    });

    // Forward headers and body from the AI SDK response to Express
    dataStream.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.status(dataStream.status);

    const reader = dataStream.body?.getReader();
    if (!reader) {
      res.end();
      return;
    }

    const pump = async () => {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        return;
      }
      res.write(value);
      await pump();
    };

    await pump();
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
});

export default router;
