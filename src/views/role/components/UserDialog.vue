<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500">
    <el-form ref="rulesFormRef" :model="form" :rules="rules" :label-width="80">
      <el-form-item label="用户名" prop="user_name" required>
        <el-input v-model="form.user_name" style="width: 140px" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarChange"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择性别" style="width: 140px">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门" prop="dept_name" required>
        <el-select v-model="form.dept_name" placeholder="请选择部门" style="width: 140px">
          <el-option
            v-for="item in ['研发部', '销售部', '财务部', '运维部', '人事部', '后勤部']"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone_number">
        <el-input v-model="form.phone_number" style="width: 140px" />
      </el-form-item>
      <el-form-item label="状态" prop="status" required>
        <el-radio-group v-model="form.status">
          <el-radio :value="1">启用</el-radio>
          <el-radio :value="0">禁用</el-radio>
        </el-radio-group>
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
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { addUser, editUser } from '@/api/user'

const dialogFormVisible = defineModel('visible')
const props = defineProps({
  mode: {
    type: String,
  },
  data: {
    type: Object,
  },
})
const emit = defineEmits(['success'])

const rulesFormRef = ref(null)

const title = computed(() => {
  return props.mode === 'add' ? '新增用户' : '编辑用户'
})
const form = ref({})

const imageUrl = ref('')

const rules = reactive({
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在6-10个字符之间', trigger: 'blur' },
  ],
  dept_name: [
    {
      required: true,
      message: '请选择所属部门',
      trigger: 'change',
    },
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
})

const handleAvatarChange = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = (rawFile) => {
  const isImage = rawFile.type.startsWith('image/')
  const isLt2M = rawFile.size / 1024 / 1024 < 2
  if (!isImage) {
    ElMessage.error('只能上传图片')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB')
    return false
  }
  return true
}
const submitForm = async () => {
  if (!rulesFormRef.value) return
  await rulesFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      if (props.mode === 'add') {
        await addUser(form.value)
        ElMessage.success('用户添加成功')
      } else {
        await editUser(form.value)
        ElMessage.success('用户编辑成功')
      }
      dialogFormVisible.value = false
      rulesFormRef.value.resetFields()
      emit('success')
    } else {
      console.log('提交失败', fields)
    }
  })
}

const resetForm = () => {
  rulesFormRef.value.resetFields()
  dialogFormVisible.value = false
}

watch(
  () => props.data,
  (newValue) => {
    rulesFormRef.value?.resetFields()
    form.value = Object.assign({}, newValue)

    // imageUrl.value = newValue.avatar
  },
)
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader) {
  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
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
