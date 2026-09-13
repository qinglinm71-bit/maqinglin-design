# Ma Qinglin · UI/UX Portfolio

马庆林的个人 UI/UX 设计师作品集。以黑色金属、斜切几何与冰蓝光效连接六个真实案例、22 件动态作品及个人介绍。

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

Node.js 22.12+。构建目录为 `dist`。

## Pages

- `/` — 首页、作品、动效入口、关于与联系
- `/work` — 作品分类
- `/about` — 个人介绍与设计能力
- `/motion` — 22 件自动播放、保留原比例的动态作品
- `/project/66vip`、`/project/property`、`/project/rideshare`、`/project/hmi`、`/project/campaign`、`/project/visual` — 六个沉浸式案例

## Deployment

Vercel 使用 `vercel.json` 配置，Cloudflare Pages 构建命令为 `pnpm build`，输出目录为 `dist`。已提供 SPA 路由回退，支持直接访问案例页。

## Rights

项目图片、视频、个人照片及案例内容仅用于作者作品集展示；相关品牌与作品权利归其各自权利人所有。
