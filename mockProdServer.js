import { createProdMockServer } from 'vite-plugin-mock/client'

const modules = import.meta.glob('./mock/**/*.js', {
  eager: true,
})

const mockModules = Object.entries(modules).flatMap(([, module]) => module.default || [])

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
