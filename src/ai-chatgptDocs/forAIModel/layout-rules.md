# layout-rules.md

## 一、Layout 总体结构

后台整体 Layout 结构：

```txt
layout
 ├── sidebar
 └── main-container
      ├── navbar
      ├── tagsView
      └── appMain
```

整体职责：

- sidebar：菜单导航
- navbar：顶部导航
- tagsView：页面标签导航
- appMain：页面内容区域

---

# 二、标准 Layout 模板

```vue
<template>
  <div class="layout">
    <Sidebar />

    <div class="main-container">
      <Navbar />

      <TagsView />

      <AppMain />
    </div>
  </div>
</template>
```

---

# 三、Layout 基础布局规范

## layout

负责：

- 横向布局
- sidebar + 主内容区域

```scss
.layout {
  display: flex;
  width: 100%;
  height: 100vh;
}
```

---

## main-container

负责：

- navbar
- tagsView
- appMain

纵向布局。

```scss
.main-container {
  flex: 1;

  display: flex;
  flex-direction: column;

  min-width: 0;
}
```

---

# 四、Sidebar 规范

## 功能

sidebar 负责：

- 菜单导航
- 页面跳转
- 菜单高亮
- 菜单折叠
- 多级菜单

---

## Sidebar 宽度

展开：

```css
220px
```

折叠：

```css
64px
```

---

## Sidebar 样式

```scss
.sidebar {
  height: 100%;

  background: linear-gradient(180deg, #001529 0%, #002140 100%);

  overflow: hidden;
}
```

---

## 菜单高亮规范

当前菜单：

```css
#1677ff
```

hover：

```css
rgba(255,255,255,.08)
```

---

# 五、Navbar 规范

## 功能

navbar 包含：

- 折叠按钮
- breadcrumb
- 搜索
- 通知
- 全屏
- 用户头像
- 用户下拉菜单

---

## Navbar 高度

```css
60px
```

---

## Navbar 样式

```scss
.navbar {
  height: 60px;

  background: #fff;

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;

  z-index: 10;
}
```

---

# 六、TagsView 规范

## 功能

tagsView 用于：

- 多页面切换
- 页面缓存展示
- 当前页面高亮
- 快速返回页面

---

## TagsView 高度

```css
40px
```

---

## TagsView 样式

```scss
.tags-view {
  height: 40px;

  background: #fff;

  display: flex;
  align-items: center;

  padding: 0 10px;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

---

## 当前激活 Tag

```css
background: #409eff;
color: #fff;
```

---

# 七、AppMain 规范

## 功能

appMain 用于：

```vue
<router-view />
```

渲染业务页面。

---

## AppMain 样式

```scss
.app-main {
  flex: 1;

  background: #f0f2f5;

  overflow: auto;

  min-height: 0;
}
```

---

# 八、页面容器规范

所有业务页面：

必须：

```scss
.page-container {
  height: 100%;

  display: flex;
  flex-direction: column;

  min-height: 0;

  padding: 16px;

  box-sizing: border-box;
}
```

---

# 九、后台页面标准结构

推荐：

```txt
page-container
 ├── search-card
 ├── toolbar-card
 └── table-card
```

Dashboard：

```txt
dashboard
 ├── info-card-row
 ├── chart-row
 └── table-card
```

---

# 十、Table 页面布局规范

## 标准结构

```txt
table-container
 ├── table-main
 └── pagination
```

---

## Table 布局

```scss
.table-container {
  flex: 1;

  display: flex;
  flex-direction: column;

  min-height: 0;
}

.table-main {
  flex: 1;

  min-height: 0;

  overflow: hidden;
}
```

---

# 十一、滚动规范（重要）

## 禁止：

整个网页滚动。

---

## 允许：

内部区域滚动：

- table
- list
- content

---

## 滚动原则

滚动条：

应该出现在：

```txt
最内层内容区域
```

而不是：

```txt
整个页面
```

---

# 十二、Flex 规范（重要）

## 纵向布局

如果：

- flex-direction: column
- 存在 flex:1
- 内部内容可能溢出

则：

```scss
min-height: 0;
```

---

## 横向布局

如果：

- flex-direction: row
- 内部内容可能撑宽

则：

```scss
min-width: 0;
```

---

# 十三、Flex 链规则（重要）

如果：

存在：

```txt
flex:1 嵌套链
```

并且：

最内层：

- table
- chart
- list

可能撑爆布局。

则：

整条 flex shrink 链上的：

```txt
flex item
```

通常都需要：

```scss
min-height: 0;
```

否则：

会导致：

- 不出现滚动条
- 页面被撑爆
- 布局失效

---

# 十四、overflow 规范

## overflow:hidden

用于：

- 阻止内容撑爆
- 裁剪超出内容

---

## overflow:auto

用于：

- 内部滚动区域

例如：

- table
- list
- content

---

# 十五、height:100% 使用规范

只有：

```txt
父元素具有确定高度
```

时：

```scss
height: 100%;
```

才有效。

例如：

```txt
height
flex分配后的确定尺寸
100vh
```

---

# 十六、后台布局核心原则

后台布局重点：

- 稳定
- 可伸缩
- 可滚动
- 不撑爆
- 不出现页面级滚动

优先级高于：

- 动画
- 花哨效果
- 复杂视觉
