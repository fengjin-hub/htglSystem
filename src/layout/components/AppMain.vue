<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  background-color: rgb(246, 248, 250);
  overflow: auto;
  min-height: 0;
  padding: 10px;
}
</style>
