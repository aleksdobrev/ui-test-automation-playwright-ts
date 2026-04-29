import { devices, PlaywrightTestConfig } from '@playwright/test';
import baseConfig from './playwright.config';

const mobileViewConfig: PlaywrightTestConfig = {
  ...baseConfig,
  projects: [
    { name: 'setup', testDir: './source/utility', testMatch: /.*\.setup\.ts/ },
    {
      name: 'Mobile Chrome Tab Portrait',
      use: { ...devices['Galaxy Tab S9'], storageState: 'auth.json' },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Chrome Tab Landscape',
      use: { ...devices['Galaxy Tab S9 landscape'], storageState: 'auth.json' },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Chrome Phone',
      use: { ...devices['Pixel 7'], storageState: 'auth.json' },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Safari Tab Portrait',
      use: { ...devices['iPad Pro 11'], storageState: 'auth.json' },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Safari Tab Landscape',
      use: { ...devices['iPad Pro 11 landscape'], storageState: 'auth.json' },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Safari iPhone 11',
      use: { ...devices['iPhone 11'], storageState: 'auth.json' },
      dependencies: ['setup'],
    },
    {
      name: 'Large Desktop',
      use: { viewport: { width: 1920, height: 1200 }, storageState: 'auth.json' },
      dependencies: ['setup'],
    },
    {
      name: 'Medium Desktop',
      use: { viewport: { width: 1600, height: 1300 }, storageState: 'auth.json' },
      dependencies: ['setup'],
    },
  ],
};

export default mobileViewConfig;
