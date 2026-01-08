import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    headless: true,
    trace: 'on-first-retry'
  },
  reporter: [['html', { open: 'never' }], ['list']]
});
