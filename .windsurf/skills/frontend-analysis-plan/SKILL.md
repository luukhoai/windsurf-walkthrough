---
name: frontend-analysis-plan
description: Analysis and planning skill for frontend development tasks
---

# Frontend Analysis Plan Skill

This skill guides through requirement analysis and planning before frontend implementation.

## When to Use
- Before starting any new feature
- When requirements are unclear
- Before major refactoring
- When adding new components

## Analysis Process

### Step 1: Understand Requirements
1. Read and understand the feature/fix description
2. Identify the goal and expected outcome
3. Note any constraints or requirements
4. Check for edge cases and responsive considerations

### Step 2: Explore Existing Code
1. Find relevant files in `contact-form-app/frontend/src/`
2. Understand current component structure
3. Identify affected components
4. Note state management patterns

### Step 3: Design Solution
1. Plan the component structure
2. Consider TypeScript interfaces/types
3. Identify props and state needed
4. Plan API integration if any

### Step 4: Document Plan
1. Write a brief implementation plan
2. List files that need to be modified
3. Note any new components/tests required
4. Identify potential issues

## Questions to Answer

Before implementing:
- What is the expected UI/UX?
- What are the edge cases?
- Does it integrate with existing components?
- What tests are needed?
- Are there accessibility considerations?

## Implementation Plan Template

```
## Implementation Plan for [Feature]

### Files to Modify
- `App.tsx` - [description]
- `components/` - [description]

### New Files
- [if any new components]

### Tests to Add/Update
- [test names]

### Edge Cases
- [case 1]
- [case 2]

### Potential Issues
- [issue 1 and mitigation]
```

## Checklist

- [ ] Requirements fully understood
- [ ] Existing code explored
- [ ] Solution designed
- [ ] Edge cases identified
- [ ] Test cases planned
- [ ] Implementation plan documented

## How to Invoke

```
Analyze and plan [feature/fix description] using the frontend-analysis-plan skill
```
