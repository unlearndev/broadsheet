# Export notes

- Export uses papaparse's `unparse` with an explicit column list so column order is stable.
- Line endings are `\r\n` (papaparse default, matches RFC 4180 and what Excel expects).
- Tokens are deliberately left out of the export.
- If exports get slow for big lists, consider streaming rows instead of building one string.
