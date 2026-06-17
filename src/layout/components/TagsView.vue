<template>
  <div class="tags-view-container">
    <div
      class="tag-item"
      v-for="tag in tagsStore.tags"
      :key="tag.path"
      @click="chooseTagView(tag)"
      :class="{ active: tag.path === route.path }"
    >
      {{ tag.title }}
      <el-icon
        v-if="tag.title != '首页'"
        :size="12"
        style="margin-left: 10px"
        @click.stop="removeTag(tag)"
      >
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { useTagsStore } from '@/stores/modules/tags'
import { useRouter, useRoute } from 'vue-router'
import { Close } from '@element-plus/icons-vue'

const tagsStore = useTagsStore()
const router = useRouter()
const route = useRoute()

const chooseTagView = (tag) => {
  router.push({
    path: tag.path,
  })
}

const removeTag = (tag) => {
  tagsStore.removeTags(tag)

  if (route.path === tag.path) {
    router.push({
      path: tagsStore.tags[tagsStore.tags.length - 1].path,
    })
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  align-items: center;
  height: 35px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  padding: 5px 8px;
  .tag-item {
    display: flex;
    align-items: center;
    margin-right: 5px;
    font-size: 12px;
    padding: 5px 8px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
      background-color: rgb(31, 111, 254);

      color: white;
    }
    :deep(.el-icon) {
      border-radius: 50%;
      &:hover {
        background-color: white;
        color: red;
      }
    }
  }
  .active {
    background-color: rgb(31, 111, 254);

    color: white;
  }
}
</style>
