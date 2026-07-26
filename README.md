# 静 · 写字（手机版）

一个安静的写字 / 素材管理单页应用。本仓库是**唯一代码源**，通过 GitHub Pages 发布成一个稳定链接。

## 同步方式（直接同步）
- 代码改动统一在这里完成（由 WorkBuddy 编辑 `index.html`）。
- 每次功能改完，会自动 `commit + push` 到本仓库。
- GitHub Pages 在推送后约 1 分钟内自动更新线上链接：`https://jing25860.github.io/jing-write/`
- 所以「这边改功能 → 那边链接直接同步」。

## 数据（私有 + 备份）
- 写作数据存放在**你自己的私有 Firebase**（不再用公开库，只有你能读写）。
- 定时任务会把数据导出为 JSON 备份，提交回本仓库的 `backups/` 目录，版本可追溯。

## 目录结构
- `index.html` —— 应用本体（唯一入口）
- `backups/` —— 数据备份 JSON
- `scripts/backup.mjs` —— 备份脚本骨架（提供私有 Firebase 配置后启用）

## 注意
- Firebase 的 `apiKey` 是公开设计、可写进前端；真正私密靠**安全规则**锁定只有你能读写。
- 备份脚本运行需 `npm i firebase-admin` 并放置 `serviceAccount.json`（私钥，已在 .gitignore 忽略）。
