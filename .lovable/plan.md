# Plan: License Key System + Extension Activation Gate

## 1. Backend — Your Supabase (not Lovable Cloud)

Using:
- URL: `https://sqkvakhzgsgqvfayefwm.supabase.co`
- Anon key: `sb_publishable_UtFsx1XfkWAIauj4kXssaw_5h45Em0D`

I'll store these as **build-time env** in the web app (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) and hardcode them in the extension's `extension-config.js` (extensions can't read env at runtime).

**Since it's your own Supabase**, I cannot run migrations from here. I'll give you the SQL to paste into your Supabase SQL editor.

### Tables (SQL I'll provide)
- `admins` — you (seeded with your email)
- `resellers` — created manually by you
- `license_keys` — `key`, `duration_type` (1m/3m/6m/1y/lifetime), `status` (unused/active/revoked), `device_fingerprint`, `activated_at`, `expires_at`, `created_by_admin_id`, `created_by_reseller_id`, `client_name`
- `key_activation_logs` — audit trail

### RPC functions
- `activate_key(key, fingerprint)` → binds key to device on first use; rejects if already bound to a different device; returns status + expiry
- `validate_key(key, fingerprint)` → periodic check from extension
- `has_role(user_id, role)` for admin/reseller RLS

**Hard device lock**: once `status='active'`, the key is permanently bound to that fingerprint. Only admin/reseller can reset.

## 2. Admin Login

Your account: `Ihtishamali.aispecialist@gmail.com` / `Ihtisham@Admin@Lov#2011`

I'll give you a one-time SQL snippet to create this user in Supabase Auth + insert into `admins` table.

## 3. Web Routes

### `/admin-og` (you only)
- Login (email + password)
- Dashboard:
  - Create license key: pick duration (1m/3m/6m/1y/lifetime) + optional client name → generates key
  - View all keys (filter by status, reseller, date)
  - Reset device binding on any key
  - Revoke key
  - Manage resellers (create/disable, set key quota)
  - View all clients across all resellers

### `/resellers-og` (resellers only)
- Login (same auth, role = reseller)
- Dashboard:
  - Create keys within their quota
  - View/reset their own clients' keys only
  - Cannot see other resellers' data (enforced by RLS)

## 4. Extension Changes

### Remove
- All YouTube buttons/popups
- WhatsApp channel button in footer (keep only WhatsApp **contact** button on welcome screen)
- Any other channel popups

### New first-open flow (welcome screen)
1. **Animated welcome message** — typewriter-style handwritten feel, staggered word reveal, subtle fade/slide (no bouncy AI-looking motion). Text like *"Welcome."* → *"Let's get you set up."*
2. Below: **activation key input** + **"Contact on WhatsApp"** button (your personal WhatsApp link — you'll provide the number, or I'll keep the current one)
3. User pastes key → click Activate:
   - Loading spinner (subtle)
   - Calls `activate_key(key, fingerprint)` on your Supabase
   - **Valid** → green checkmark animation + *"Verified"* text → smooth transition to main extension UI
   - **Invalid / already bound** → shake + red inline message, stays on gate
4. Key + fingerprint saved to `chrome.storage.local`. On every extension open, revalidate silently — if revoked/expired/rebound, kick back to activation screen.

**The main extension UI is NEVER shown without a valid activated key. No bypass.**

## 5. Humanized animations
- Slow easing curves (cubic-bezier(.22,.61,.36,1))
- Slight rotation/skew on entrance
- Handwritten-feel font for welcome heading (e.g. Instrument Serif italic which is already loaded)
- No bounce, no pulsing gradients, no rainbow glow

---

## What I need from you before building
1. **WhatsApp number** for the "Contact on WhatsApp" button (or keep the existing channel URL as a personal chat link?)
2. **Confirm**: I generate keys as e.g. `UNL-XXXX-XXXX-XXXX-XXXX` (16 chars, uppercase, dashed). OK?
3. Ready for me to give you the SQL to run in your Supabase? (I can't run migrations against your project from here.)

Reply and I start building immediately.