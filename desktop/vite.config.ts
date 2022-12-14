import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import electron  from 'vite-plugin-electron';
import electronRenderer from 'vite-plugin-electron/renderer';
import polyfillExports from 'vite-plugin-electron/polyfill-exports';

console.log(electron,electronRenderer,polyfillExports)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron-main/index.ts',
      },
      preload: {
        // Must be use absolute path, this is the limit of rollup
        input: path.join(__dirname, './electron-preload/index.ts'),
      },
    }),
    electronRenderer(),
    polyfillExports(),
  ],
  build: {
    emptyOutDir: false, // 必须配置，否则electron相关文件将不会生成build后的文件
  },
})
