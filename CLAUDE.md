# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AgentSpec is a universal planning platform for developers - a web-based wizard that generates AI-powered specifications for any type of software project. It uses a simple, gamified interface to gather project requirements and outputs detailed technical specifications, PRDs, or implementation plans.

## Architecture

### Application Structure
- **Single HTML File Architecture**: The entire application runs from `index.html` with embedded CSS and JavaScript
- **No Build Process**: Direct browser execution without compilation or dependencies
- **Wizard Pattern**: 3-step flow with progress tracking and smart tool recommendations

### Key Components

**index.html**
- Self-contained application with all styles and logic embedded
- Uses Tailwind CSS from CDN for styling
- Font Awesome icons for visual elements
- Custom CSS for progress bars, toggles, and loading states
- JavaScript manages the simplified wizard flow
- API configuration section for Gemini Flash 2.5 integration
- Toggle switch for enabling AI reasoning enhancement
- Project name and description inputs for context

**prompt-generator.js**
- `PromptGenerator` class handles prompt generation for multiple project types
- Smart tool recommendations based on selected needs
- Async generation with optional Gemini AI enhancement
- Accepts both agent data and geminiService instance
- Project types supported:
  - `generateAgentPrompt()`: AI agents and bots
  - `generateWebAppPrompt()`: Web applications
  - `generateMobilePrompt()`: Mobile apps
  - `generateAPIPrompt()`: APIs and backends
  - `generateWorkflowPrompt()`: Automation workflows
  - `generatePRDPrompt()`: Product requirement documents

**gemini-service.js**
- `GeminiService` class for Google Gemini 2.0 Flash (2.5) API integration
- Uses model: `gemini-2.0-flash-exp`
- Enhances prompts with structured architectural insights:
  - Project Context summary
  - Architecture Analysis with reasoning
  - Task-based Implementation Roadmap (not time-based)
  - Technical Considerations (integration, performance, security)
  - Success Metrics
  - Challenges & Solutions table
  - Pro Tips
- Methods:
  - `enhancePromptWithReasoning()`: Adds AI-powered architectural insights
  - `getArchitecturalRecommendations()`: Provides specific tech recommendations
  - `validateApiKey()`: Basic API key validation
- Secure API key handling with localStorage
- Comprehensive error logging and user alerts

### Wizard Flow
1. **Project Type**: Choose what you're building (agent, web app, mobile, API, workflow, PRD)
2. **Project Needs**: Simple checkboxes for requirements (auth, database, AI, etc.)
3. **Project Details**: Provide name and description for context
4. **Spec Generation**: Get AI-ready prompt with smart tool recommendations, optionally enhanced with Gemini 2.5

### Smart Tool Recommendations
The system automatically recommends tools based on selected needs:
- Database → Supabase (includes auth & storage)
- Auth (without DB) → Clerk
- AI → OpenAI/Anthropic/Replicate
- Payments → Stripe
- Email → Resend/SendGrid
- Analytics → PostHog/Vercel Analytics
- Search → Algolia/MeiliSearch

## Development Commands

```bash
# Open the application
open index.html  # macOS
start index.html  # Windows

# Deploy to GitHub Pages or any static hosting
# No build step required - just upload the files
```

## Code Patterns

### Project Data Structure
```javascript
{
    type: String,      // 'agent', 'webapp', 'mobile', 'api', 'workflow', 'product'
    needs: Array,      // ['database', 'user_auth', 'ai', 'payments', etc.]
    name: String       // Project name
}
```

### Needs-Based Architecture
Instead of asking users to select specific tools, the wizard asks what functionality they need. The AI then recommends the best tools based on these needs, creating an integrated stack recommendation.

## Philosophy
- **Minimum Input, Maximum Output**: Users only describe what they need, not how to build it
- **Smart Defaults**: AI recommends best-in-class tools for each need
- **Planning Focus**: Outputs specs and plans, not code - complements existing IDEs
- **Universal Entry Point**: Works for any project type or skill level

## AI Reasoning Enhancement (Gemini Flash 2.5)

### Overview
The application now supports optional AI reasoning enhancement using Google's Gemini Flash 2.5 API. When enabled, this feature enhances generated prompts with:

- **Architectural Reasoning**: Explains why specific tools and patterns are recommended
- **Challenge Identification**: Identifies potential implementation challenges and solutions
- **Best Practices**: Suggests optimal patterns for the project type
- **Implementation Priorities**: Provides phasing and priority recommendations
- **Integration Insights**: Details how recommended tools work together

### Setup
1. Toggle "Enable AI Reasoning" in the UI
2. Enter your Google Gemini API key (stored securely in localStorage)
3. The system will automatically enhance prompts during generation

### Security
- API keys are stored locally in the browser
- Keys are never sent to any server except Google's API
- Works offline when AI reasoning is disabled