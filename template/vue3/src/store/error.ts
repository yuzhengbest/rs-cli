/**
 * @description 全局错误信息存储
 */
import { defineStore } from 'pinia'

interface ErrorStore {
  isError: boolean;
  errorMsg: string;
}

export const useErrorStore = defineStore({
  id: 'error',
  state: (): ErrorStore => ({
    isError: false,
    errorMsg: ''
  }),
  getters: {
    hasError: (state): boolean => state.isError,
    errorMsg: (state): string => state.errorMsg
  },
  actions: {
    setError ({ flag, message }: { flag: boolean; message: string }) {
      this.isError = flag
      this.errorMsg = message
    }
  }
})
