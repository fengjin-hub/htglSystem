import { ref, computed } from 'vue'

export function useDialog() {
  const dialogMode = ref('add')

  const currentRowData = ref(null)

  const title = computed(() => {
    return dialogMode.value === 'add' ? '新增' : '编辑'
  })

  const openDialog = (mode, row = null) => {
    dialogMode.value = mode
    currentRowData.value = row
  }

  return {
    dialogMode,
    title,
    currentRowData,
    openDialog,
  }
}
