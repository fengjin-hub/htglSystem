<template>
  <div class="layout-container">
    <div class="layout-sidebar">
      <SidebarView />
    </div>
    <div class="layout-main">
      <NavbarView />
      <TagsView />
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import AppMain from '@/layout/components/AppMain.vue'
import SidebarView from './components/SidebarView.vue'
import NavbarView from './components/NavbarView.vue'
import TagsView from './components/TagsView.vue'
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: 100%;
  .layout-sidebar {
    width: 240px;
    overflow: auto; //待修改
  }
  .layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
}
</style>
