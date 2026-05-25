<template>
  <el-dialog v-model="dialogFormVisible" :title="title" :width="width">
    <el-form ref="rulesFormRef" :model="form" :rules="rules" :label-width="labelWidth">
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
          :style="`width: ${field.width || 140}px`"
          :placeholder="field.placeholder || `请输入${field.label}`"
          v-bind="field.componentProps"
        />

        <el-select
          v-else-if="field.type === 'select'"
          v-model="form[field.prop]"
          :style="`width: ${field.width || 140}px`"
          :placeholder="field.placeholder || `请选择${field.label}`"
          v-bind="field.componentProps"
        >
          <el-option
            v-for="option in field.options || []"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <el-radio-group v-else-if="field.type === 'radio'" v-model="form[field.prop]">
          <el-radio v-for="option in field.options || []" :key="option.value" :value="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>

        <el-switch
          v-else-if="field.type === 'switch'"
          v-model="form[field.prop]"
          v-bind="field.componentProps"
        />

        <el-date-picker
          v-else-if="field.type === 'date' || field.type === 'datetime'"
          v-model="form[field.prop]"
          :type="field.type"
          :value-format="field.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
          :style="`width: ${field.width || 240}px`"
          v-bind="field.componentProps"
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
    default: 500,
  },
  labelWidth: {
    type: [String, Number],
    default: 80,
  },
})
const emit = defineEmits(['success'])

const rulesFormRef = ref(null)
const form = ref({})

const title = computed(() => props.titleMap[props.mode] || props.titleMap.add)

const initForm = () => {
  const baseForm = props.mode === 'add' ? {} : props.data
  form.value = Object.assign({}, baseForm)
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
