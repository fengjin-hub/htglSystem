<template>
  <el-dialog v-model="dialogFormVisible" :title="title" :width="width">
    <el-form
      ref="rulesFormRef"
      :model="form"
      :rules="rules"
      :inline="true"
      :label-width="labelWidth"
    >
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
        :required="field.required"
      >
        <el-input
          v-if="field.type === 'input' || !field.type"
          v-model="form[field.prop]"
          :style="getFieldStyle(field)"
          :placeholder="field.placeholder || `请输入${field.label}`"
        />
        <el-input
          v-else-if="field.type === 'textarea'"
          v-model="form[field.prop]"
          type="textarea"
          :style="getFieldStyle(field)"
          :placeholder="field.placeholder || `请输入${field.label}`"
        />
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model="form[field.prop]"
          :min="1"
          :style="getFieldStyle(field)"
        />
        <el-select
          v-else-if="field.type === 'select'"
          v-model="form[field.prop]"
          :style="getFieldStyle(field)"
          :placeholder="field.placeholder || `请选择${field.label}`"
        >
          <el-option
            v-for="option in field.options || []"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-tree-select
          v-else-if="field.type === 'tree-select'"
          v-model="form[field.prop]"
          :data="field.options || []"
          :placeholder="field.placeholder || `请选择${field.label}`"
          check-strictly
          clearable
          style="width: 250px"
        />
        <el-radio-group v-else-if="field.type === 'radio'" v-model="form[field.prop]">
          <el-radio v-for="option in field.options || []" :key="option.value" :value="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>

        <el-switch
          v-else-if="field.type === 'switch'"
          v-model="form[field.prop]"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          :active-text="field.options[0].label"
          :active-value="field.options[0].value"
          :inactive-text="field.options[1].label"
          :inactive-value="field.options[1].value"
        />

        <el-date-picker
          v-else-if="field.type === 'date' || field.type === 'datetime'"
          v-model="form[field.prop]"
          :type="field.type"
          :value-format="field.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
          :style="`width: ${field.width || 240}px`"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const dialogFormVisible = defineModel('visible')
const props = defineProps({
  mode: {
    type: String,
    default: 'add',
  },
  data: {
    type: Object,
    default: null,
  },
  fields: {
    type: Array,
    default: () => [],
  },
  defaultValue: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  addApi: {
    type: Function,
    default: null,
  },
  editApi: {
    type: Function,
    default: null,
  },
  titleMap: {
    type: Object,
    default: () => ({ add: '新增', edit: '编辑' }),
  },
  width: {
    type: [String, Number],
    default: 800,
  },
  labelWidth: {
    type: [String, Number],
    default: 100,
  },
})
const emit = defineEmits(['success'])

const rulesFormRef = ref(null)
const form = ref({})

const title = computed(() => props.titleMap[props.mode] || props.titleMap.add)

const getFieldStyle = (field) => {
  const width = field.width ?? 250
  return { width: typeof width === 'number' ? `${width}px` : width }
}

const initForm = () => {
  const baseForm = props.mode === 'add' ? {} : props.data
  form.value = Object.assign({}, props.defaultValue, baseForm)
}

const submitForm = async () => {
  if (!rulesFormRef.value) return

  await rulesFormRef.value.validate(async (valid, fields) => {
    if (!valid) {
      console.log('提交失败', fields)
      return
    }

    const api = props.mode === 'add' ? props.addApi : props.editApi
    if (api) {
      await api(form.value)
    }

    ElMessage.success(props.mode === 'add' ? '新增成功' : '编辑成功')
    dialogFormVisible.value = false
    rulesFormRef.value.resetFields()
    emit('success')
  })
}

const resetForm = () => {
  rulesFormRef.value?.resetFields()
  dialogFormVisible.value = false
}

watch(
  () => [props.data, props.mode, dialogFormVisible.value],
  () => {
    if (dialogFormVisible.value) {
      rulesFormRef.value?.resetFields()
      initForm()
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader) {
  .avatar {
    width: 140px;
    height: 140px;
    display: block;
    object-fit: cover;
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    border-radius: 50%;
  }
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  text-align: center;
}
</style>
