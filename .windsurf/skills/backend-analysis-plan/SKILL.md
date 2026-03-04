---
name: backend-analysis-plan
description: Analysis and planning skill for backend development tasks
---

# Backend Analysis Plan Skill

This skill guides through requirement analysis and planning before implementation.

## When to Use
- Before starting any new feature
- When requirements are unclear
- Before major refactoring
- When estimating effort

## Analysis Process

### Step 1: Understand Requirements
1. Read and understand the feature/fix description
2. Identify the goal and expected outcome
3. Note any constraints or requirements
4. Check for edge cases

### Step 2: Explore Existing Code
1. Find relevant files in `contact-form-app/backend/`
2. Understand current implementation
3. Identify affected components
4. Note dependencies

### Step 3: Design Solution
1. Plan the implementation approach
2. Consider data models and API changes
3. Identify test cases needed
4. Estimate complexity

### Step 4: Document Plan
1. Write a brief implementation plan
2. List files that need to be modified
3. Note any new tests required
4. Identify potential issues

## Questions to Answer

Before implementing, clarify:
- What is the expected behavior?
- What are the edge cases?
- How does it integrate with existing code?
- What tests are needed?
- Are there security considerations?

## Implementation Plan Template

```
## Implementation Plan for [Feature]

### Files to Modify
- `app.py` - [description]

### New Files
- [if any]

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
Analyze and plan [feature/fix description] using the backend-analysis-plan skill
```
