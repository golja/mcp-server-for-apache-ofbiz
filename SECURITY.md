# Security Policy

## Supported Versions

This project follows a best-effort security support model.

Security fixes are applied to the `main` branch. Users are encouraged to run the latest version.

---

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public issue**.

Instead, report it privately by opening a GitHub Security Advisory.

Please include:

- A description of the vulnerability
- Steps to reproduce (if possible)
- Potential impact
- Suggested mitigation (if known)

You will receive an acknowledgment within a few days. We aim to assess and respond as quickly as possible.

---

# Security Model

This project provides an MCP server that exposes custom tools, potentially interacting with downstream systems (e.g. Apache OFBiz) services and data.

Because this server may execute custom logic and interact with business systems, security depends on correct deployment and configuration.

## Threat Model Overview

The main security concerns are:

1. Unauthorized access to MCP endpoints
2. Execution of unsafe or malicious tools
3. Privilege escalation via tool invocation
4. Injection attacks (e.g., command, service, or data injection)
5. Exposure of sensitive downstream system data
6. Misconfiguration in production deployments

---

## Security Principles

This project follows these principles:

### 1. No Implicit Trust

- All tool invocations should be treated as untrusted input.
- External clients must be authenticated at the deployment level.

### 2. Least Privilege

- Downstream system service calls should use accounts with restricted roles.
- Avoid running the server with administrative OS privileges.

### 3. Input Validation

- All tool parameters must be validated.
- Never pass unvalidated input directly to:
  - Shell commands
  - Database queries
  - Downstream system services
  - Template engines

---

## Deployment Security Recommendations

This project does not enforce security automatically. Secure deployment is the responsibility of the operator.

### Recommended Practices

- Run behind a reverse proxy (e.g., Nginx, Apache)
- Enforce HTTPS
- Require authentication (API keys, OAuth, or equivalent)
- Restrict network access (firewall / private network)
- Enable logging and monitoring
- Use container isolation if possible

---

## Tool Security Guidelines

When implementing custom tools:

### Avoid

- Executing arbitrary shell commands
- Direct file system writes outside controlled directories
- Passing user input directly to downstream system services
- Exposing internal configuration
- Hardcoding credentials

### Prefer

- Whitelisting allowed operations
- Using parameter schemas
- Defensive programming
- Explicit permission checks per tool

---

## Handling Secrets

- Do not commit secrets to the repository.
- Use environment variables for credentials.
- Rotate credentials regularly.
- Limit downstream system service accounts to minimum required permissions.

---

## Known Limitations

This project:

- Does not sandbox tool execution
- Does not perform automatic privilege separation

These must be handled at deployment time.

---

## Responsible Disclosure

We support responsible disclosure and will:

- Acknowledge reports
- Investigate promptly
- Provide fixes when possible
- Credit reporters (if desired)

Thank you for helping improve the security of this project.
