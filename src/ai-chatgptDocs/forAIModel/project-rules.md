# project-rules.md

## 一、项目定位

项目类型：

```txt
企业级后台管理系统
```

目标：

- 展示 Vue3 后台开发能力
- 展示后台布局能力
- 展示组件拆分能力
- 展示数据管理能力
- 展示业务逻辑能力
- 后续支持真实接口联调

项目风格：

```txt
现代后台管理系统风格
```

强调：

- 稳定布局
- 清晰结构
- 可维护性
- 工程化开发

---

# 二、技术栈规范

## 核心框架

- Vue3(vue3.5)
- JavaScript
- Vue Router
- Pinia
- Element Plus
- SCSS
- ECharts

## 开发语言

- JavaScript

当前阶段：

- 不使用 TypeScript

---

## 路由

```txt
Vue Router
```

---

## 状态管理

```txt
Pinia
```

---

## UI组件库

```txt
Element Plus
```

---

## CSS预处理器

```txt
SCSS
```

---

## 图表

```txt
ECharts
```

---

# 三、项目目录结构规范

```txt
src/
├── api/
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── components/
├── layout/
├── router/
├── stores/
├── utils/
├── views/
└── docs/
```

---

# 四、目录职责规范

## api/

负责：

- 接口统一管理
- axios封装
- 请求模块拆分

---

## assets/

负责：

- 图片
- icon
- 全局scss
- 字体资源

---

## components/

负责：

- 全局公共组件

例如：

```txt
BaseTable
BasePagination
SvgIcon
```

---

## layout/

负责：

- sidebar
- navbar
- tagsView
- appMain

---

## router/

负责：

- 动态路由
- 静态路由
- 权限路由

---

## stores/

负责：

- 用户状态
- tagsView状态
- sidebar状态
- 权限状态

---

## utils/

负责：

- 工具函数
- 格式化函数
- token处理

---

## views/

负责：

- 页面业务

---

## docs/

负责：

- 项目规范文档
- UI规范
- Layout规范
- 组件规范

---

# 五、开发阶段规范

## 当前阶段

属于：

```txt
静态后台开发阶段
```

特点：

- 不接真实接口
- 使用 mock 数据
- 本地模拟 CRUD
- 优先完成 UI 与交互

---

## 后续阶段

逐步增加：

- axios
- api模块
- token
- 权限控制
- 动态路由
- 后端联调

---

# 六、页面开发流程规范

推荐顺序：

1. 页面结构
2. 页面布局
3. 静态UI
4. 数据渲染
5. 交互逻辑
6. mock逻辑
7. 状态管理
8. 接口预留

禁止：

- 一开始直接写复杂业务
- UI未完成先写接口

---

# 七、数据规范

## 所有列表数据必须带 id

例如：

```js
{
  id: 1,
  name: 'Tom'
}
```

禁止：

- 使用 index 更新数据
- 使用 index 作为 key

---

## 当前 mock 数据规范

统一：

```js
const tableData = ref([])
```

模拟：

- 新增
- 修改
- 删除
- 搜索
- 分页

后续：

替换为：

```js
await api.xxx()
```

---

# 八、UI开发规范

项目整体采用：

```txt
现代企业后台风格
```

特点：

- 浅灰背景
- 白色卡片
- 蓝色主色调
- 圆角
- 阴影
- 卡片化布局

---

## 主色

```css
#409EFF
```

---

## 页面背景

```css
#f0f2f5
```

---

## 卡片规范

```css
background: #fff;
border-radius: 8px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

---

# 九、Layout规范

整体结构：

```txt
layout
 ├── sidebar
 └── main-container
      ├── navbar
      ├── tagsView
      └── appMain
```

---

# 十、滚动规范（重要）

## 禁止：

整个网页滚动。

---

## 允许：

内部区域滚动：

- table
- list
- content

---

## 所有纵向 flex 链：

```scss
min-height: 0;
```

---

## 横向 flex 链：

```scss
min-width: 0;
```

---

# 十一、Flex布局规范（重要）

后台项目：

优先使用：

```txt
flex
flex:1
overflow
min-height:0
```

而不是：

```txt
大量 height:100%
```

---

# 十二、组件开发规范

组件遵循：

- 单一职责
- 高内聚
- 可复用
- 易维护

禁止：

- 超大组件
- 一个组件处理多个业务

---

# 十三、样式规范

默认：

```scss
<style scoped lang="scss">
```

以下情况允许取消 scoped：

- reset.scss
- element-plus覆盖
- layout全局样式
- 全局变量

---

# 十四、命名规范

## 页面组件

```txt
UserView.vue
RoleView.vue
```

---

## 页面业务组件

```txt
SearchView.vue
TableView.vue
DialogView.vue
```

---

## 通用组件

```txt
BaseTable.vue
BaseDialog.vue
BasePagination.vue
```

---

# 十五、后台核心开发原则

后台开发核心：

- 布局稳定
- 滚动稳定
- 数据流清晰
- 状态统一
- 组件拆分合理

优先级高于：

- 动画
- 炫技
- 花哨视觉

---

# 十六、长期开发规范

## 主长期对话：

只讨论：

- 架构
- 页面
- UI规范
- Layout
- 组件设计
- 项目主线

---

## 临时对话：

处理：

- bug
- warning
- css问题
- 某个报错

避免长期上下文污染。

---

# 十七、当前项目目标

当前目标：

完成：

```txt
完整企业后台管理系统 Demo
```

至少包含：

- 登录页
- Dashboard
- 用户管理
- 角色管理
- 菜单管理
- 部门管理
- 日志管理

后续：

可扩展：

- 权限系统
- 动态路由
- 国际化
- 暗黑模式
- 文件上传
- Excel导入导出
