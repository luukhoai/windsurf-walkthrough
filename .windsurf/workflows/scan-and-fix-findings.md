---
description: Scan code with a command line tool to identify quality concerns and remediate
auto_execution_mode: 2
---

The user will provide you with a directory or a file. 

Based on this scope:
1. Use ESLint for TypeScript/JavaScript files or pylint/flake8 for Python files to scan the code
2. Prioritize findings based on severity (errors before warnings)
3. Begin remediation on the findings
4. Run the linting tool again to ensure the fixes were applied