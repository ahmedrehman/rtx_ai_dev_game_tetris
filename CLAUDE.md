# Planning Rules for AI Assistant

This file defines how AI and User collaborate on project planning. Referenced in CLAUDE.md.

---

## Core Rule: Plan is Part of Every Change

**Every code change MUST also update the plan.**
Planning is not optional or separate — it is a mandatory part of every implementation task.
When AI modifies code, it MUST also update the relevant `plan/mod_<name>.md` and detail files.

---

## Plan Folder Structure

### Module files: `plan/mod_<name>.md`
High-level planning per module. Each topic has 4 tagged sections:

```
## <Topic>  [User Input]
User's requirements and intent. AI never modifies this section.

## <Topic>  [AI Feedback]
AI observations — only high-level important things:
- Hints that MUST be considered
- Things often done wrong technically
- Key insights and learnings from implementation
- Conflicts or open decisions
Keep short. Only truly important points. Not essays.

## <Topic>  [AI Implementation]
Current implementation status — what is actually built and working.
Brief description of what exists in code.

## <Topic>  [AI Todos]
Remaining work — high-level only.
What needs to be done, fixed, or improved.
```

### Detail files: `plan/mod_<name>_details.md`
Per module or topic, a separate details file for:
- Detail-level planning (not critical enough for main plan)
- Current layout and design specifics
- UI structure, component arrangements
- Things that relate to the current design and can change anytime
- Implementation notes that help but aren't rules

Not too much — just enough to understand the current state.
These files are living documents that change with every redesign.

### Supporting files:
- `plan/planning.md` — overview, overall status, workflow description
- `plan/contracts.md` — all module interfaces, public methods, data structures, API endpoints
- `plan/data_ownership.md` — who owns what data, single source of truth
- `plan/issues.md` — current bugs and broken things (separate from design)
- `plan/modules_rules.md` — principles that apply to all modules

---

## Section Tags Reference

| Tag | Owner | Purpose |
|-----|-------|---------|
| `[User Input]` | User | Requirements and intent. AI never changes. |
| `[AI Feedback]` | AI | Important hints, warnings, insights. High-level only. |
| `[AI Implementation]` | AI | What is actually built. Updated after every code change. |
| `[AI Todos]` | AI | Remaining work items. Updated after every code change. |

---

## What Goes Where

### In `mod_<name>.md` (high-level):
- Architecture decisions
- Important technical hints and gotchas
- Module boundaries and contracts
- Status of what's built vs planned
- Critical todos

### In `mod_<name>_details.md` (detail-level):
- Current UI layout and component structure
- CSS/styling specifics
- HTML structure and Alpine.js bindings
- API endpoint details
- Data format examples
- Anything tied to current design that may change

---

## AI Feedback Rules

Write in `[AI Feedback]` ONLY:
- Things that are **important** and must be considered
- Technical pitfalls that are **often done wrong**
- Key **insights** discovered during implementation
- **Conflicts** between requirements that need resolution

Do NOT write:
- Obvious things
- Long explanations
- Low-priority suggestions
- Things that are already working fine

---

## Review Workflow

### Cycle:
1. AI writes feedback in `[AI Feedback]` — short, important only
2. User responds: "agreed" or gives a different answer
3. AI updates `[AI Implementation]` and `[AI Todos]` accordingly
4. Empty `[AI Feedback]` = all resolved. Text = needs attention.

### How user responds:
User adds `[Answer: ...]` tags inside `[AI Feedback]`:
```
* AI's important point [Answer: agreed]
* AI's other flag [Answer: no, I want X instead]
```

---

## AI Behavior Rules

### On every code change:
1. Implement the code change
2. Update `[AI Implementation]` in relevant module plan
3. Update `[AI Todos]` — remove done items, add new ones
4. Add `[AI Feedback]` ONLY if there's something truly important
5. Update detail file if layout/design changed

### Do:
- Keep plan files concise and scannable
- Use bullets, not paragraphs
- Ground feedback in actual code, not assumptions
- Track what's built vs what's planned
- Separate critical issues from nice-to-haves

### Don't:
- Write long essays in plan files
- Fill feedback with obvious things
- Skip plan updates when changing code
- Mix high-level and detail-level in same file
- Modify `[User Input]` sections ever
