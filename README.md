# 启诚控股集团官网

Qicheng Holdings Group 官方网站 - 全球数字金融与经济系统协作组织

## 项目结构

```
启诚/
├── index.html              # 首页
├── pages/                  # 页面目录
│   ├── about.html         # 关于启诚投资
│   ├── business-model.html # 商业模式
│   ├── txo.html           # TXO 交易所
│   ├── license.html       # 合规与牌照
│   ├── profit.html        # 盈利体系
│   ├── calculator.html    # 智能收益计算器
│   └── timeline.html      # 时间线
├── assets/                # 静态资源目录
│   ├── css/               # 样式文件
│   │   └── styles.css    # 主样式文件
│   ├── js/                # JavaScript 文件
│   ├── images/            # 图片资源
│   ├── fonts/             # 字体文件
│   ├── videos/            # 视频文件
│   └── icons/             # 图标文件
├── server.py              # 本地开发服务器
└── README.md              # 项目说明文档
```

## 快速开始

### 方法一：使用 Python 服务器（推荐）

1. 确保已安装 Python 3
2. 在项目目录下运行：

```bash
python3 server.py
```

或者：

```bash
python server.py
```

3. 浏览器会自动打开 `http://localhost:8000`

### 方法二：使用 Python 内置服务器

```bash
python3 -m http.server 8000
```

然后在浏览器访问 `http://localhost:8000`

### 方法三：使用 Node.js 服务器

如果已安装 Node.js，可以使用 `http-server`：

```bash
npx http-server -p 8000
```

### 方法四：直接打开 HTML 文件

可以直接在浏览器中打开 `index.html` 文件，但某些功能（如视频、外部资源）可能无法正常工作。

## 功能特性

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 现代化 UI 设计
- ✅ 图片轮播效果
- ✅ 国旗滚动动画
- ✅ 鼠标跟随光效
- ✅ 导航菜单下拉效果
- ✅ 智能收益计算器

## 浏览器支持

- Chrome/Edge (推荐)
- Firefox
- Safari
- 移动端浏览器

## 开发说明

- 所有样式都在 `assets/css/styles.css` 中
- 页面使用纯 HTML + CSS，无外部 JavaScript 依赖
- 部分交互效果使用内联 JavaScript
- 项目采用标准的网站目录结构，便于维护和扩展

## 目录结构说明

- **pages/**: 存放所有子页面，便于统一管理
- **assets/css/**: 样式文件目录
- **assets/js/**: JavaScript 文件目录（预留）
- **assets/images/**: 图片资源目录
- **assets/fonts/**: 字体文件目录
- **assets/videos/**: 视频文件目录
- **assets/icons/**: 图标文件目录（SVG等）

## 注意事项

- 确保所有静态资源路径正确
- 视频文件 `assets/videos/cube.mp4` 需要存在
- 图片资源在 `assets/images/` 目录下
- 字体文件在 `assets/fonts/` 目录下
- 页面间链接使用相对路径，确保导航正常工作

## 许可证

© 2024 Qicheng Holdings Group. All rights reserved.
