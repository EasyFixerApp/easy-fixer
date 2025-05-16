> [!NOTE]
> This is an **optimal** ADR template. Not every field needs to appear in every record—what matters most is that you **capture the key decision**, **why** it was made, and any **critical trade-offs**.  
> Fields without \* are optional—omit them if they don’t add value for simple decisions.

# ID: Title

**Status\***: [Proposed | Accepted | Deprecated | Superseded]  
**Date\***: YYYY-MM-DD <!-- The date when this decision was made or proposed -->
**Author(s)**: <!-- for future reference and clarification -->

<!-- **Stakeholders**: Team A, Team B -->

## Context\*

<!-- Describe the background, problem statement, and drivers. Include relevant constraints, business drivers, technical requirements, and previous decisions that influenced this decision. Be specific about the forces at play and why a decision is needed now. -->

## Decision\*

<!-- State the chosen approach clearly and concisely. Be explicit about what was decided. Use active voice (e.g., "We will use..." rather than "It was decided..."). Include implementation details if relevant but keep it focused on the architectural decision. -->

## Alternatives Considered\*

- **Option X**:

  - Description:
  - Pros:
  - Cons:

  <!-- Document all viable alternatives that were considered, not just the chosen approach. For each option, describe how it would address the problem and list its advantages and disadvantages. This demonstrates due diligence and provides context if the decision needs to be revisited. -->

## Consequences

<!-- Consequences considering: performance, security, maintainability, cost, DX, .. etc
Describe the resulting context after applying the decision, including both positive and negative consequences. Consider long-term implications across multiple dimensions. -->

### Positive

<!-- List specific benefits and improvements resulting from this decision -->

### Negative

<!-- Acknowledge tradeoffs, risks, and limitations introduced by this decision -->

### Mitigations

<!-- Describe strategies to address or minimize the negative consequences -->

## Related Decisions

- [ID: Name](link)
<!-- Reference other ADRs that influenced this decision or will be affected by it. Creating a network of related decisions helps maintain the overall architecture narrative. -->

---

## Example ADR

---

# ADR 001: Adopt GraphQL for API Layer

**Status**: Accepted  
**Date**: 2023-06-15  
**Author(s)**: Jane Smith, Alex Johnson

## Context

Our current REST API requires multiple endpoints for different data needs, causing over-fetching and under-fetching issues. Mobile clients especially suffer from performance problems on slower networks. We need a more flexible API solution that can adapt to varying client requirements while maintaining performance.

## Decision

We will implement GraphQL as our primary API layer, using Apollo Server with Node.js. We'll maintain some critical REST endpoints for backwards compatibility but all new feature development will use GraphQL.

## Alternatives Considered

- **Continue with REST API expansion**:
  - Pros: Team familiarity, no learning curve, established patterns
  - Cons: Continued over-fetching problems, endpoint proliferation, poor mobile performance
- **Adopt OData**:
  - Pros: Standardized querying, Microsoft backing, good for data filtering
  - Cons: Less community adoption, fewer libraries, steeper learning curve than GraphQL
- **Custom query language**:
  - Pros: Tailored to our exact needs, complete control
  - Cons: Significant development effort, no community support, documentation burden

## Consequences

### Positive

- Clients can request exactly the data they need in a single request
- Strong typing through GraphQL schema
- Better developer experience with GraphQL tooling and introspection
- Reduced network traffic for mobile clients

### Negative

- Learning curve for team members unfamiliar with GraphQL
- Potential caching challenges compared to REST
- Additional complexity in server implementation

#### Mitigations

- Schedule training sessions for the team
- Implement DataLoader pattern to address N+1 query problems
- Start with a small subset of features to build familiarity

## Related Decisions

- [ADR-002: GraphQL Schema Design Principles](./002-graphql-schema-design.md)
- [ADR-003: API Authentication Strategy](./003-api-authentication.md)
