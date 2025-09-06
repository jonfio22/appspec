# AgentSpec

AgentSpec is a universal planning platform for developers - a web-based wizard that generates AI-powered specifications for any type of software project. It uses a simple, gamified interface to gather project requirements and outputs detailed technical specifications, PRDs, or implementation plans.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Follow the on-screen instructions to design your AI agent or team of agents.
3.  When you're finished, the application will generate a detailed prompt for you.
4.  Copy the prompt and paste it into your favorite LLM to generate the agent code.

### AI Reasoning Enhancement (Powered by Gemini)

AgentSpec now includes optional AI reasoning capabilities powered by Google's Gemini models. To use this feature:

1.  **Get a Gemini API Key**:
    *   Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
    *   Create a new API key.
2.  **Enable in AgentSpec**:
    *   Toggle the "Enable AI Reasoning" switch in the application.
    *   Enter your API key when prompted. It will be stored securely in your browser's local storage.
    *   Generate prompts as usual, and they will be automatically enhanced with AI-powered insights.

## Features

*   **Step-by-step wizard:** A user-friendly process for designing AI agents and software projects.
*   **Multiple Project Types:** Supports AI agents, web apps, mobile apps, APIs, and more.
*   **Smart Tool Recommendations:** Automatically suggests tools based on your project's needs (e.g., Supabase for databases, Stripe for payments).
*   **AI-Powered Enhancements:** Optionally enhance your prompts with architectural analysis, implementation roadmaps, and technical considerations using Gemini.
*   **Secure API Key Management:** Your Gemini API key is stored locally and securely in your browser.
*   **No Build Process:** Runs directly in the browser with no installation required.

## Technical Implementation

*   **Single-File Architecture:** The entire application is contained within `index.html`, including all CSS and JavaScript.
*   **Frontend:**
    *   Tailwind CSS for styling.
    *   Font Awesome for icons.
    *   Vanilla JavaScript for the wizard logic.
*   **Prompt Generation:** The `prompt-generator.js` file contains the logic for creating prompts based on user selections.
*   **Gemini Integration:** The `gemini-service.js` file handles the integration with the Gemini API for AI-powered prompt enhancements.

## Development

To run the application, simply open `index.html` in your web browser.

```bash
# On macOS
open index.html

# On Windows
start index.html
```

There is no build step required. To deploy, you can host the files on any static web hosting service.

## Future Development

*   Export options for different formats, such as JSON (for n8n) and markdown.
*   Advanced customization options for fine-tuning the generated prompts.
*   A library of prompt templates for different use cases.
*   Integration with other AI models from providers like OpenAI and Anthropic.