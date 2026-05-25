# page-list.md

## 一、当前项目页面规划

项目当前属于：

```txt
企业后台管理系统
```

页面结构采用：

```txt
layout + router-view
```

模式。

---

# 二、基础页面

## 1. 登录页

路径：

```txt
/login
```

文件：

```txt
views/login/IndexView.vue
```

功能：

- 账号登录
- 密码登录
- 记住我
- 忘记密码
- 登录跳转

当前状态：

```txt
已完成静态开发
```

---

# 三、Layout 页面

路径：

```txt
/
```

文件：

```txt
layout/IndexView.vue
```

功能：

- sidebar
- navbar
- tagsView
- appMain

作为：

```txt
后台整体框架容器
```

---

# 四、Dashboard 首页

路径：

```txt
/home
```

文件：

```txt
views/home/IndexView.vue
```

功能：

- 数据概览
- info card
- 销售趋势图
- 访问来源图
- 近期订单表格

页面结构：

```txt
home
 ├── top-info
 ├── content-chart
 └── order-table
```

当前状态：

```txt
已完成
```

---

# 五、用户管理

路径：

```txt
/system/user
```

文件：

```txt
views/user/IndexView.vue
```

功能：

- 用户搜索
- 用户分页
- 新增用户
- 修改用户
- 删除用户
- 批量删除
- 状态切换

页面结构：

```txt
user
 ├── SearchView
 ├── TableView
 └── DialogView
```

当前状态：

```txt
已完成静态开发
```

---

# 六、角色管理

路径：

```txt
/system/role
```

文件：

```txt
views/role/IndexView.vue
```

功能：

- 角色搜索
- 角色分页
- 新增角色
- 修改角色
- 删除角色
- 权限分配

页面结构：

```txt
role
 ├── SearchView
 ├── TableView
 └── DialogView
```

当前状态：

```txt
待开发
```

---

# 七、菜单管理

路径：

```txt
/system/menu
```

文件：

```txt
views/menu/IndexView.vue
```

功能：

- 菜单树结构
- 菜单新增
- 菜单修改
- 菜单删除
- icon选择
- 路由配置

页面结构：

```txt
menu
 ├── TreeView
 ├── TableView
 └── DialogView
```

特点：

```txt
树形后台页面
```

---

# 八、部门管理

路径：

```txt
/system/department
```

文件：

```txt
views/department/IndexView.vue
```

功能：

- 部门树结构
- 部门新增
- 部门修改
- 部门删除

页面结构：

```txt
department
 ├── TreeView
 ├── TableView
 └── DialogView
```

---

# 九、日志管理

路径：

```txt
/system/log
```

文件：

```txt
views/log/IndexView.vue
```

功能：

- 登录日志
- 操作日志
- 搜索过滤
- 时间筛选
- 日志详情

页面结构：

```txt
log
 ├── SearchView
 └── TableView
```

---

# 十、个人中心

路径：

```txt
/profile
```

文件：

```txt
views/profile/IndexView.vue
```

功能：

- 用户信息
- 修改头像
- 修改密码
- 修改个人资料

---

# 十一、404 页面

路径：

```txt
/:pathMatch(.*)*
```

文件：

```txt
views/error/404.vue
```

功能：

- 页面不存在提示
- 返回首页

---

# 十二、页面开发优先级

当前推荐开发顺序：

```txt
1. Login
2. Layout
3. Home
4. User
5. Role
6. Menu
7. Department
8. Log
9. Profile
10. Permission
```

---

# 十三、页面统一布局规范

所有页面：

必须：

```txt
page-container
```

作为根容器。

标准：

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

# 十四、Table 页面统一结构

推荐：

```txt
page-container
 ├── search-card
 └── table-card
```

其中：

```txt
table-card
 ├── toolbar
 ├── table
 └── pagination
```

---

# 十五、Dashboard 页面统一结构

```txt
dashboard
 ├── info-card-row
 ├── chart-row
 └── table-row
```

---

# 十六、后续扩展页面（可选）

后续可扩展：

- 数据大屏
- 工作台
- 消息中心
- 文件管理
- Excel导入导出
- 富文本编辑器
- 权限控制页面
- 多级菜单页面
- 国际化页面
- 暗黑模式页面

---

# 十七、当前阶段开发原则

当前阶段：

```txt
优先完成：
UI + Layout + Mock交互
```

暂不重点处理：

- 真实接口
- token
- 权限
- 动态路由
- 微服务

---

# 十八、当前项目最终目标

最终形成：

```txt
完整 Vue3 企业后台管理系统 Demo
```

具备：

- 标准后台布局
- 标准后台页面
- 标准 CRUD
- 标准组件拆分
- 标准 flex 布局
- 标准滚动体系
