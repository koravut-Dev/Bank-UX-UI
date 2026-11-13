# Usability Heuristics and Principles

## Nielsen's 10 Usability Heuristics
1. **Visibility of system status**: always show what is happening (loading, saved, step 2 of 4). Respond within feedback thresholds (see Doherty Threshold).
2. **Match between system and real world**: use users' language and familiar concepts, not internal jargon. Logical, natural order.
3. **User control and freedom**: clearly marked undo, cancel, back, close. Allow leaving unwanted states.
4. **Consistency and standards**: same word/icon/action means the same thing everywhere; follow platform conventions (Jakob's Law).
5. **Error prevention**: constraints, sensible defaults, confirmation only for destructive actions, inline validation before submit.
6. **Recognition rather than recall**: show options, recent items, labels; don't make users remember across screens.
7. **Flexibility and efficiency of use**: shortcuts, defaults, bulk actions for experts without burdening novices.
8. **Aesthetic and minimalist design**: remove information that competes with what matters.
9. **Help users recognize, diagnose, and recover from errors**: plain-language message, say what went wrong, say how to fix, keep user input.
10. **Help and documentation**: searchable, task-focused, short, available in context.

## Shneiderman's 8 Golden Rules
1. Strive for consistency. 2. Enable shortcuts for frequent users. 3. Offer informative feedback. 4. Design dialogs that yield closure (clear start, middle, end). 5. Prevent errors; offer simple error handling. 6. Permit easy reversal of actions. 7. Keep users in control (internal locus of control). 8. Reduce short-term memory load.

## Norman's Design Principles
- **Affordance**: what an element lets you do. **Signifier**: the visible cue that shows it (button shape, underline).
- **Mapping**: controls relate naturally to effects (layout of switches to what they control).
- **Feedback**: immediate, clear result of every action.
- **Constraints**: limit wrong actions (disable, mask input, pickers instead of free text).
- **Conceptual model**: UI should help users form an accurate mental model.
- **Gulf of execution / evaluation**: minimize the gap between intent and action, and between result and understanding.

## Forms (derived from the rules above)
- One column, label above field, visible labels (not placeholder-only) → Nielsen #6, WCAG 3.3.2.
- Mark optional fields, not required ones, when most are required.
- Validate on blur, show error next to the field, keep entered data → Nielsen #9.
- Use correct input types, autocomplete attributes, and input masks → Nielsen #5, WCAG 1.3.5.
- Primary action visually dominant; destructive action separated and confirmed or undoable.

## Navigation
- Keep the number of top-level items small (Hick's Law, Miller's Law); label with user words.
- Show current location (breadcrumbs, active state) → Nielsen #1.
- Don't hide primary navigation behind a gesture or icon-only control.

## Error and empty states
- Error: what happened + why (if known) + what to do next + no blame.
- Empty: explain what belongs here, give one clear primary action.
- Loading: skeletons for layout-known content, progress for long waits.
