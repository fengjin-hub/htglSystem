<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="800">
    <el-form ref="rulesFormRef" :model="form" :rules="rules" :inline="true" label-width="100">
      <el-form-item :prop="form.menu_type" label="菜单类型">
        <el-radio-group v-model="form.menu_type" style="width: 400px">
          <el-radio v-for="option in menuTypeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :prop="form.parent_menu" label="上级菜单">
        <el-select v-model="form.parent_menu" placeholder="请选择上级菜单" style="width: 250px">
          <el-option
            v-for="option in parentMenuOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :prop="form.menu_name"
        :label="`${getOptionsLabel(menuTypeOptions, form.menu_type)}名称`"
      >
        <el-input
          v-model="form.menu_name"
          :placeholder="`请输入${getOptionsLabel(menuTypeOptions, form.menu_type)}名称`"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item :label="`${getOptionsLabel(menuTypeOptions, form.menu_type)}图标`">
        <el-select
          :disabled="form.menu_type === 3"
          :prop="form.icon"
          v-model="form.icon"
          :placeholder="`请选择${getOptionsLabel(menuTypeOptions, form.menu_type)}图标`"
          style="width: 250px"
        >
          <el-option
            v-for="option in menuIconOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
            <component :is="option.icon" class="menu_icons" />
          </el-option>
          <template #label="{ value }">
            <component
              :is="menuIconOptions.find((opt) => opt.value === value)?.icon"
              class="menu_icons"
            />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item :prop="form.sort" label="显示排序">
        <el-input-number
          v-model="form.sort"
          :min="1"
          placeholder="请输入显示排序"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item :prop="form.path" label="路由地址">
        <el-input
          :disabled="form.menu_type === 3"
          v-model="form.path"
          placeholder="请输入路由地址"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item :prop="form.component" label="组件路径">
        <el-input
          :disabled="form.menu_type !== 2"
          :prop="form.icon"
          v-model="form.component"
          placeholder="请输入组件路径"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item :prop="form.permission" label="权限标识">
        <el-input
          :disabled="form.menu_type === 1"
          v-model="form.permission"
          placeholder="请输入权限标识"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item :prop="form.status" label="状态">
        <el-switch
          v-model="form.status"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          :active-text="statusOptions[0].label"
          :active-value="statusOptions[0].value"
          :inactive-text="statusOptions[1].label"
          :inactive-value="statusOptions[1].value"
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
import {
  menuTypeOptions,
  parentMenuOptions,
  menuIconOptions,
  statusOptions,
} from '@/constants/options'

import { addMenu, editMenu } from '@/api/menu'

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
})
const emit = defineEmits(['success'])

const form = ref({})
const rulesFormRef = ref(null)

const title = computed(() => (props.mode === 'add' ? '新增菜单' : '编辑菜单'))

const initForm = () => {
  const baseForm = props.mode === 'add' ? { menu_type: 1, sort: 1, status: 1 } : props.data
  form.value = Object.assign({}, baseForm)
}

const rules = {
  menu_name: [
    { required: true, message: '请输入菜单名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3-10个字符之间', trigger: 'blur' },
  ],
  menu_type: [
    { required: true, message: '请输入菜单编码', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在3-20个字符之间', trigger: 'blur' },
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

const submitForm = async () => {
  if (!rulesFormRef.value) return

  await rulesFormRef.value.validate(async (valid, fields) => {
    if (!valid) {
      console.log('提交失败', fields)
      return
    }

    if (props.mode === 'add') {
      await addMenu(form.value)
    } else {
      await editMenu(form.value)
    }

    ElMessage.success(props.mode === 'add' ? '新增成功' : '编辑成功')
    dialogFormVisible.value = false
    rulesFormRef.value.resetFields()
    emit('success')
  })
}

const getOptionsLabel = (options, value) => {
  const option = options.find((opt) => opt.value === value)
  return option ? option.label : ''
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
:deep(.menu_icons) {
  width: 20px;
  height: 20px;
}
</style>
