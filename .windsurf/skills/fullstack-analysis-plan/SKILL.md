---
name: fullstack-analysis-plan
description: Analysis and planning skill for fullstack development tasks (backend + frontend)
---

# Fullstack Analysis Plan Skill

This skill guides through requirement analysis and planning for fullstack applications involving both backend and frontend.

## When to Use
- Before starting any new fullstack feature
- When requirements span both backend and frontend
- When designing API contracts
- Before major refactoring affecting both layers

## Process

### Step 1: Understand Requirements
1. Read and understand the feature/fix description
2. Identify the goal and expected outcome
3. Note any constraints or requirements
4. Determine scope: backend only, frontend only, or both

### Step 2: Analyze Each Layer
- Use `backend-analysis-plan` skill for backend analysis
- Use `frontend-analysis-plan` skill for frontend analysis
### Step 3: Design Solution

#### Backend Design
- Design API endpoints (RESTful)
- Define request/response formats
- Plan data validation
- Consider security requirements

#### Frontend Design
- Design UI components
- Plan API integration
- Define state management
- Consider user experience

### Step 4: Define API Contract
Document the interface between frontend and backend:
- Endpoint paths
- HTTP methods
- Request body schema
- Response format
- Error handling

### Step 5: Document Plan
1. Write a brief implementation plan
2. List backend files to modify
3. List frontend files to modify
4. Note API contract changes
5. Identify test cases needed

## Questions to Answer

Before implementing fullstack:
- What backend API endpoints are needed?
- What frontend components are needed?
- How does frontend communicate with backend?
- What is the data flow?
- What are the edge cases for both layers?
- Are there security considerations?

## Implementation Plan Template

```
## Implementation Plan for [Feature]

### API Contract

#### Endpoint: [method] /api/resource
- Request:
  ```json
  {
    "field1": "string",
    "field2": "number"
  }
  ```
- Response:
  ```json
  {
    "id": "string",
    "field1": "string"
  }
  ```

### Backend Files to Modify
- `app.py` - [description]

### Frontend Files to Modify
- `App.tsx` - [description]
- `components/` - [description]

### New Components
- [if any]

### Tests to Add/Update
- Backend: [test names]
- Frontend: [test names]
- Integration: [test names]

### Edge Cases
- [case 1]
- [case 2]

### Potential Issues
- [issue 1 and mitigation]
```

## Checklist

- [ ] Requirements fully understood
- [ ] Backend analyzed (see backend-analysis-plan)
- [ ] Frontend analyzed (see frontend-analysis-plan)
- [ ] API contract defined
- [ ] Solution designed for both layers
- [ ] Edge cases identified
- [ ] Test cases planned
- [ ] Implementation plan documented

## Related Skills

- backend-analysis-plan - For detailed backend analysis
- frontend-analysis-plan - For detailed frontend analysis

## How to Invoke

```
Analyze and plan [fullstack feature] using the fullstack-analysis-plan skill
```
