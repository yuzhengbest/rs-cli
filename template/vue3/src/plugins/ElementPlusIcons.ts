import type { App } from 'vue'
import * as ElementPlusIcons from '@element-plus/icons-vue'

export default {
  install (app: App) {
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
      app.component(key, component)
    }
  }
}
