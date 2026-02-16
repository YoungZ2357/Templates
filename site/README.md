# Templates Site

基于 Vite + React + TypeScript 的模板文件展示与下载页面，部署于 GitHub Pages。

## 功能

- 自动读取仓库中的模板文件（按目录分组展示）
- 搜索 / 筛选文件
- 多选文件，一键打包下载为 zip
- 响应式布局，移动端适配
- 仓库更新后页面自动反映最新内容（运行时调用 GitHub API）

## 仓库结构

```
Templates/
├── latex/                  # 模板类别 1
├── prompt_engineering/     # 模板类别 2
├── site/                   # ← 前端项目（本目录）
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── .github/workflows/
    └── deploy.yml          # 自动部署 workflow
```

## 本地开发

```bash
cd site
npm install
npm run dev
```

## 部署

### 初始配置（仅一次）

1. 将 `site/` 目录和 `.github/` 目录放入 Templates 仓库的 `main` 分支
2. 在仓库 Settings → Pages → Source 中选择 **GitHub Actions**
3. Push 到 `main` 分支，Actions 会自动构建并部署

### 日常更新

- **更新模板文件**：直接 push 到 `main`，用户刷新页面即可看到最新内容
- **更新前端代码**：修改 `site/` 下的文件并 push 到 `main`，Actions 自动重新部署

## 扩展

### 添加新的模板类别

直接在仓库根目录创建新的英文目录（如 `python/`），页面会自动识别。

### 支持新的文件类型

编辑 `site/src/utils/config.ts` 中的 `ALLOWED_EXTENSIONS` 数组：

```ts
export const ALLOWED_EXTENSIONS: string[] = [
  '.md',
  '.tex',
  '.docx',
  '.txt',   // 新增
  '.py',    // 新增
];
```
