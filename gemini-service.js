class GeminiService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        // Using Gemini 2.5 Flash model as requested
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
    }

    async enhancePromptWithReasoning(projectData, basePrompt) {
        if (!this.apiKey) {
            console.log('No API key provided');
            return basePrompt;
        }

        console.log('Attempting to enhance prompt with Gemini...');
        const reasoningPrompt = this.buildReasoningPrompt(projectData, basePrompt);

        try {
            const requestUrl = `${this.baseUrl}?key=${this.apiKey}`;
            const requestBody = {
                contents: [{
                    parts: [{
                        text: reasoningPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                    topP: 0.95,
                    topK: 40
                }
            };

            console.log('Sending request to Gemini API...');
            
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API response error:', errorText);
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Gemini API response received');
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                console.error('Unexpected API response structure:', data);
                throw new Error('Invalid API response structure');
            }

            const enhancedContent = data.candidates[0].content.parts[0].text;
            console.log('Enhancement successful');
            
            return this.mergeEnhancedPrompt(basePrompt, enhancedContent);
        } catch (error) {
            console.error('Error enhancing prompt with Gemini:', error);
            alert('Failed to enhance prompt with Gemini. Check console for details. Falling back to standard generation.');
            return basePrompt;
        }
    }

    buildReasoningPrompt(projectData, basePrompt) {
        return `You are a principal architect at a top tech company. Give exact recommendations, not options. Make decisive technical choices based on what actually works in production.

Project Type: ${projectData.type}
Project Name: ${projectData.name}
Project Description: ${projectData.description || 'No description provided'}
Requirements: ${projectData.needs.join(', ')}

${projectData.type === 'team' ? 'Multi-Agent Framework: Please recommend a suitable multi-agent framework (e.g., Sequential, Parallel, A2A, ADK) and justify your choice based on the project requirements, explaining the pros and cons.\n\n' : ''}Base Prompt:
${basePrompt}

Please enhance this prompt with the following well-structured sections. Use the project description as context to provide highly specific and relevant recommendations. Use clear markdown formatting with headers, bullet points, and numbered lists for maximum readability:

## 📋 Project Context
Provide a brief refined summary of what this project aims to achieve based on the description provided, highlighting the key value proposition and main use cases.

## 🏗️ Architecture Analysis
- **Why This Stack**: Explain the reasoning behind each tool recommendation
- **Architecture Pattern**: Recommend specific pattern (monolithic, microservices, serverless) with justification
- **Key Design Decisions**: List 3-5 critical architectural choices

## 🚀 Implementation Roadmap
Break down the implementation into logical phases with specific tasks and subtasks. DO NOT use weekly timelines. Instead, organize by functional milestones:

### Phase 1: Foundation & Setup
**Main Tasks:**
- [ ] Task 1: [Specific task]
  - [ ] Subtask 1.1: [Details]
  - [ ] Subtask 1.2: [Details]
- [ ] Task 2: [Specific task]
  - [ ] Subtask 2.1: [Details]
  - [ ] Subtask 2.2: [Details]

### Phase 2: Core Development
**Main Tasks:**
- [ ] Task 1: [Specific feature/component]
  - [ ] Subtask 1.1: [Implementation detail]
  - [ ] Subtask 1.2: [Testing approach]
- [ ] Task 2: [Integration work]
  - [ ] Subtask 2.1: [API setup]
  - [ ] Subtask 2.2: [Data flow]

### Phase 3: Polish & Launch
**Main Tasks:**
- [ ] Task 1: [Optimization task]
  - [ ] Subtask 1.1: [Performance tuning]
  - [ ] Subtask 1.2: [Security review]
- [ ] Task 2: [Deployment preparation]
  - [ ] Subtask 2.1: [Environment setup]
  - [ ] Subtask 2.2: [Launch checklist]

## ⚡ Technical Considerations

### Integration Strategy
- How the recommended tools work together
- Data flow between services
- API communication patterns

### Performance & Scalability
- Expected bottlenecks and solutions
- Caching strategies
- Database optimization tips

### Security Best Practices
- Authentication/authorization approach
- Data protection measures
- API security considerations

## 🎯 Success Metrics
- Key performance indicators
- Monitoring recommendations
- Quality benchmarks

## ⚠️ Known Problems & Exact Solutions
| Problem | Why It Happens | Fix It With |
|---------|----------------|-------------|
| [Specific challenge] | [Why it matters] | [How to address] |

## 💡 Pro Tips
- 3-5 expert recommendations specific to this project type
- Common pitfalls to avoid
- Time-saving shortcuts

Keep the tone professional but approachable. Use emojis sparingly for section headers only. Focus on actionable, practical advice.

IMPORTANT: 
- Use the project description to understand the specific context and goals
- Make all recommendations highly specific to this project, not generic
- Tasks should be concrete and actionable, not abstract
- Each phase should have clear deliverables and acceptance criteria`;
    }

    mergeEnhancedPrompt(basePrompt, enhancedContent) {
        // Add enhanced reasoning sections to the base prompt
        return `${basePrompt}

---

# 🤖 AI-Enhanced Architectural Insights

${enhancedContent}

---

**Note:** The above insights were generated by Gemini 2.5 Flash to provide deeper architectural reasoning and implementation guidance for your project.`;
    }

    async getArchitecturalRecommendations(projectData) {
        if (!this.apiKey) {
            return null;
        }

        const analysisPrompt = `As a software architect, analyze these project requirements and provide specific recommendations:

Project Type: ${projectData.type}
Requirements: ${projectData.needs.join(', ')}

Provide:
1. Optimal technology stack with reasoning
2. Architecture pattern (monolithic, microservices, serverless, etc.)
3. Key integration points and data flow
4. Security considerations
5. Performance optimization strategies
6. Development timeline estimation

Be specific and practical, focusing on modern best practices.`;

        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: analysisPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                        topP: 0.95,
                        topK: 40
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error getting architectural recommendations:', error);
            return null;
        }
    }

    validateApiKey() {
        if (!this.apiKey) {
            return false;
        }
        // Basic validation - API key should be a string of reasonable length
        return this.apiKey.length > 20 && this.apiKey.length < 100;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeminiService;
}