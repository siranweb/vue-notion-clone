import { createApp } from 'vue';
import App from '@/pages/App.vue';
import Editor from '@tinymce/tinymce-vue';

import '@/shared/styles/normalize.scss';

const app = createApp(App);
app.component('editor', Editor);
app.mount('#app');