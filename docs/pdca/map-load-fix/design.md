# Design: Map Load Fix 
 
## Architecture 
- Unify map initialization guard and cleanup rules for all map components. 
- Prevent duplicate script loading across map instances. 
 
## Data Model / API 
- No schema changes. 
- Keep fallback coordinates for invalid address. 
 
## Test Plan 
- Manual check two-map page. 
- Verify no JS errors during initialization.
