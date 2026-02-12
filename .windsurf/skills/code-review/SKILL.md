---
name: Code Review
description: Systematic code review process for ensuring quality and consistency
---

# Code Review Skill

This skill guides Cascade through a comprehensive code review process.

## When to Use
- Before merging pull requests
- When reviewing new feature implementations
- During code quality audits

## Review Checklist

### 1. Functionality
- [ ] Does the code accomplish its intended purpose?
- [ ] Are edge cases handled appropriately?
- [ ] Does it integrate correctly with existing code?

### 2. Code Quality
- [ ] Is the code readable and well-organized?
- [ ] Are variable and function names descriptive?
- [ ] Is there unnecessary code duplication?
- [ ] Does it follow the project's coding conventions?

### 3. Testing
- [ ] Are there adequate unit tests?
- [ ] Do tests cover edge cases and error conditions?
- [ ] Are tests readable and maintainable?

### 4. Security
- [ ] Are user inputs validated and sanitized?
- [ ] Are there any potential injection vulnerabilities?
- [ ] Is sensitive data handled appropriately?

### 5. Performance
- [ ] Are there obvious performance bottlenecks?
- [ ] Is resource usage (memory, network) reasonable?
- [ ] Are expensive operations optimized or cached?

### 6. Documentation
- [ ] Are complex sections documented?
- [ ] Are public APIs documented?
- [ ] Is the README updated if needed?

## How to Invoke
Ask Cascade to review code using this skill:
```
Review the changes in [file/component] using the code-review skill
```

## Output Format
Provide feedback organized by category with specific line references and actionable suggestions.
