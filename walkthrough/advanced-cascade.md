# Advanced Cascade Features

This walkthrough covers advanced Cascade capabilities for power users: Skills, MCP (Model Context Protocol), Worktrees, and Simultaneous Cascades.

For full documentation, see [Cascade Overview](https://docs.windsurf.com/windsurf/cascade/cascade).

## Skills

Skills help Cascade handle complex, multi-step tasks by bundling instructions with supporting resources like templates, scripts, and checklists.

For more information, see [Skills Documentation](https://docs.windsurf.com/windsurf/cascade/skills) and [agentskills.io](https://agentskills.io/home).

### How Skills Work
- Skills are folders containing a `SKILL.md` file and supporting resources
- Cascade uses **progressive disclosure** to invoke skills only when relevant
- You can also manually invoke skills when needed
- Great for standardizing complex workflows across your team

### Skill Structure

```
.windsurf/skills/
└── code-review/
    └── SKILL.md           # Main skill definition
```

### SKILL.md Format

Skills use YAML frontmatter followed by markdown instructions:

```yaml
---
name: Skill Name
description: Brief description of what this skill does
---

# Skill Title

Instructions and steps for Cascade to follow...
```

### Example Skills in This Project

This project includes three example skills in `.windsurf/skills/`:

**1. Code Review** (`code-review/SKILL.md`):
A systematic code review checklist covering functionality, tests, security, performance, and style.

**2. Add Form Field** (`add-form-field/SKILL.md`):
Step-by-step guide for adding new fields to the contact form across all layers (interfaces, UI, validation, backend, tests).

**3. Debug Issue** (`debug-issue/SKILL.md`):
Structured debugging framework with phases: Reproduce → Isolate → Diagnose → Fix → Verify.

> **Try this:**
> Use the code review skill to review the ContactForm component
> ```text
> Review the ContactForm component using the code-review skill
> ```
> Alternatively, you may use the `@` symbol to see a dropdown of all skills

**What you'll see:** Cascade will follow the structured checklist from the skill to provide comprehensive feedback.

> **Try this:**
> Use the add-form-field skill to add a new field
> ```text
> Add a phone number field to the contact form using the add-form-field skill
> ```

**What you'll see:** Cascade will follow the step-by-step process to update all necessary files consistently.

## MCP (Model Context Protocol)

MCP extends Cascade with custom tools and services, allowing integration with external systems.

For more information, see [MCP Documentation](https://docs.windsurf.com/windsurf/cascade/mcp).

### How MCP Works
- MCP servers provide tools that Cascade can invoke
- Enterprise admins can control which MCP servers are allowed

### Configuration Example

Edit the MCP Config file by selecting the three dots at the top right of the Cascade Window and navigating to the `MCP Marketplace` or `Open MCP Config File` button:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Admin Controls (Teams & Enterprise)
Administrators can:
- Allowlist specific MCP server patterns
- Block unauthorized MCP configurations

## Worktrees

Worktrees allow you to run Cascade tasks in parallel without interfering with your main workspace using Git worktrees.

For more information, see [Worktrees Documentation](https://docs.windsurf.com/windsurf/cascade/worktrees).

### How Worktrees Work
- Each Cascade conversation can get its own isolated worktree
- Cascade can make edits, build, and test without affecting your main workspace
- Perfect for parallel feature development or experimentation
- Changes can be merged back when ready

### When to Use Worktrees
- Running multiple Cascade tasks that might edit the same files
- Experimenting with changes you might want to discard
- Parallel feature development
- Testing changes in isolation

> **Try this:**
> Open a new Cascade Chat window
> Switch the agent location by clicking the `Local` button at the bottom right of the chat window and switching to `Worktree`

**What you'll see:** Cascade will create an isolated worktree, make the changes there, and you can review before merging. This allows for isolated environments where Cascade can do its work and not affect your active development branch.

### Worktree Cleanup
- Worktrees are automatically cleaned up when no longer needed
- You can manually clean up worktrees through Git commands
- Changes in worktrees don't affect your main branch until merged

## Simultaneous Cascades

Run multiple Cascade conversations in parallel for increased productivity.

### How It Works
- Open multiple Cascade panels using the dropdown menu
- Each Cascade operates independently
- Navigate between them using the panel selector

### Best Practices

1. **Avoid file conflicts**: Don't have two Cascades edit the same file simultaneously
2. **Use worktrees for isolation**: When Cascades might touch similar files
3. **Separate concerns**: Use different Cascades for different tasks (e.g., frontend vs backend)

> **Try this:**
> Open two Cascade panels
> 1. In Cascade 1: Work on frontend styling improvements
> 2. In Cascade 2: Work on backend API documentation
> ```text
> Cascade 1: Improve the styling of the ContactForm component with better spacing and modern design
> ```
> ```text
> Cascade 2: Add comprehensive docstrings to all functions in app.py
> ```

**What you'll see:** Both Cascades work independently, and you can switch between them to monitor progress.

### Warning: Race Conditions
If two Cascades edit the same file simultaneously, edits can race and the second edit may fail. Use worktrees to prevent this.

## Cascade Hooks (Enterprise)

Cascade Hooks allow you to execute custom shell commands at key points in Cascade's workflow.

For more information, see [Cascade Hooks Documentation](https://docs.windsurf.com/windsurf/cascade/hooks).

### Use Cases
- **Logging**: Track all Cascade operations for audit
- **Security**: Block dangerous commands or file access
- **Validation**: Run checks before/after code changes
- **Integration**: Trigger external systems on Cascade actions

### Hook Events
- `pre_read_code` / `post_read_code`
- `pre_write_code` / `post_write_code`
- `pre_run_command` / `post_run_command`
- `pre_user_prompt` / `post_cascade_response`

### Example: Logging Hook

```json
{
  "hooks": {
    "post_write_code": {
      "command": "echo 'File modified: $FILE_PATH' >> /var/log/cascade.log"
    }
  }
}
```

## Best Practices

1. **Start simple**: Master one advanced feature before combining them
2. **Use Skills for repeatability**: Standardize complex workflows
3. **Isolate with Worktrees**: When experimenting or running parallel tasks
4. **Configure MCP thoughtfully**: Only add servers you trust and need
5. **Monitor Simultaneous Cascades**: Keep track of what each is doing to avoid conflicts
