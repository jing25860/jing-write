// 数据备份脚本（骨架）
// 作用：把私有 Firebase Realtime Database 的 'shared' 节点导出为 JSON，存入 backups/。
//
// 启用步骤（提供私有 Firebase 配置后）：
//   1) npm i firebase-admin
//   2) 把 Firebase 控制台下载的“服务账号私钥”保存为本目录的 serviceAccount.json（已在 .gitignore 忽略，不会提交）
//   3) 在 serviceAccount.json 同级的配置里填好 databaseURL
//   4) node scripts/backup.mjs
//
// 之后由 WorkBuddy 定时任务调用本脚本，并把生成的 backups/data-YYYY-MM-DD.json 提交回仓库。

import { readFile } from 'fs';
import { mkdirSync, writeFileSync } from 'fs';

const sa = JSON.parse(await readFile(new URL('../serviceAccount.json', import.meta.url)));
const databaseURL = sa.databaseURL; // 例：https://<你的项目>.firebaseio.com

const { initializeApp, cert } = await import('firebase-admin/app');
const { getDatabase } = await import('firebase-admin/database');

const app = initializeApp({ credential: cert(sa), databaseURL });
const db = getDatabase(app);

const snap = await db.ref('shared').get();
const data = snap.val() ?? {};

const ts = new Date().toISOString().slice(0, 10);
mkdirSync(new URL('../backups/', import.meta.url), { recursive: true });
const out = new URL(`../backups/data-${ts}.json`, import.meta.url);
writeFileSync(out, JSON.stringify(data, null, 2));
console.log('[backup] saved ->', out.pathname);
