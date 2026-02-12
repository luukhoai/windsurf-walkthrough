---
trigger: glob
description: Security guidelines for backend Python code
globs: **/*.py
---

When interfacing with a database, be cognizant of SQL injection attacks. Always use parameterized queries instead of string concatenation.

Validate and sanitize all user inputs before processing.