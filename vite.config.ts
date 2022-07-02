import path from 'path'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
	assetsInclude: ["./src/assets/**"],
	resolve: {
		alias: {
			'@': path.join(__dirname, './src'),
			'~/': `${pathSrc}/`,
		},
	},
	plugins: [visualizer()],
	build: {
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
				manualChunks(id) {
					console.log(id);
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0];
					}
				}
			}
		}
	}
})
