class PromptGenerator {
    constructor(agent, geminiService = null) {
        this.agent = agent;
        this.geminiService = geminiService;
    }

    async generate() {
        let basePrompt;
        
        switch(this.agent.type) {
            case 'agent':
                basePrompt = this.generateAgentPrompt();
                break;
            case 'webapp':
                basePrompt = this.generateWebAppPrompt();
                break;
            case 'mobile':
                basePrompt = this.generateMobilePrompt();
                break;
            case 'api':
                basePrompt = this.generateAPIPrompt();
                break;
            case 'workflow':
                basePrompt = this.generateWorkflowPrompt();
                break;
            case 'product':
                basePrompt = this.generatePRDPrompt();
                break;
            default:
                basePrompt = this.generateAgentPrompt();
        }

        // If Gemini service is available, enhance the prompt with AI reasoning
        if (this.geminiService && this.geminiService.validateApiKey()) {
            try {
                const enhancedPrompt = await this.geminiService.enhancePromptWithReasoning(this.agent, basePrompt);
                return enhancedPrompt;
            } catch (error) {
                console.error('Error enhancing prompt:', error);
                return basePrompt;
            }
        }

        return basePrompt;
    }

    generateToolRecommendations() {
        const recommendations = [];
        const needs = this.agent.needs || [];
        
        if (needs.includes('database')) {
            recommendations.push("**Database:** Supabase - PostgreSQL with built-in auth, realtime, storage. No other DB needed.");
        }
        
        if (needs.includes('user_auth')) {
            if (!needs.includes('database')) {
                recommendations.push("**Authentication:** Clerk - Production-ready auth with social logins. Skip NextAuth.");
            }
        }
        
        if (needs.includes('files')) {
            if (needs.includes('database')) {
                recommendations.push("**File Storage:** Supabase Storage (already included with DB)");
            } else {
                recommendations.push("**File Storage:** Vercel Blob - Integrated with deployment platform");
            }
        }
        
        if (needs.includes('realtime')) {
            if (!needs.includes('database')) {
                recommendations.push("**Realtime:** Socket.io - Battle-tested WebSocket solution");
            }
        }
        
        if (needs.includes('ai')) {
            recommendations.push("**AI Integration:** OpenAI API - Industry standard with GPT-4 turbo");
        }
        
        if (needs.includes('payments')) {
            recommendations.push("**Payments:** Stripe - Industry standard, comprehensive docs, battle-tested");
        }
        
        if (needs.includes('email')) {
            recommendations.push("**Email Service:** Resend - Modern email API, great DX, reliable delivery");
        }
        
        if (needs.includes('analytics')) {
            recommendations.push("**Analytics:** PostHog - Complete product analytics, self-hostable option");
        }
        
        if (needs.includes('search')) {
            recommendations.push("**Search:** Algolia - Instant search, excellent React components");
        }
        
        return recommendations;
    }

    generateAgentPrompt() {
        let prompt = "**Role:** You are a senior principal engineer with 15+ years building production AI systems.\n\n";
        prompt += "**Approach:** Provide exact, battle-tested solutions. No options or alternatives - just the best approach.\n\n";
        prompt += `**Project Name:** ${this.agent.name}\n\n`;

        if (this.agent.type === 'team') {
            prompt += "**Agent Type:** Team of Agents\n\n";
            prompt += "**Team Structure:**\n";
            prompt += "- Define a primary agent and the necessary sub-agents.\n";
            prompt += "- Specify the roles and responsibilities for each agent.\n";
            prompt += "- Detail the communication protocol between the agents.\n";
            if (this.geminiService) {
                prompt += "- Recommend a multi-agent framework (e.g., Sequential, Parallel, A2A) and justify the choice based on the project requirements.\n";
            }
        } else {
            prompt += "**Agent Type:** Single Agent\n\n";
        }

        prompt += "**Requirements:**\n";
        this.agent.needs.forEach(need => {
            const needMap = {
                'user_auth': 'User authentication and management',
                'database': 'Data persistence and retrieval',
                'realtime': 'Real-time communication features',
                'files': 'File upload and storage',
                'ai': 'AI/LLM integration',
                'payments': 'Payment processing',
                'email': 'Email notifications',
                'analytics': 'Usage analytics',
                'search': 'Search functionality'
            };
            prompt += `- ${needMap[need] || need}\n`;
        });
        
        prompt += "\n**Recommended Tools:**\n";
        const tools = this.generateToolRecommendations();
        tools.forEach(tool => {
            prompt += `- ${tool}\n`;
        });
        
        prompt += "\n**What You'll Build:**\n";
        prompt += "1. Production-ready code - Not a prototype\n";
        prompt += "2. Docker Compose setup - One command to run\n";
        prompt += "3. .env.example with ALL variables\n";
        prompt += "4. Deployment scripts for Railway/Fly.io\n";
        prompt += "5. Monitoring with Sentry already integrated\n";
        
        return prompt;
    }

    generateWebAppPrompt() {
        let prompt = "**Role:** You are a tech lead who ships production apps at scale. You make decisions, not suggestions.\n\n";
        prompt += "**Approach:** Exact tech stack, no alternatives. Production-ready patterns only.\n\n";
        prompt += `**Project Name:** ${this.agent.name}\n\n`;
        
        prompt += "**Requirements:**\n";
        this.agent.needs.forEach(need => {
            const needMap = {
                'user_auth': 'User authentication and management',
                'database': 'Data persistence and retrieval',
                'realtime': 'Real-time updates',
                'files': 'File upload and storage',
                'ai': 'AI/LLM features',
                'payments': 'Payment processing',
                'email': 'Email notifications',
                'analytics': 'User analytics',
                'search': 'Search functionality'
            };
            prompt += `- ${needMap[need] || need}\n`;
        });
        
        prompt += "\n**EXACT Stack (Use These, Period):**\n";
        prompt += "- **Framework:** Next.js 14 App Router - No Pages Router\n";
        prompt += "- **Styling:** Tailwind CSS + shadcn/ui - No other UI libraries\n";
        prompt += "- **State:** Zustand for complex, Context for simple - No Redux\n";
        prompt += "- **Forms:** react-hook-form + zod - No Formik\n";
        prompt += "- **Deployment:** Vercel - No alternatives\n";
        
        const tools = this.generateToolRecommendations();
        tools.forEach(tool => {
            prompt += `- ${tool}\n`;
        });
        
        prompt += "\n**Exact Implementation:**\n";
        prompt += "1. Feature-based folder structure - /features/[feature]/\n";
        prompt += "2. Server Components by default, Client only when needed\n";
        prompt += "3. API routes in /app/api using Route Handlers\n";
        prompt += "4. Prisma schema with proper indexes from day 1\n";
        prompt += "5. Auth middleware protecting all routes except public\n";
        prompt += "6. GitHub Actions CI/CD to Vercel ready to go\n";
        
        return prompt;
    }

    generateMobilePrompt() {
        let prompt = "**Role:** You are a mobile architect who ships apps to millions. You know what works.\n\n";
        prompt += "**Approach:** One stack, best practices, no debates.\n\n";
        prompt += `**Project Name:** ${this.agent.name}\n\n`;
        
        prompt += "**Requirements:**\n";
        this.agent.needs.forEach(need => {
            const needMap = {
                'user_auth': 'User authentication',
                'database': 'Local and cloud data storage',
                'realtime': 'Real-time features',
                'files': 'Media handling',
                'ai': 'AI features',
                'payments': 'In-app purchases',
                'email': 'Push notifications',
                'analytics': 'User tracking',
                'search': 'Content search'
            };
            prompt += `- ${needMap[need] || need}\n`;
        });
        
        prompt += "\n**THE Stack:**\n";
        prompt += "- **Framework:** React Native + Expo - No Flutter debates\n";
        prompt += "- **State:** Zustand - No MobX, No Redux\n";
        prompt += "- **Navigation:** React Navigation v6 - The standard\n";
        prompt += "- **Development:** Expo Go for dev, EAS Build for production\n";
        
        const tools = this.generateToolRecommendations();
        tools.forEach(tool => {
            prompt += `- ${tool}\n`;
        });
        
        return prompt;
    }

    generateAPIPrompt() {
        let prompt = "**Role:** You are a backend architect who builds APIs that scale to billions of requests.\n\n";
        prompt += "**Approach:** Production patterns only. One way to do things right.\n\n";
        prompt += `**Project Name:** ${this.agent.name}\n\n`;
        
        prompt += "**Requirements:**\n";
        this.agent.needs.forEach(need => {
            const needMap = {
                'user_auth': 'Authentication & authorization',
                'database': 'Data persistence',
                'realtime': 'WebSocket connections',
                'files': 'File handling',
                'ai': 'AI service integration',
                'payments': 'Payment processing',
                'email': 'Email service',
                'analytics': 'API analytics',
                'search': 'Search endpoints'
            };
            prompt += `- ${needMap[need] || need}\n`;
        });
        
        prompt += "\n**THE Backend Stack:**\n";
        prompt += "- **Runtime:** Node.js + TypeScript - Bun isn't ready for production\n";
        prompt += "- **Framework:** Fastify - Faster than Express, better DX\n";
        prompt += "- **API Style:** REST with OpenAPI 3.1 - GraphQL only if truly needed\n";
        prompt += "- **Validation:** Zod everywhere - Type safety from edge to DB\n";
        prompt += "- **ORM:** Prisma - Best DX, type-safe queries\n";
        
        const tools = this.generateToolRecommendations();
        tools.forEach(tool => {
            prompt += `- ${tool}\n`;
        });
        
        prompt += "\n**Non-Negotiable Architecture:**\n";
        prompt += "1. RESTful routes: GET /items, POST /items, etc.\n";
        prompt += "2. Consistent error format: { error: { code, message } }\n";
        prompt += "3. JWT auth with refresh tokens - 15min/7day expiry\n";
        prompt += "4. Rate limiting: 100 req/min per IP, 1000 per user\n";
        prompt += "5. Global error handler - Never leak stack traces\n";
        prompt += "6. Request ID tracking - Every request gets traced\n";
        
        return prompt;
    }

    generateWorkflowPrompt() {
        let prompt = "**Role:** You architect automation that saves companies millions in operational costs.\n\n";
        prompt += "**Approach:** Best tool for the job. No compromise on reliability.\n\n";
        prompt += `**Workflow Name:** ${this.agent.name}\n\n`;
        
        prompt += "**Requirements:**\n";
        this.agent.needs.forEach(need => {
            const needMap = {
                'user_auth': 'User verification steps',
                'database': 'Data storage nodes',
                'realtime': 'Real-time triggers',
                'files': 'File processing',
                'ai': 'AI processing nodes',
                'payments': 'Payment triggers',
                'email': 'Email automation',
                'analytics': 'Workflow analytics',
                'search': 'Data lookup nodes'
            };
            prompt += `- ${needMap[need] || need}\n`;
        });
        
        prompt += "\n**Platform Decision:**\n";
        prompt += "- **For Engineers:** n8n self-hosted - Full control, code when needed\n";
        prompt += "- **For Non-Technical:** Make.com - Visual, reliable, great support\n";
        prompt += "- **Never:** Zapier for complex workflows - Too limited\n";
        
        prompt += "\n**Workflow Components:**\n";
        prompt += "1. Triggers (what starts the workflow)\n";
        prompt += "2. Actions (what the workflow does)\n";
        prompt += "3. Conditions (decision points)\n";
        prompt += "4. Error handling\n";
        
        return prompt;
    }

    generatePRDPrompt() {
        let prompt = "**Role:** You are a VP of Product who ships features users actually want.\n\n";
        prompt += "**Approach:** Clear specs, no ambiguity. Technical decisions included.\n\n";
        prompt += `**Product Name:** ${this.agent.name}\n\n`;
        
        prompt += "**Core Features:**\n";
        this.agent.needs.forEach(need => {
            const needMap = {
                'user_auth': 'User account system with authentication',
                'database': 'Data storage and management',
                'realtime': 'Real-time features and live updates',
                'files': 'File upload and management',
                'ai': 'AI-powered features',
                'payments': 'Payment and subscription handling',
                'email': 'Email notifications and communications',
                'analytics': 'Analytics and reporting dashboard',
                'search': 'Search and discovery features'
            };
            prompt += `- ${needMap[need] || need}\n`;
        });
        
        prompt += "\n**Recommended Technical Stack:**\n";
        const tools = this.generateToolRecommendations();
        tools.forEach(tool => {
            prompt += `- ${tool}\n`;
        });
        
        prompt += "\n**PRD Sections to Include:**\n";
        prompt += "1. Executive Summary\n";
        prompt += "2. Problem Statement\n";
        prompt += "3. User Personas\n";
        prompt += "4. User Stories\n";
        prompt += "5. Feature Specifications\n";
        prompt += "6. Technical Requirements\n";
        prompt += "7. Success Metrics\n";
        prompt += "8. Timeline and Milestones\n";
        
        return prompt;
    }
}
