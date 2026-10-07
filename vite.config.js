import { defineConfig } from 'vite'
import injectHTML from 'vite-plugin-html-inject'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    typeof injectHTML === 'function' ? injectHTML() : injectHTML.default()
  ],
  server: {
    proxy: {
      // Direct local proxy for Google Calendar
      '/api/calendar': {
        target: 'https://calendar.google.com/calendar/ical/32b8f494cfd4b379d50b7f63e4116d5a8febc75ce4db335dd211eb47780e41b3%40group.calendar.google.com/public/basic.ics',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/calendar/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        shows: resolve(import.meta.dirname, 'shows.html'),
        booking: resolve(import.meta.dirname, 'booking.html'),
        tentone: resolve(import.meta.dirname, 'tentone.html'),
        links: resolve(import.meta.dirname, 'links.html'),
      },
    },
  },
})