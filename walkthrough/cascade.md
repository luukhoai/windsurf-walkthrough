# Windsurf Cascade 
Windsurf Cascade is a Collaborative, Agentic AI-assistant. Cascade has access to research your code base, invoke tools to edit your code and run terminal commands, and understand your recent actions (your current trajectory) to derive your next intent. For full documentation on Cascade, see the [Windsurf Documentation](https://docs.windsurf.com/windsurf/cascade/cascade)

 Let's walk through some examples to get you started with using Cascade!

## Set Up 
Cascade can make setup as easy as one prompt:
> **Try this:**
> Run this prompt in the Cascade window on the right side of the IDE
> ```text
> /initialize-dev-environment
> ```

<div style="margin: 24px 0;"><img src="assets/cascade/workflow-setup.png" alt="Set Up Image" width="200"/></div>

**What you'll see:** With one prompt, Cascade will automatically analyze your codebase, install the necessary dependencies, and launch an in-IDE browser preview of our website. 

This is an example of a workflow in Windsurf, a defined series of steps to easily execute repetitive tasks. You can learn more about workflows and how to set up your own [Here](https://docs.windsurf.com/windsurf/cascade/workflows).

## Write and Chat
With advanced context awareness of your codebase, Cascade can easily make changes and explain any unfamiliar sections of code. 
> **Try this:**
> Set Cascade to write mode and input this prompt
> ```text
> Explain how ContactForm works and how the form submission is handled
> ```

**What you'll see:** Cascade will analyze your files and provide a detailed overview of the form logic. Chat is a great way to explore unfamiliar databases and reason over implementation logic.

> **Try this:**
> Set Cascade to chat mode and input this prompt
> ```text
> Add a required Company Name input field to the contact form. It should appear below the Email field and be included in the handleSubmit function’s validation logic
> ```

**What you'll see:** Cascade will generate and modify code to implement your prompt, asking for clarification or permission to run terminal commands as necessary.

## Planning Mode
Let's try something a bit more advanced! Currently, the UI looks fairly plain, with planning mode we can implement a complete UI overhaul with a just a few prompts.

For detailed documentation on planning mode, click [Here](https://docs.windsurf.com/windsurf/cascade/planning-mode).

> **Try this:**
> Turn planning mode on using the checklist icon in the Cascade panel and input this prompt
> ```text
> Create a detailed plan to improve the Contact Form UI: Apply a modern, professional layout with better spacing and alignment. Style input fields and labels to improve accessibility and readability
> ```

**What you'll see:** Cascade will generate an implementation plan structured as a local markdown file with clear goals and action items. Once created you can manually edit the plan or ask Cascade for any modifications.

> **Try this:**
> Ask Cascade to implement the plan
> ```text
> Implement the plan
> ```

**What you'll see:** Cascade will implement the plan step by step. You can step in at any time to change direction or ask Cascade to modify the plan. Once done, you should see the updated, modern UI directly in the in-IDE preview.

## Adding Context
Part of what makes Cascade so powerful is our advanced context engine which works in the background to help Cascade understand your intent.

Additionally, you can add screenshots, directly pull elements from previews, and utilize keyboard shortcuts to direct Cascade manually. For more information on Context Awareness, click [Here](https://docs.windsurf.com/context-awareness/windsurf-overview).

> **Try this:**
> Feel free to browse the code files in contact-form-app. To reference a specific line of code, highlight the code segment and add it as context to Cascade by hitting `Cmd/Ctrl + L`.

**What you'll see:** Cascade will add the code segment as context to the conversation.

> **Try this:**
> Navigate to the in-IDE preview and click Select Element. Add any element from the preview to the conversation.

**What you'll see:** Cascade will add the element as context to the conversation, making it seamless to reference any UI elements directly.

Find more information on Previews [Here](https://docs.windsurf.com/windsurf/previews).

## Debugging with Cascade

Cascade provides powerful debugging capabilities that help you identify and fix issues quickly. Here are the key ways to bring debugging context into Cascade.

### Explain and Fix

When you encounter errors in your code, you can use the "Explain and Fix" feature to get immediate help.

> **Try this:**
> 1. Open `contact-form-app/frontend/src/components/ContactForm.tsx`
> 2. Introduce a syntax error (e.g., remove a closing bracket)
> 3. Highlight the error squiggle in the editor
> 4. Click "Explain and Fix" in the hover tooltip

**What you'll see:** Cascade will analyze the error, explain what's wrong, and offer to fix it automatically.

### Send Problems to Cascade

The Problems panel at the bottom of the editor shows linting errors, type errors, and other issues. You can send these directly to Cascade.

> **Try this:**
> 1. Open the Problems panel
> 2. If there are any problems listed, click the "Send to Cascade" button
> 3. Ask Cascade to fix the issues

**What you'll see:** The problems are added as context to your Cascade conversation, allowing Cascade to address them systematically.

### Terminal Error Context

When commands fail in the terminal, you can send the error output directly to Cascade.

> **Try this:**
> 1. Open the terminal and run a command that produces an error (e.g., `npm run build` with a syntax error in your code)
> 2. Highlight the error output in the terminal
> 3. Press `Cmd/Ctrl + L` to send it to Cascade
> 4. Ask Cascade to diagnose and fix the issue

**What you'll see:** Cascade will analyze the stack trace or error message and help you identify the root cause.

### @-mention Terminal

You can also reference your terminal directly in Cascade conversations.

> **Try this:**
> After running a command in the terminal, ask Cascade:
> ```text
> @terminal What went wrong with my last command and how do I fix it?
> ```

**What you'll see:** Cascade will read the terminal output and provide targeted debugging assistance.

### Linter Integration

Cascade automatically detects and can fix linting errors in code it generates. This is enabled by default.

> **Try this:**
> Ask Cascade to generate code that might have linting issues:
> ```text
> Add a new function to ContactForm.tsx that validates phone numbers
> ```

**What you'll see:** If the generated code has linting issues, Cascade will automatically detect and fix them. You'll see an "Auto-fix" indicator on the tool call.

