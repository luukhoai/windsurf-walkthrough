# Memories, Rules, and AGENTS.md

Windsurf provides powerful mechanisms to persist context and customize Cascade's behavior across conversations. This walkthrough covers three key features: **Memories**, **Rules**, and **AGENTS.md** files.

For full documentation, see [Memories & Rules](https://docs.windsurf.com/windsurf/cascade/memories).

## Memories

Memories are context items that Cascade can automatically generate or that you explicitly create. They persist across conversations and help Cascade remember important information about your project.

### How Memories Work
- Cascade can automatically create memories when it learns something important about your codebase
- You can manually create memories by asking Cascade to "remember" something
- Memories are stored per-workspace and can be managed through the Windsurf settings

> **Try this:**
> Ask Cascade to remember a preference about your project
> ```text
> Remember that our API endpoints should always return JSON responses with a consistent structure: { success: boolean, data?: any, error?: string }
> ```

**What you'll see:** Cascade will create a memory that persists across future conversations, ensuring consistent API response formatting.

> **Try this:**
> View and manage your memories by clicking the gear icon in Cascade and selecting "Memories"

## Rules

Rules are manually defined guidelines that instruct Cascade how to behave. They can be scoped globally or to specific workspaces and files.

### Rule Storage Locations
- **Global rules**: `~/.windsurf/rules/` - Apply to all workspaces
- **Workspace rules**: `.windsurf/rules/` - Apply to the current workspace

### Rule Frontmatter Options
Rules use YAML frontmatter to control when they activate:

```yaml
---
trigger: always_on    # Always active
# OR
trigger: manual       # Only when explicitly invoked
# OR  
trigger: glob   # Active for matching files
globs: src/**/*.tsx   # Glob pattern for file matching
description: Optional description of the rule
---
```

### Example Rules in This Project

This project includes several example rules in `.windsurf/rules/`:

**1. Always-On Rule** (`near-term-goal.md`):
```yaml
---
trigger: always_on
---

We are building a full stack application that utilizes both Python and Typescript. 
We are trying to migrate the application to use only one language, so when you 
propose new files, always try to implement the functionality in TS.
```

**2. Glob-Matched Rule** (`secure-development.md`):
```yaml
---
trigger: glob
description: Security guidelines for backend Python code
globs: **/*.py
---

When interfacing with a database, be cognizant of SQL injection attacks. 
Always use parameterized queries instead of string concatenation.
Validate and sanitize all user inputs before processing.
```

**3. Manual Rule** (`think-before-doing.md`):
```yaml
---
trigger: manual
---

When the user gives a prompt that is an antipattern for our event driven cloud native 
architecture that is serverless, challenge the user's request and ask for follow up 
guidance before doing that
```

> **Try this:**
> Create a new rule for testing conventions
> 1. Create a file at `.windsurf/rules/testing-conventions.md`
> 2. Add the following content:
> ```yaml
> ---
> trigger: glob
> globs: **/*.test.ts, **/*.test.tsx, **/*.spec.ts
> ---
> 
> When writing tests:
> - Use descriptive test names that explain the expected behavior
> - Follow the Arrange-Act-Assert pattern
> - Mock external dependencies
> - Include both happy path and error cases
> ```

**What you'll see:** Cascade will automatically apply these testing conventions when working on test files.

## AGENTS.md

`AGENTS.md` files provide directory-scoped instructions that automatically apply based on file location. Unlike rules, they live alongside your code and are ideal for directory-specific guidelines.

### How AGENTS.md Works
- Place an `AGENTS.md` file in any directory
- Instructions automatically apply when Cascade works with files in that directory or its subdirectories
- Great for component-specific patterns, API conventions, or module guidelines

### Example: Frontend Component Guidelines

> **Try this:**
> Create an `AGENTS.md` file for the frontend components
> 1. Create the file at `contact-form-app/frontend/src/components/AGENTS.md`
> 2. Add the following content:

```markdown
# Component Development Guidelines

## Structure
- Each component should be in its own file
- Use TypeScript interfaces for props
- Export components as named exports

## Styling
- Use Tailwind CSS utility classes
- Avoid inline styles
- Keep responsive design in mind (mobile-first)

## State Management
- Prefer useState for local state
- Use useReducer for complex state logic
- Lift state up only when necessary

## Validation
- All form inputs must have client-side validation
- Display validation errors inline below the input
- Use the existing validation utility functions
```

**What you'll see:** When you ask Cascade to create or modify components in the `components/` directory, it will automatically follow these guidelines.

### Example: Backend API Guidelines

> **Try this:**
> Modify the `AGENTS.md` file for the backend
> 1. View the file at `contact-form-app/backend/AGENTS.md`
> 2. Review or modify the following content:

```markdown
# Backend API Guidelines

## Endpoint Structure
- Use RESTful conventions
- Return consistent JSON response format
- Include appropriate HTTP status codes

## Error Handling
- Catch and log all exceptions
- Return user-friendly error messages
- Never expose internal error details to clients

## Validation
- Validate all input data
- Sanitize user inputs before processing
- Use type hints for all function parameters
```

## Best Practices

1. **Rules vs AGENTS.md**: Use rules for cross-cutting concerns (coding style, language preferences). Use AGENTS.md for directory-specific patterns.

2. **Keep it concise**: Both rules and AGENTS.md should be focused and actionable. Avoid lengthy documentation.

3. **Version control**: Commit your `.windsurf/rules/` and `AGENTS.md` files to share conventions with your team.

4. **Iterate**: Start with a few key rules and expand based on what patterns you want Cascade to follow consistently.

## Further Exploration

- Review the existing rules in `.windsurf/rules/` to understand different trigger types
- Experiment with `AGENTS.md` at different directory levels
- Experiment with combining memories, rules, and AGENTS.md for comprehensive AI guidance
