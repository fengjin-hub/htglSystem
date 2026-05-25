# ui-spec.md

# 一、项目 UI 总体风格

项目 UI 风格：

```txt
现代简洁型企业后台管理系统
```

当前唯一视觉基准：

```txt
用户管理页面截图：2用户管理.png
```

后续所有页面必须以该截图为视觉标准，保持同一套后台系统观感。

核心特点：

- 深蓝侧边栏 + 白色顶部导航
- 浅灰业务背景
- 白色卡片化内容区
- 蓝色主色调
- 小圆角
- 轻阴影
- 高密度信息布局
- 表格内容清晰、行距稳定
- 强调功能性、可读性、统一性

禁止：

- 花哨渐变
- 大面积高饱和色块
- 毛玻璃拟态
- 过强阴影
- 过度动画
- 卡片间距不统一
- 表格按钮做成重型胶囊按钮
- 每个页面单独设计不同风格

---

# 二、整体 Layout 规范

整体结构：

```txt
layout
 ├── sidebar
 └── main-container
      ├── navbar
      ├── tagsView
      └── appMain
```

布局要求：

- 页面占满浏览器视口
- 禁止整个网页滚动
- 允许 appMain 内部表格区域滚动
- sidebar 固定在左侧
- navbar 固定在顶部
- tagsView 位于 navbar 下方
- appMain 承载业务页面

flex 要求：

```scss
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-container {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
```

---

# 三、页面整体背景

## app-main 背景色

```css
#f5f7fb
```

说明：

- 业务区域使用非常浅的灰蓝背景
- 不使用纯白作为页面底色
- 通过浅灰背景突出白色业务卡片

---

# 四、页面整体间距

## 页面 padding

```css
20px
```

标准：

```scss
.page-container {
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
}
```

## 卡片之间间距

```css
20px
```

用于：

- search 与 table
- infoCard 与 chart
- chart 与 chart
- 上下业务模块

---

# 五、Sidebar 规范

## 宽度

展开状态：

```css
240px
```

折叠状态：

```css
64px
```

## 背景

参考截图采用深蓝后台风格：

```css
background: #071d33;
```

可使用轻微深浅层次，但禁止明显花哨渐变：

```scss
background: linear-gradient(180deg, #071d33 0%, #06172a 100%);
```

## Logo 区域

高度：

```css
80px
```

布局：

- 左侧蓝色盾牌/系统 logo
- 右侧系统名称
- 系统名称文字加粗、白色

Logo 示例：

```scss
.logo {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 26px;
  gap: 12px;
}
```

系统名称：

```css
font-size: 20px;
font-weight: 700;
color: #fff;
```

## 菜单项

菜单项高度：

```css
54px
```

一级菜单左右 padding：

```css
26px
```

二级菜单左侧缩进：

```css
62px
```

默认文字：

```css
color: rgba(255, 255, 255, 0.9);
```

辅助图标：

```css
color: rgba(255, 255, 255, 0.9);
font-size: 20px;
```

菜单 hover：

```css
background: rgba(255, 255, 255, 0.06);
```

当前激活菜单：

```scss
background: linear-gradient(90deg, #1558c8 0%, #1f75ff 100%);
color: #fff;
```

激活规则：

- 当前业务页面对应左侧菜单必须高亮
- 高亮区域铺满 sidebar 宽度
- 二级菜单高亮时保持文字左缩进

---

# 六、Navbar 规范

## 高度

```css
78px
```

## 样式

```scss
background: #fff;
border-bottom: 1px solid #edf0f5;
box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
```

## 左侧内容

从左到右：

- collapse 按钮
- breadcrumb 面包屑

collapse 图标：

```css
font-size: 22px;
color: #111827;
```

breadcrumb：

```css
font-size: 16px;
color: #1f2937;
```

分隔符：

```css
color: #98a2b3;
```

当前项：

```css
color: #111827;
font-weight: 500;
```

## 右侧内容

从左到右：

- search 图标
- fullscreen 图标
- notification 图标
- avatar
- 用户名
- 下拉箭头

通知角标：

```scss
background: #ff4d4f;
color: #fff;
border-radius: 999px;
font-size: 12px;
```

头像：

```css
width: 40px;
height: 40px;
border-radius: 50%;
```

用户名：

```css
font-size: 16px;
font-weight: 500;
color: #111827;
```

---

# 七、TagsView 规范

## 高度

```css
58px
```

## 样式

```scss
background: #fff;
border-bottom: 1px solid #edf0f5;
padding: 0 20px;
display: flex;
align-items: center;
gap: 12px;
```

## 普通 tag

```scss
height: 34px;
padding: 0 26px;
border: 1px solid #e4e7ed;
border-radius: 5px;
background: #fff;
color: #1f2937;
font-size: 14px;
```

## 激活 tag

```scss
background: #1f75ff;
border-color: #1f75ff;
color: #fff;
box-shadow: 0 4px 10px rgba(31, 117, 255, 0.22);
```

## 关闭图标

- 普通 tag 使用浅灰色关闭图标
- 激活 tag 使用白色关闭图标
- 首页 tag 可不展示关闭图标

---

# 八、业务卡片规范

所有业务区域统一白色卡片，包括：

- search 区域
- table 区域
- chart 区域
- dashboard 模块
- dialog 内部区域

卡片标准样式：

```scss
background: #fff;
border-radius: 6px;
box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
```

卡片 padding：

```css
22px
```

卡片要求：

- 不使用粗边框
- 不使用重阴影
- 不使用大圆角
- 卡片内部元素对齐清晰

---

# 九、Search 区域规范

Search 区域必须参照用户管理页面。

## 结构

采用两行结构：

第一行：

- 表单筛选项
- input
- select
- datePicker/dateRangePicker

第二行：

- 左侧操作按钮：新增、修改、删除、导出
- 右侧查询按钮：查询、重置

## 高度

```css
160px
```

## 样式

```scss
.search-card {
  background: #fff;
  border-radius: 6px;
  padding: 24px 22px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
}
```

## 表单 label

```css
font-size: 15px;
font-weight: 500;
color: #1f2937;
```

label 与控件间距：

```css
12px
```

筛选项之间间距：

```css
34px
```

## 输入框 / 选择器

```scss
height: 38px;
border-radius: 5px;
border: 1px solid #d9e1ec;
background: #fff;
font-size: 14px;
```

常规宽度：

```css
200px
```

日期范围宽度：

```css
280px
```

placeholder：

```css
color: #a8b3c4;
```

---

# 十、按钮规范

按钮高度：

```css
36px
```

按钮圆角：

```css
4px
```

按钮字体：

```css
font-size: 14px;
font-weight: 500;
```

按钮内部：

- 左侧可带图标
- 图标与文字间距 6px
- 不使用大圆角胶囊

## 主按钮

用于：

- 新增
- 查询
- 确认

```scss
background: #1f75ff;
border-color: #1f75ff;
color: #fff;
```

## 成功按钮 / 修改按钮

用于：

- 修改
- 启用
- 保存

```scss
background: #f0f9f4;
border-color: #a8e6c1;
color: #22a565;
```

## 危险按钮

用于：

- 删除
- 禁用

```scss
background: #fff2f0;
border-color: #ffb4ad;
color: #ff4d4f;
```

## 默认按钮

用于：

- 导出
- 重置
- 次要操作

```scss
background: #fff;
border-color: #d9e1ec;
color: #475569;
```

---

# 十一、Table 页面规范（核心）

所有 CRUD 页面统一采用：

```txt
Search + Table + Pagination
```

典型页面顺序：

1. navbar
2. tagsView
3. appMain 背景
4. search-card
5. table-card
6. pagination

---

# 十二、Table 卡片规范

```scss
.table-card {
  flex: 1;
  min-height: 0;
  background: #fff;
  border-radius: 6px;
  padding: 22px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
```

表格区域内部允许滚动：

```scss
.table-wrapper {
  flex: 1;
  min-height: 0;
  overflow: auto;
}
```

---

# 十三、Table 风格规范

## 表头

```scss
height: 54px;
background: #fff;
color: #111827;
font-weight: 600;
font-size: 15px;
border-bottom: 1px solid #e8edf3;
```

说明：

- 表头不使用明显灰底
- 与截图一致，保持白底 + 下边框

## 表格行

```scss
height: 64px;
border-bottom: 1px solid #e8edf3;
font-size: 15px;
color: #24324a;
```

## 行 hover

```css
#f8fafc
```

## 复选框列

- 位于第一列
- 宽度约 46px
- 使用 Element Plus 默认 checkbox 风格

## 头像列

头像尺寸：

```css
40px
```

样式：

```css
border-radius: 50%;
```

## 状态列

启用状态：

```scss
.dot {
  background: #2dbf73;
}
.text {
  color: #22a565;
}
```

禁用状态：

```scss
.dot {
  background: #ff4d4f;
}
.text {
  color: #ff4d4f;
}
```

状态样式要求：

- 使用圆点 + 文字
- 不使用开关作为列表状态展示
- 不使用大面积 tag

## 操作列

统一使用 text button：

- 编辑：蓝色
- 删除：红色
- 更多：蓝色 + 下拉箭头

```scss
.edit {
  color: #1f75ff;
}

.delete {
  color: #ff4d4f;
}

.more {
  color: #1f75ff;
}
```

禁止：

- 操作列使用实心按钮
- 操作列使用彩色胶囊
- 操作列按钮高度撑大表格行

---

# 十四、Pagination 规范

位置：

```txt
底部居中偏左到中间区域，与截图一致，不强制右对齐
```

高度：

```css
70px
```

布局内容：

- 总条数
- 每页条数选择器
- 上一页
- 页码
- 省略号
- 下一页
- 前往页码输入

页码按钮：

```scss
min-width: 32px;
height: 32px;
border-radius: 4px;
border: 1px solid #d9e1ec;
background: #fff;
color: #1f2937;
```

当前页：

```scss
background: #1f75ff;
border-color: #1f75ff;
color: #fff;
```

---

# 十五、字体规范

全局字体：

```css
font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
```

页面正文：

```css
font-size: 14px;
color: #1f2937;
```

Navbar / 面包屑：

```css
font-size: 16px;
```

表单 label：

```css
font-size: 15px;
font-weight: 500;
```

表头：

```css
font-size: 15px;
font-weight: 600;
```

表格正文：

```css
font-size: 15px;
```

辅助文字：

```css
font-size: 13px;
color: #8a97aa;
```

---

# 十六、表单规范

label 宽度：

```css
auto
```

说明：

- 按截图，筛选区 label 不强制 100px 固定宽度
- label 与控件水平排列

input 高度：

```css
38px
```

form item 间距：

```css
34px
```

Dialog 表单可以使用固定 label：

```css
label-width: 100px;
```

---

# 十七、Dialog 规范

Dialog 风格保持 Element Plus 默认风格，并贴合当前后台视觉。

圆角：

```css
8px
```

Header：

```css
font-size: 16px;
font-weight: 600;
color: #111827;
```

Footer：

- 按钮右对齐
- 取消按钮在左
- 确认按钮在右

禁止：

- 深色 dialog
- 毛玻璃 dialog
- 自定义复杂弹窗特效
- 大圆角弹窗

---

# 十八、Dashboard 规范

Dashboard 必须与用户管理页面保持同一视觉系统。

要求：

- 使用浅灰业务背景
- 使用白色卡片
- 使用轻阴影
- 使用 6px 圆角
- 图表使用 ECharts，但外层卡片风格统一

不是：

```txt
数据大屏风格
```

图表卡片高度建议：

```css
350px
```

---

# 十九、InfoCard 规范

高度：

```css
120px
```

样式：

```scss
background: #fff;
border-radius: 6px;
box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
```

布局：

- 左侧：title、value、trend
- 右侧：纯色圆形 icon

icon 要求：

- 可以使用主色或功能色
- 禁止 3D
- 禁止发光
- 禁止复杂渐变

---

# 二十、颜色规范

主色：

```css
#1f75ff
```

主色 hover：

```css
#3b82ff
```

危险色：

```css
#ff4d4f
```

成功色：

```css
#22a565
```

页面背景：

```css
#f5f7fb
```

卡片背景：

```css
#ffffff
```

Sidebar 背景：

```css
#071d33
```

正文文字：

```css
#1f2937
```

表格文字：

```css
#24324a
```

辅助文字：

```css
#8a97aa
```

边框色：

```css
#e8edf3
```

输入框边框：

```css
#d9e1ec
```

---

# 二十一、滚动规范（重要）

禁止：

```txt
整个网页滚动
```

允许：

```txt
table/list/content 内部滚动
```

所有纵向 flex:1 链必须设置：

```scss
min-height: 0;
```

所有横向 flex:1 链必须设置：

```scss
min-width: 0;
```

---

# 二十二、当前项目 UI 核心原则

当前项目核心不是：

- 炫酷视觉
- 动画
- 复杂特效
- 大屏效果

当前项目核心是：

```txt
稳定、统一、标准、现代企业后台
```

优先级：

```txt
统一性 > 炫技
稳定性 > 花哨
工程化 > 个性化
与用户管理截图一致 > 自由发挥
```
