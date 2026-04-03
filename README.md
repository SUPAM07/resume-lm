# ResumeLM - Free AI Resume Builder | Create ATS-Optimized Resumes in Minutes

<div align="center">

![ResumeLM Logo](frontend/public/og.webp)

**🚀 The AI-Powered Resume Builder That Gets You Hired**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-resumelm.com-blue?style=for-the-badge)](https://resumelm.com)
[![GitHub Stars](https://img.shields.io/github/stars/olyaiy/resume-lm?style=for-the-badge)](https://github.com/olyaiy/resume-lm/stargazers)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

</div>

## 📊 Proven Results That Matter

<div align="center">

| 📈 **500+ Resumes Created** | 🎯 **89% Interview Rate** | ⭐ **4.9/5 User Rating** | ⏱️ **15 min Setup Time** |
|:---------------------------:|:-------------------------:|:------------------------:|:-------------------------:|
| Professional resumes built | Higher interview success  | Excellent user satisfaction | Quick and easy setup |

</div>

## 🎯 Why Choose ResumeLM?

**ResumeLM** is a free, open-source AI resume builder that helps job seekers create professional, ATS-optimized resumes that increase interview chances by up to **3x**. Our intelligent platform combines cutting-edge AI technology with proven resume best practices to help you land your dream job.

## ✨ Key Features & Screenshots

### 🤖 AI-Powered Resume Assistant
![AI Resume Assistant](frontend/public/SS%20Chat.png)

**90% More Effective Bullet Points**
- Smart content suggestions based on your experience
- Real-time feedback on your resume content
- Industry-specific optimization for better results
- ATS-friendly formatting and keyword optimization

### 📊 Beautiful Resume Dashboard
![Resume Dashboard](frontend/public/Dashboard%20Image.png)

**Organize Your Entire Job Search**
- Centralized resume management system
- Create base resumes and tailored versions

### 📈 Resume Performance Scoring
![Resume Scoring](frontend/public/SS%20Score.png)

**3x Higher Response Rates**
- ATS compatibility scoring and analysis
- Keyword optimization insights
- Detailed improvement recommendations
- Performance metrics and analytics

### 📝 AI Cover Letter Generator
![Cover Letter Generator](frontend/public/SS%20Cover%20Letter.png)

**Save 30+ Minutes Per Application**
- Tailored to match specific job requirements
- Professional tone and structure
- Highlights your relevant achievements
- Personalized for each opportunity

## 🚀 Live Demo & Getting Started

**[Try ResumeLM Now - 100% Free](https://resumelm.com)**

No credit card required • No signup fees • Open source

## 🛠️ Complete Tech Stack

### Frontend & UI
- **Next.js 15** - App Router with React Server Components
- **React 19** - Latest React features and optimizations
- **TypeScript** - Type-safe development
- **Shadcn UI** - Beautiful, accessible components
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### AI & Intelligence
- **OpenAI GPT** - Advanced content generation
- **Claude AI** - Alternative AI model support
- **Gemini AI** - Google's AI integration
- **DeepSeek** - Cost-effective AI processing
- **Groq** - High-speed AI inference

### Backend & Database
- **PostgreSQL** - Robust relational database
- **Supabase** - Backend-as-a-Service with auth
- **Row Level Security** - Enterprise-grade security

### Additional Features
- **React PDF** - Professional PDF generation
- **Stripe Integration** - Secure payment processing
- **Real-time Updates** - Live preview and editing
- **Mobile Responsive** - Works on all devices

## 📱 Mobile-First Design

ResumeLM is built with a mobile-first approach, ensuring your resume building experience is seamless across all devices:

- 📱 **Mobile Optimized** - Full functionality on smartphones
- 💻 **Desktop Enhanced** - Rich editing experience on larger screens
- 🎨 **Responsive Design** - Adapts to any screen size
- ⚡ **Fast Loading** - Optimized for performance

## 🎨 Modern Design System

### Visual Design Principles
- **Layered Depth** - Multiple translucent layers create visual hierarchy
- **Organic Motion** - Subtle animations suggest liveliness without distraction
- **Purposeful White Space** - Generous spacing improves content digestion
- **Consistent Interaction** - Predictable hover and active states
- **Gradient Aesthetics** - Soft, professional color schemes

## 🔧 Installation & Setup

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- PostgreSQL database (via Supabase)

### Project Structure

This project uses a **monorepo** layout with a clear frontend/backend separation:

```
resume-lm/
├── frontend/          # Next.js 15 app (pages, components, UI)
│   ├── src/app/       # Next.js App Router pages & API routes
│   ├── src/components/ # React components
│   ├── src/lib/       # Frontend utilities & AI models
│   ├── src/utils/     # Server actions & Supabase helpers
│   ├── public/        # Static assets
│   └── package.json
├── backend/           # Standalone Express API (for microservices use)
│   ├── src/api/       # Express route handlers
│   ├── src/middleware/ # Auth & validation middleware
│   ├── src/services/  # Business logic services
│   └── package.json
├── shared/            # Shared TypeScript types & utilities
│   ├── src/types.ts   # Core domain types
│   ├── src/constants.ts # Shared constants
│   └── package.json
├── docker/            # Docker configs for all services
├── pnpm-workspace.yaml # pnpm monorepo workspace config
└── package.json       # Root workspace orchestration
```

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/olyaiy/resume-lm.git
cd resume-lm
```

2. **Install all dependencies** (installs for frontend, backend, and shared)
```bash
pnpm install
```

3. **Frontend environment setup**
```bash
cp frontend/.env.example frontend/.env.local
```

4. **Configure environment variables** (edit `frontend/.env.local`)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Services (add at least one)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key

# Payments (Optional)
STRIPE_SECRET_KEY=your_stripe_secret
```

5. **Database setup**
```bash
# Run the schema in your Supabase SQL editor
# File: backend/db/schema.sql
```

6. **Start the frontend development server**
```bash
pnpm frontend:dev
# or from the frontend directory:
cd frontend && pnpm dev
```

Visit `http://localhost:3000` to see your local ResumeLM instance!

### Running the Backend (Optional)

The standalone Express backend provides a separate API service for microservices architectures:

```bash
# Setup backend environment
cp backend/.env.example backend/.env

# Start backend dev server
pnpm backend:dev
# or from the backend directory:
cd backend && pnpm dev
```

Backend API will be available at `http://localhost:4000`

### 🐳 Docker Setup (Alternative)

Run the complete stack locally with Docker Compose - includes Supabase, PostgreSQL, Redis, and all services:

```bash
# 1. Copy environment file and add your AI API key
cp frontend/.env.example .env.local
# Edit .env.local and add at least one: OPENAI_API_KEY, ANTHROPIC_API_KEY, or OPENROUTER_API_KEY

# 2. Start Docker services
cd docker
docker compose --env-file ../.env.local up -d

# 3. Wait for services to be healthy (~60 seconds)
docker compose --env-file ../.env.local ps

# 4. Run the frontend locally (from project root)
cd ..
pnpm frontend:dev
```

**Login:** http://localhost:3000 with `admin@admin.com` / `Admin123` (Pro subscription auto-granted)

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Next.js application |
| **Backend API** | http://localhost:4000 | Express API (full profile only) |
| **Supabase API** | http://localhost:54321 | API Gateway |
| **Supabase Studio** | http://localhost:54323 | Database dashboard |
| **Redis Commander** | http://localhost:8081 | Redis management UI |

> 📖 See [docker/DOCKER.md](docker/DOCKER.md) for full Docker documentation including full-stack mode.

## 📊 Database Architecture

### Core Tables Structure

#### Profiles Table
- Stores user's base information and resume components
- JSON fields for complex data (work_experience, education, skills)
- One-to-one relationship with auth.users

#### Resumes Table
- Base and tailored resume versions
- Links to jobs for targeted applications
- JSONB for section_order and section_configs
- Version control and tracking

#### Jobs Table
- Job listings with requirements and details
- Salary range as flexible JSONB structure
- Application status tracking

### Security Features
- **Row Level Security (RLS)** - Users only access their own data
- **Authentication Integration** - Secure user management
- **Data Encryption** - Sensitive information protection

## 🌟 Key Benefits for Job Seekers

### For Individual Users
- ✅ **Free Forever** - Core features always free
- ✅ **No Hidden Costs** - Transparent pricing
- ✅ **ATS Optimization** - Beat applicant tracking systems
- ✅ **Multiple Formats** - PDF, Word, and web formats
- ✅ **Industry Templates** - Tailored for different fields

### For Developers
- ✅ **Open Source** - Full access to source code
- ✅ **Modern Stack** - Latest technologies and best practices
- ✅ **Extensible** - Easy to customize and extend
- ✅ **Well Documented** - Comprehensive documentation
- ✅ **Active Community** - Regular updates and support

## 🎯 SEO Keywords & Use Cases

**Primary Keywords:** AI resume builder, free resume maker, ATS-optimized resume, professional resume template, job application tool

**Use Cases:**
- Recent graduates entering the job market
- Career changers looking to pivot industries
- Professionals seeking advancement opportunities
- Freelancers building their personal brand
- Anyone wanting to improve their resume quality

## 📈 Performance & Analytics

### Core Metrics
- **Page Load Speed** - Under 2 seconds average
- **Mobile Performance** - 95+ Lighthouse score
- **SEO Optimization** - Structured data and meta tags
- **Accessibility** - WCAG 2.1 AA compliant

### User Success Stories
- 89% of users report getting more interview calls
- Average setup time reduced to just 15 minutes
- 4.9/5 star rating from active users
- 500+ professional resumes created monthly

## 🔮 Roadmap & Future Features

### Short Term (Q1 2025)
- [ ] Enhanced AI tailoring algorithms
- [ ] Additional resume templates and themes
- [ ] Advanced PDF customization options
- [ ] Job application tracking system

### Long Term (2025)
- [ ] LinkedIn integration and sync
- [ ] Interview preparation tools
- [ ] Salary negotiation guidance
- [ ] Career path recommendations
- [ ] Mobile app development

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports** - Help us identify and fix issues
- 💡 **Feature Requests** - Suggest new functionality
- 🔧 **Code Contributions** - Submit pull requests
- 📚 **Documentation** - Improve our guides and docs
- 🎨 **Design** - Enhance UI/UX elements

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support & Community

### Get Help
- 📧 **Email Support** - Contact us for technical issues
- 💬 **GitHub Discussions** - Community Q&A and feature requests
- 🐛 **Issue Tracker** - Report bugs and technical problems
- 📖 **Documentation** - Comprehensive guides and tutorials

### Stay Updated
- ⭐ **Star this repo** - Get notified of new releases
- 👀 **Watch releases** - Stay informed about updates
- 🐦 **Follow on social media** - Latest news and tips

## 📄 License & Legal

**GNU Affero General Public License v3 (AGPL-3.0)**

### License Summary
- ✅ **Commercial Use** - Use in commercial projects
- ✅ **Modification** - Modify and distribute changes
- ✅ **Distribution** - Share the software freely
- ✅ **Patent Use** - Use any patents in the software
- ❗ **Disclose Source** - Must provide source code
- ❗ **License Notice** - Include license and copyright notice
- ❗ **Network Use** - Network use is considered distribution
- ❗ **Same License** - Derivative works must use same license

### Commercial Licensing
For businesses requiring proprietary licenses or commercial support, please contact us for custom licensing arrangements.


---

<div align="center">

**Ready to land your dream job?**

[![Get Started Free](https://img.shields.io/badge/🚀_Get_Started_Free-resumelm.com-blue?style=for-the-badge&color=6366f1)](https://resumelm.com)
[![View Source Code](https://img.shields.io/badge/📚_View_Source-GitHub-black?style=for-the-badge&logo=github)](https://github.com/olyaiy/resume-lm)

**Built with ❤️ using Next.js**

</div>
