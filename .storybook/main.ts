import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  webpackFinal: async (config) => {
    config.resolve
      ? (config.resolve.alias = {
          ...config.resolve.alias,
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@components': path.resolve(__dirname, '../src/components'),
          '@ui': path.resolve(__dirname, '../src/components/ui'),
          '@ui-pages': path.resolve(__dirname, '../src/components/ui/pages'),
          '@utils-types': path.resolve(__dirname, '../src/utils/types'),
          '@api': path.resolve(__dirname, '../src/utils/burger-api.ts'),
          '@burger-slice': path.resolve(
            __dirname,
            '../src/services/slices/BurgerSlice'
          ),
          '@hooks': path.resolve(__dirname, '../src/services/hooks'),
          '@store': path.resolve(__dirname, '../src/services/store'),
          '@cookies': path.resolve(__dirname, '../src/utils/cookie')
        })
      : null;
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;
