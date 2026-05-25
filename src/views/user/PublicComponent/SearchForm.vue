<template>
  <div class="search-contain">
    <el-form
      :model="searchForm"
      inline
      label-position="left"
      :label-width="labelWidth"
      class="search-form"
    >
      <el-form-item v-for="field in fields" :key="field.prop" :label="field.label">
        <el-input
          v-if="field.type === 'input' || !field.type"
          v-model="searchForm[field.prop]"
          clearable
          :placeholder="`请输入${field.label}`"
          v-bind="field.componentProps"
        />

        <el-select
          v-else-if="field.type === 'select'"
          v-model="searchForm[field.prop]"
          clearable
          :placeholder="`请选择${field.label}`"
          :style="`width:${field.width || 140}px`"
          v-bind="field.componentProps"
        >
          <el-option
            v-for="option in field.options || []"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <el-date-picker
          v-else-if="field.type === 'datetimerange' || field.type === 'daterange'"
          v-model="searchForm[field.prop]"
          :type="field.type"
          :value-format="'YYYY-MM-DD HH:mm:ss'"
          :range-separator="field.rangeSeparator || '至'"
          :start-placeholder="field.startPlaceholder || '开始日期'"
          :end-placeholder="field.endPlaceholder || '结束日期'"
          popper-class="my-date-popper"
          :teleported="true"
          v-bind="field.componentProps"
        />
      </el-form-item>
    </el-form>

    <div class="form-btns">
      <div class="tool-btns">
        <el-button v-if="showAdd" type="primary" plain :icon="Plus" @click="handleAdd">
          新增
        </el-button>
        <el-button v-if="showDelete" type="danger" plain :icon="Delete" @click="handleDelete">
          删除
        </el-button>
        <el-button v-if="showExport" type="info" plain :icon="Download"> 导出 </el-button>
      </div>
      <div class="search-btns">
        <el-button type="primary" :icon="Search" @click="handleSearch"> 查询 </el-button>
        <el-button :icon="Refresh" @click="handleReset"> 重置 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Plus, Search, Delete, Download, Refresh } from '@element-plus/icons-vue'

const props = defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  labelWidth: {
    type: String,
    default: '70px',
  },
  showAdd: {
    type: Boolean,
    default: true,
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
  showExport: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['add', 'deleteMultiple', 'search', 'reset'])

const searchForm = reactive({})

const cleanObject = (obj) => {
  const newObj = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    if (value !== '' && value !== null && value !== undefined) {
      newObj[key] = value
    }
  })

  return newObj
}

const initSearchForm = () => {
  props.fields.forEach((field) => {
    searchForm[field.prop] = field.type === 'datetimerange' || field.type === 'daterange' ? [] : ''
  })
}

const buildSearchParams = () => {
  const params = {}

  props.fields.forEach((field) => {
    const value = searchForm[field.prop]

    if ((field.type === 'datetimerange' || field.type === 'daterange') && Array.isArray(value)) {
      const [startValue, endValue] = value
      params['start_time'] = startValue
      params['end_time'] = endValue
      return
    }

    params[field.prop] = value
  })

  return cleanObject(params)
}

const handleAdd = () => {
  emit('add', { mode: 'add', data: null })
}

const handleDelete = () => {
  emit('deleteMultiple')
}

const handleSearch = () => {
  emit('search', buildSearchParams())
}

const handleReset = () => {
  initSearchForm()
  emit('reset')
}
</script>

<style lang="scss" scoped>
.search-contain {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .search-form {
    display: flex;
    justify-content: space-between;
  }
  .form-btns {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>

<style lang="scss">
.el-time-panel {
  margin-left: -40px !important;
}
</style>
