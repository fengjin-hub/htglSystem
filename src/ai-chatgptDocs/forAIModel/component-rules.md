# component-rules.md

## 一、组件设计原则

组件开发遵循：

- 高内聚
- 单一职责
- 可复用
- 易维护

禁止：

- 巨型组件
- 一个组件负责多个业务
- 页面逻辑全部塞进一个文件

---

# 二、组件分类规范

## 1. 页面组件

位置：

```txt
views/
```

职责：

- 页面布局
- 页面组合
- 页面级逻辑
- 页面数据管理

特点：

- 不做复杂UI复用
- 负责组合业务组件

示例：

```txt
HomeView.vue
UserView.vue
RoleView.vue
```

---

## 2. 页面业务组件

位置：

```txt
views/**/components/
```

职责：

- 当前页面专属功能
- 不跨页面复用

示例：

```txt
SearchView.vue
TableView.vue
DialogView.vue
ChartCard.vue
```

---

## 3. 全局公共组件

位置：

```txt
components/
```

职责：

- 全局复用
- 与具体业务无关

示例：

```txt
Pagination
SvgIcon
Upload
Empty
PageContainer
```

---

# 三、组件拆分规范

## 一个组件只负责一个区域

例如：

用户管理页面：

```txt
UserView
 ├── SearchView
 ├── TableView
 └── DialogView
```

首页：

```txt
HomeView
 ├── InfoCard
 ├── EchartLine
 ├── EchartPie
 └── OrderTable
```

---

# 四、父子组件职责规范

## 父组件负责：

- 页面布局
- flex结构
- 宽高控制
- 数据管理
- 接口调用
- 状态管理

## 子组件负责：

- UI展示
- 局部交互
- 内容渲染

---

# 五、宽高规范（重要）

## 父组件控制布局

例如：

```scss
.parent {
  display: flex;
  flex-direction: column;
}
```

## 子组件只负责填充

例如：

```scss
.child {
  width: 100%;
  height: 100%;
}
```

禁止：

- 子组件反向决定父组件布局
- 子组件随意写死页面高度

---

# 六、Flex 布局规范（重要）

如果：

- 使用 flex:1
- 纵向布局
- 内部有 table/list/chart

则：

```scss
min-height: 0;
```

横向布局：

```scss
min-width: 0;
```

必要时：

```scss
overflow: hidden;
overflow: auto;
```

---

# 七、Table 组件规范

## Table 与 Pagination

推荐：

```txt
Table + Pagination
放同一个组件
```

原因：

- 数据强关联
- 分页逻辑集中
- easier state management

---

## Table 标准结构

```txt
table-container
 ├── table-main
 └── pagination
```

---

## Table 布局规范

```scss
.table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.table-main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
```

---

# 八、Dialog 组件规范

## 新增与修改

统一使用：

```txt
一个 Dialog
```

通过：

```js
mode = 'add'
mode = 'edit'
```

区分。

禁止：

```txt
AddDialog.vue
EditDialog.vue
```

重复开发。

---

## Dialog 数据回填

编辑：

```js
form.value = { ...row }
```

新增：

```js
resetForm()
```

---

# 九、表单组件规范

## 搜索区域

使用：

```vue
<el-form>
```

但：

不强制：

```vue
:inline="true"
```

复杂布局：

推荐：

- flex
- el-row
- el-col

---

## Form label 宽度统一

```scss
100px
```

---

# 十、Props 规范

## 子组件：

通过 props 接收数据。

例如：

```vue
<InfoCard :data="topInfo" />
```

禁止：

- 子组件直接修改 props
- props 与内部状态混乱

---

# 十一、事件规范

子组件：

通过：

```txt
emit
```

通知父组件。

例如：

```js
emit('update')
emit('delete')
emit('submit')
```

禁止：

- 子组件直接操作父组件状态

---

# 十二、数据规范

## 所有列表数据必须带 id

例如：

```js
{
  id: 1,
  name: 'Tom'
}
```

禁止：

- 使用 index 操作数据
- 使用 index 作为 key

---

# 十三、Mock 阶段规范

当前阶段：

- 不接真实接口
- 使用本地数组模拟

例如：

```js
tableData.value.push()
```

后续：

替换为：

```js
await api.xxx()
```

---

# 十四、命名规范

## 页面组件

```txt
UserView.vue
RoleView.vue
```

## 页面业务组件

```txt
SearchView.vue
TableView.vue
DialogView.vue
```

## 通用组件

```txt
BaseTable.vue
BasePagination.vue
BaseDialog.vue
```

---

# 十五、样式规范

默认：

```scss
<style scoped lang="scss">
```

以下情况取消 scoped：

- reset.scss
- 全局变量
- element-plus覆盖
- layout全局样式

---

# 十六、组件开发顺序

推荐顺序：

1. 静态UI
2. 布局
3. 数据渲染
4. 交互
5. mock逻辑
6. 接口预留

---

# 十七、组件通信规范

## 父传子

```txt
props
```

## 子传父

```txt
emit
```

## 跨页面状态

```txt
Pinia
```

禁止：

- 多层 props 地狱
- event bus 滥用

---

# 十八、当前项目推荐目录结构

```txt
views/
 ├── home/
 │    ├── IndexView.vue
 │    └── components/
 │
 ├── user/
 │    ├── IndexView.vue
 │    └── components/
 │
 ├── role/
 │    ├── IndexView.vue
 │    └── components/
```

---

# 十九、后台项目核心原则

后台开发重点：

- 布局稳定
- 滚动稳定
- 组件拆分合理
- 数据流清晰
- 状态管理统一

优先级高于：

- 炫技动画
- 花哨效果

```

```
