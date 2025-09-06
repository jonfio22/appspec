# GEMINI.md

## Directory Overview

This directory contains a prototype for a web application called "AgentSpec". AgentSpec is a prompt generator for creating AI agents. It provides a user-friendly, step-by-step process for designing AI agents and teams of agents, and then generates a detailed prompt that can be used with a large language model (LLM) to generate the agent code.

## Key Files

*   `index.html`: The main application page. It's a single, self-contained HTML file with embedded CSS and JavaScript. Now includes AI reasoning toggle and API key management.
*   `prompt-generator.js`: This file contains the logic for generating the prompts based on the user's selections. Now supports async generation with Gemini enhancement.
*   `gemini-service.js`: New file that handles Google Gemini Flash 2.5 API integration for enhanced prompt generation with AI reasoning.
*   `GEMINI.md`: This file, providing context for the project.
*   `CLAUDE.md`: Documentation for Claude Code integration and project architecture.

## New Features: Gemini Flash 2.5 Integration

### AI Reasoning Enhancement
The application now includes optional AI reasoning capabilities powered by Google's Gemini Flash 2.5:

1. **Toggle Switch**: Enable/disable AI reasoning from the UI
2. **API Key Management**: Secure local storage of Google Gemini API key
3. **Project Context**: Name and description fields provide context for better AI recommendations
4. **Enhanced Prompts**: When enabled, prompts are enhanced with:
   - **Project Context**: Refined summary based on description
   - **Architecture Analysis**: Reasoning behind tool choices with patterns
   - **Implementation Roadmap**: Task-based phases with checkboxes (not weekly timelines)
     - Phase 1: Foundation & Setup
     - Phase 2: Core Development
     - Phase 3: Polish & Launch
   - **Technical Considerations**: Integration, performance, security strategies
   - **Success Metrics**: KPIs and quality benchmarks
   - **Challenges & Solutions**: Structured table format
   - **Pro Tips**: Project-specific recommendations

### How to Use AI Reasoning

1. **Get a Gemini API Key**: 
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini Flash 2.5
   
2. **Enable in AgentSpec**:
   - Toggle "Enable AI Reasoning" switch
   - Enter your API key (stored securely in browser)
   - Generate prompts as usual - they'll be automatically enhanced

### Technical Implementation

- **Model**: Uses `gemini-2.0-flash-exp` for Gemini 2.5 capabilities
- **Secure**: API keys stored in localStorage, never sent to external servers
- **Context-Aware**: Uses project description to generate specific recommendations
- **Structured Output**: Well-formatted markdown with sections, bullets, and tables
- **Task-Based**: Generates actionable task lists instead of time-based schedules
- **Graceful Fallback**: Works offline or without API key
- **Async Processing**: Loading states during API calls
- **Error Handling**: Console logging, user alerts, falls back to standard generation
- **Persistent Settings**: Remembers API key and reasoning preference

## Usage

The `index.html` file can be opened directly in a web browser to use the application. There are no build steps or dependencies to install.

## Next Steps

*   Push the project to the user's GitHub repository.
*   Deploy the project to Vercel.
*   Consider adding more AI models (OpenAI, Anthropic) for prompt enhancement
*   Add prompt history and comparison features