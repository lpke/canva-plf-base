import { playwright } from '@vitest/browser-playwright';
import { configDefaults, defineConfig } from 'vitest/config';

const commonExclude = [...configDefaults.exclude, '**/.direnv/**'];

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'node',
          environment: 'node',
          include: ['**/*.test.js'],
          exclude: [
            ...commonExclude,
            '**/*.dom.test.js',
            '**/*.browser.test.js',
          ],
        },
      },
      {
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['**/*.dom.test.js'],
          exclude: commonExclude,
        },
      },
      {
        test: {
          name: 'browser',
          include: ['**/*.browser.test.js'],
          exclude: commonExclude,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
