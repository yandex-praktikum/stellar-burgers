import { BurgerConstructorElementUI } from '@ui';
import { fn } from 'storybook/test';

import ingredientImage from './assets/ingredient-placeholder.svg';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/BurgerConstructorElement',
  component: BurgerConstructorElementUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story): React.JSX.Element => (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof BurgerConstructorElementUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultElement: Story = {
  args: {
    ingredient: {
      _id: '111',
      id: '222',
      name: 'Булка',
      type: 'top',
      proteins: 12,
      fat: 33,
      carbohydrates: 22,
      calories: 33,
      price: 123,
      image: ingredientImage,
      image_large: ingredientImage,
      image_mobile: ingredientImage,
    },
    index: 0,
    totalItems: 1,
    handleMoveUp: fn(),
    handleMoveDown: fn(),
    handleClose: fn(),
  },
};
