# Exploration Tools: DeepWiki, and Codemaps

Windsurf provides powerful tools for exploring, understanding, and visualizing codebases. This walkthrough covers two key exploration features.

## DeepWiki

DeepWiki provides AI-powered documentation and knowledge extraction from your codebase, making it easier to understand complex projects.

For more information, see [DeepWiki Documentation](https://docs.windsurf.com/windsurf/deepwiki).

### How DeepWiki Works
- Analyzes your codebase structure and relationships
- Generates contextual documentation on demand
- Provides deep insights into code architecture
- Helps onboard new team members quickly

### Key Capabilities
- **Codebase Analysis**: Understands the structure and relationships in your code
- **On-Demand Documentation**: Generates explanations for any part of your codebase
- **Architecture Insights**: Reveals how components connect and interact
- **Knowledge Extraction**: Surfaces implicit knowledge from code patterns

> **Try this:**
> Hover over a code symbol and click the `Read More` button
> Or press **Command/Ctrl + Shift + Click** on a code symbol

**What you'll see:** DeepWiki will provide a detailed architectural overview, including Definition, Notes, and link to other relevant Code Symbols

### DeepWiki Use Cases

1. **Onboarding**: Quickly understand unfamiliar codebases
2. **Documentation**: Generate documentation for undocumented code
3. **Architecture Review**: Understand system design decisions
4. **Knowledge Transfer**: Share codebase knowledge with team members

## Codemaps (Beta)

Codemaps are shareable, hierarchical visualizations of your codebase that help you navigate, discuss, and understand code execution flow and component relationships.

For more information, see [Codemaps Documentation](https://docs.windsurf.com/windsurf/codemaps).

### How Codemaps Work
- Powered by a specialized agent that analyzes your code
- Creates visual representations of code structure
- Shows relationships between components, functions, and modules
- Can be shared with teammates for collaborative understanding

### Key Capabilities
- **Visual Navigation**: See your codebase structure at a glance
- **Execution Flow**: Understand how code executes from entry points
- **Component Relationships**: Visualize dependencies and connections
- **Shareable Artifacts**: Export and share maps with your team

### Creating a Codemap

> **Try this:**
> Generate a Codemap for the contact form submission flow
> Navigate to the map icon in the navigation menu and select a suggested prompt or ask
> ```text
> How does this application connect the frontend to the backend
> ```

**What you'll see:** Windsurf will generate a Codemap:

### Using Codemaps with Cascade

Codemaps can be provided to Cascade to provide repo-wide context and help focus its attention.
