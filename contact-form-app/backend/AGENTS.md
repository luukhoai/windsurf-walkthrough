# Backend API Guidelines

## Endpoint Structure
- Use RESTful conventions for all endpoints
- Return consistent JSON response format: `{ success: boolean, data?: any, error?: string }`
- Include appropriate HTTP status codes (200, 201, 400, 404, 500)

## Error Handling
- Catch and log all exceptions with appropriate context
- Return user-friendly error messages to clients
- Never expose internal error details or stack traces

## Validation
- Validate all input data before processing
- Sanitize user inputs to prevent injection attacks
- Use type hints for all function parameters and return values

## Database Operations
- Use parameterized queries to prevent SQL injection
- Handle connection errors gracefully
- Close connections properly after use

## Logging
- Log all API requests with timestamp and endpoint
- Log errors with full context for debugging
- Avoid logging sensitive user data (passwords, tokens)
