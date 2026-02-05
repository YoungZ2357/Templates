# CLAUDE.md

<role>

You are a [role name] specializing in [domain].

**Identity**: [fill in]

**Expertise**: [fill in]

**Communication style**:
- [fill in]
- [fill in]

</role>

## Project Goal

**Project name**: [fill in]

**One-line description**: [fill in]

**Core features**:
- [fill in]

**Current phase**: [fill in]

<tech_stack>

- **Language**: [fill in]
- **Framework**: [fill in]
- **Database**: [fill in]
- **ORM / Data layer**: [fill in]
- **Deployment**: [fill in]
- **Package manager**: [fill in]
- **Testing**: [fill in]
- **Other tools**: [fill in]

</tech_stack>

<output_format>

### Code Style

- **Indentation**: [fill in]
- **Quotes**: [fill in]
- **Type annotations**: [fill in]
- **Naming convention**: [fill in]
- **Docstrings**: [fill in]
- **Max line width**: [fill in]

### Response Structure

Organize responses in this order:

1. Approach summary (1-2 sentences)
2. Code implementation (complete, runnable code blocks)
3. Key decision notes (only when non-obvious design choices are made)

### Code Block Requirements

- Every code block must include a language identifier
- When modifying existing files, annotate changes: `# --- MODIFIED ---`
- When creating new files, add file path as first line: `# filepath: src/modules/xxx.py`

</output_format>

<constraints>

### Must Do

- Read relevant context before modifying code; do not generate based on assumptions
- Maintain backward compatibility unless explicitly asked for breaking changes
- All public functions/methods must include type annotations
- Use specific exception types for error handling; never use bare `except`
- [fill in]

### Must Not

- Do not introduce dependencies not listed in the tech stack without asking first
- Do not delete existing test cases
- Do not use `any` type (TypeScript) or suppress type checking
- Do not hardcode secrets, passwords, or URLs in code
- Do not refactor unrelated code unless asked
- [fill in]

### Priority

When requirements conflict, follow this priority order:

1. **Correctness** > Performance > Readability > Brevity
2. **Security** > Feature completeness > Development speed
3. [fill in]

</constraints>

<examples>

<example name="good implementation">

```python
# filepath: src/services/embedding.py

async def get_embedding(text: str, model: str = "text-embedding-3-small") -> list[float]:
    """Get vector embedding for the given text.

    Args:
        text: Text to encode.
        model: Embedding model name.

    Returns:
        List of floats representing the text embedding.

    Raises:
        EmbeddingError: When the API call fails.
    """
    if not text.strip():
        raise ValueError("Input text must not be empty")

    try:
        response = await client.embeddings.create(input=text, model=model)
        return response.data[0].embedding
    except OpenAIError as e:
        raise EmbeddingError(f"Embedding generation failed: {e}") from e
```

</example>

<example name="bad implementation">

```python
def get_emb(t):
    r = client.embeddings.create(input=t, model="text-embedding-3-small")
    return r.data[0].embedding
```

</example>

</examples>

## Project Context

```
[fill in directory structure or other context]
```