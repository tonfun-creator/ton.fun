/* ============================================
   ton.fun — Design System
   Chunky 3D sticker style · TON blue brand
   ============================================ */

:root {
  --bg: #0b0f15;
  --bg-outer: #070a0e;
  --surface: #141a23;
  --surface-2: #1d2531;
  --line: #28313e;
  --edge: #3a4657;
  --hard: #000000;
  --fg: #eef2f8;
  --muted: #8b98aa;
  --accent: #2db3ff;
  --accent-ink: #031a2b;
  --accent-fg: #2db3ff;
  --btn-edge: #0a6aa6;
  --up: #3ddc84;
  --up-ink: #052412;
  --up-edge: #138343;
  --up-text: #3ddc84;
  --down: #ff5d6c;
  --down-ink: #2a050a;
  --down-edge: #a3263a;
  --down-text: #ff7d89;
  --font-display: "Bricolage Grotesque", "Trebuchet MS", system-ui, sans-serif;
  --font-body: "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif;
  color-scheme: dark;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background: var(--bg-outer);
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
}

button { font-family: inherit; cursor: pointer; }
a { color: inherit; text-decoration: none; }
input, textarea { font-family: inherit; }

/* ===== App Shell ===== */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  margin: 0 auto;
  background: var(--bg);
  position: relative;
}

.main {
  flex: 1;
  padding: 16px;
  padding-bottom: 100px;
  overflow-x: hidden;
}

/* ===== Header ===== */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface);
  border-bottom: 3px solid var(--hard);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--accent);
  color: var(--accent-ink);
  border: 3px solid var(--hard);
  border-radius: 10px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 13px;
  box-shadow: 3px 3px 0 var(--btn-edge);
  transition: transform 0.08s, box-shadow 0.08s;
}

.nav-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--btn-edge);
}

.nav-btn.secondary {
  background: var(--surface-2);
  color: var(--fg);
  box-shadow: 3px 3px 0 var(--hard);
}

/* ===== User Chip ===== */
.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--surface-2);
  border: 3px solid var(--hard);
  border-radius: 999px;
  color: var(--fg);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  box-shadow: 3px 3px 0 var(--hard);
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-chip.guest {
  background: var(--surface);
  color: var(--muted);
}

.user-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--up);
  box-shadow: 0 0 8px var(--up);
  flex-shrink: 0;
}

/* ===== Page Titles ===== */
.page-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--fg);
  margin-bottom: 4px;
  line-height: 1.1;
}

.page-subtitle {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 20px;
  font-weight: 500;
}

/* ===== Search ===== */
.search-container { margin-bottom: 14px; }

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: var(--surface);
  border: 3px solid var(--hard);
  border-radius: 14px;
  box-shadow: 3px 3px 0 var(--hard);
}

.search-icon { color: var(--muted); flex-shrink: 0; }

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--fg);
  font-size: 14px;
  font-weight: 500;
}

.search-input::placeholder { color: var(--muted); }

.search-clear {
  background: var(--surface-2);
  border: 2px solid var(--hard);
  color: var(--fg);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

/* ===== Filters ===== */
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.filters::-webkit-scrollbar { display: none; }

.filter-btn {
  flex-shrink: 0;
  padding: 8px 16px;
  background: var(--surface);
  color: var(--fg);
  border: 3px solid var(--hard);
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  box-shadow: 3px 3px 0 var(--hard);
  transition: transform 0.08s, box-shadow 0.08s;
}

.filter-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--hard);
}

.filter-btn.active {
  background: var(--accent);
  color: var(--accent-ink);
  box-shadow: 3px 3px 0 var(--btn-edge);
}

/* ===== Results Count ===== */
.results-count {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  margin-bottom: 12px;
  padding: 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== Token Grid ===== */
.token-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 640px) {
  .token-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 900px) {
  .token-grid { grid-template-columns: repeat(4, 1fr); }
}

.token-card {
  display: block;
  padding: 12px;
  background: var(--surface);
  border: 3px solid var(--hard);
  border-radius: 16px;
  box-shadow: 4px 4px 0 var(--hard);
  transition: transform 0.08s, box-shadow 0.08s;
}

.token-card:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--hard);
}

.token-card-img {
  width: 100%;
  aspect-ratio: 1;
  background: var(--surface-2);
  border: 3px solid var(--hard);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 10px;
}

.token-card-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 14px;
  color: var(--fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.token-card-symbol {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.token-card-stats {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding-top: 10px;
  border-top: 2px solid var(--line);
}

.token-card-stat-label {
  font-size: 10px;
  color: var(--muted);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.token-card-stat-value {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 800;
  color: var(--fg);
}

.token-card-stat-value.up { color: var(--up-text); }

/* ===== Bottom Nav ===== */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0 max(8px, env(safe-area-inset-bottom));
  background: var(--surface);
  border-top: 3px solid var(--hard);
}

.bottom-nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-size: 22px;
  color: var(--muted);
  background: transparent;
  border: none;
  transition: transform 0.08s;
}

.bottom-nav-item.active {
  color: var(--accent);
  transform: scale(1.15);
}

/* ===== Forms ===== */
.create-page {
  background: var(--bg);
  margin: -16px;
  padding: 20px 16px 120px;
  min-height: 100vh;
}

.create-header { margin-bottom: 20px; }

.create-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: var(--fg);
}

.create-section { margin-bottom: 20px; }

.create-label {
  display: block;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: var(--fg);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.optional { color: var(--muted); font-weight: 500; text-transform: none; }

.create-input,
.create-textarea {
  width: 100%;
  padding: 14px 16px;
  background: var(--surface);
  border: 3px solid var(--hard);
  border-radius: 12px;
  color: var(--fg);
  font-size: 14px;
  font-weight: 500;
  outline: none;
  box-shadow: 3px 3px 0 var(--hard);
  transition: border-color 0.15s;
}

.create-input::placeholder,
.create-textarea::placeholder { color: var(--muted); }

.create-input:focus,
.create-textarea:focus { border-color: var(--accent); }

.create-textarea { resize: vertical; min-height: 80px; }

/* ===== Pool Pair ===== */
.pool-pair-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.pool-pair-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  background: var(--surface);
  border: 3px solid var(--hard);
  border-radius: 14px;
  color: var(--fg);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  box-shadow: 3px 3px 0 var(--hard);
  transition: transform 0.08s, box-shadow 0.08s;
}

.pool-pair-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--hard);
}

.pool-pair-btn.active {
  border-color: var(--accent);
  box-shadow: 3px 3px 0 var(--btn-edge);
}

.pool-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
  border: 2px solid var(--hard);
}

.pool-ton { background: var(--accent); color: var(--accent-ink); }
.pool-usdt { background: #26a17b; color: #fff; }
.pool-custom { background: var(--surface-2); color: var(--fg); }

/* ===== Social ===== */
.social-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: var(--surface);
  border: 3px solid var(--hard);
  border-radius: 12px;
  box-shadow: 3px 3px 0 var(--hard);
}

/* ===== Rewards Toggle ===== */
.rewards-toggle {
  display: flex;
  gap: 6px;
  padding: 5px;
  background: var(--surface);
  border: 3px solid var(--hard);
  border-radius: 14px;
  box-shadow: 3px 3px 0 var(--hard);
}

.rewards-btn {
  flex: 1;
  padding: 12px;
  background: transparent;
  color: var(--muted);
  border: none;
  border-radius: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  transition: all 0.1s;
}

.rewards-btn.active {
  background: var(--accent);
  color: var(--accent-ink);
}

/* ===== Mayhem Card ===== */
.mayhem-card {
  padding: 16px;
  background: var(--surface);
  border: 3px solid var(--hard);
  border-radius: 14px;
  box-shadow: 3px 3px 0 var(--hard);
  margin-bottom: 20px;
}

.mayhem-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mayhem-icon { font-size: 24px; color: var(--accent); }

.mayhem-text { flex: 1; }

.mayhem-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 15px;
  color: var(--fg);
}

.mayhem-subtitle {
  font-size: 12px;
  color: var(--muted);
}

.switch {
  width: 52px;
  height: 30px;
  border-radius: 15px;
  border: 3px solid var(--hard);
  position: relative;
  transition: background 0.2s;
  padding: 0;
}

.switch.on { background: var(--up); }
.switch.off { background: var(--surface-2); }

.switch-knob {
  position: absolute;
  top: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid var(--hard);
  transition: left 0.2s;
}

.switch.on .switch-knob { left: 24px; }
.switch.off .switch-knob { left: 2px; }

.mayhem-modes {
  display: flex;
  gap: 6px;
  padding: 5px;
  background: var(--bg);
  border: 3px solid var(--hard);
  border-radius: 14px;
}

.mayhem-mode-btn {
  flex: 1;
  padding: 10px 4px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: var(--muted);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  transition: all 0.1s;
}

.mayhem-mode-btn.active {
  background: var(--accent);
  color: var(--accent-ink);
}

/* ===== Submit Button ===== */
.create-next-btn {
  width: 100%;
  padding: 18px;
  background: var(--accent);
  color: var(--accent-ink);
  border: 3px solid var(--hard);
  border-radius: 14px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 16px;
  box-shadow: 4px 4px 0 var(--btn-edge);
  transition: transform 0.08s, box-shadow 0.08s;
}

.create-next-btn:active:not(:disabled) {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--btn-edge);
}

.create-next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.create-footer-note {
  text-align: center;
  color: var(--muted);
  font-size: 12px;
  margin-top: 12px;
}

.create-hint {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
  margin-top: 8px;
}

/* ===== Media Upload ===== */
.media-upload {
  position: relative;
  width: 100%;
  height: 160px;
  border: 3px dashed var(--edge);
  border-radius: 14px;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.media-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
}

.media-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.media-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ===== Splash ===== */
.splash {
  position: fixed;
  inset: 0;
  background: var(--bg-outer);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.4s ease-out;
}

.splash.fade-out {
  opacity: 0;
  pointer-events: none;
}

.splash-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: splashPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.splash-text {
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -2px;
  color: var(--fg);
  margin: 0;
}

@keyframes splashPop {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}

/* ===== Empty / Loading States ===== */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--muted);
}

.empty-state-icon { font-size: 56px; margin-bottom: 12px; }

.empty-state-text {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--fg);
}

/* ===== General scrollbar ===== */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--surface-2); border-radius: 3px; }
