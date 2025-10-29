import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()) // 이게 Pinia가 Vue에 등록 되있다는 것 (활성화)

app.mount('#app')
