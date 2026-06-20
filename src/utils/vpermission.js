import { useUserStore } from '@/stores/modules/user'

export function hasPermission(permission) {
  const userStore = useUserStore()

  return userStore.permissions.includes(permission)
}
