# 🌌 Octen Project Agent Rules (Vercel & Component Isolation Policy)

## 1. 📦 Vercel 构建与 Dist 完整性原则 (Dist Folder & Vercel Integrity)
- **双重构建绑定**：在进行任何 Vercel 部署或 Git 推送前，`pnpm run build` 必须同时包含 Vite 编译 (`vite build`) 与 预渲染生成 (`scripts/prerender_to_pure_static.tsx`)。
- **静态资源收合**：所有预渲染生成的多版本 HTML (`index1_v1.html`, `index1_v2.html`, `comparison.html` 等) 必须统一下发至 `dist/` 根目录，防止 Vercel 访问出现 404。
- **`vercel.json` 显式配置**：项目根目录必须包含 `vercel.json`，明确指定 `"outputDirectory": "dist"`, `"cleanUrls": true`, 与 `"buildCommand": "pnpm run build"`。

## 2. 🛡️ 组件版本硬隔离原则 (Strict Component Version Isolation)
- **显式传递 `version` Prop**：当 UI 组件包含多版本逻辑 (`v1` / `v2` / `v3`) 时，`App.tsx` 与静态预渲染脚本必须显式向每一个子组件传递 `version={version}`，严禁不传参盲目调用导致 `v1` 混入 `v2/v3` 切图样式。

## 3. 🔑 Git 推送 Token 隔离原则 (Git Push Environment Sanitization)
- 在 Windows PowerShell 下执行 `git push` 时，务必事先重置环境变量 `$env:GITHUB_TOKEN=""`，防止局部 Token 覆盖导致的 HTTP 403 或鉴权挂起问题。
