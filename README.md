# wz-image-preview
看图片用的pwa - 像抖音一样的图片浏览体验

## 功能特点

- 📱 **移动优先设计** - 完美适配手机屏幕
- 🎨 **全屏浏览** - 沉浸式的图片浏览体验
- 👆 **滑动操作** - 像抖音一样上下滑动切换图片
- 💾 **本地存储** - 使用 localStorage 保存图片
- 📦 **PWA 支持** - 可安装到桌面，支持离线使用
- ⌨️ **键盘导航** - 支持方向键切换图片
- 🎯 **简洁界面** - 极简设计，专注于图片本身

## 使用方法

1. 打开 `index.html` 文件
2. 点击右下角的 "+" 按钮添加图片
3. 上下滑动或使用方向键浏览图片
4. 图片会自动保存到浏览器本地存储

## 技术栈

- 纯 HTML/CSS/JavaScript - 无需构建工具
- Service Worker - PWA 离线支持
- LocalStorage API - 本地数据持久化
- CSS Scroll Snap - 流畅的滚动体验

## 安装 PWA

在支持的浏览器中：
1. 访问应用
2. 点击浏览器的"添加到主屏幕"或"安装"选项
3. 应用将作为独立应用安装

## 本地运行

只需使用任何 HTTP 服务器运行即可：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js http-server
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 浏览器兼容性

- Chrome/Edge 88+
- Safari 14+
- Firefox 85+
- 其他现代浏览器

## 许可证

MIT
