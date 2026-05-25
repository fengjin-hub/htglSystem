<template>
  <div class="app-main">
    <router-view />
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
