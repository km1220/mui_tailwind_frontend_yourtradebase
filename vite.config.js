import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from 'path';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ mode }) => {
	return defineConfig({
		// server: {
		// 	proxy: {
		// 		'/': 'http://localhost:5173'
		// 	}
		// },
		build: {
			outDir: './build',
			assetsDir: './source'
		},
		resolve: {
			alias: {
				'@src': path.resolve(__dirname, 'src'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@layouts': path.resolve(__dirname, 'src/layouts'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@store': path.resolve(__dirname, 'src/store'),
				'@utils': path.resolve(__dirname, 'src/utils'),
			}
		},
		plugins: [react()],
		define: {
			"process.env.NODE_ENV": `"${mode}"`,
		}
	})
}