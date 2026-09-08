import { IngredientDetailsUI } from '@ui';

import ingredientImage from './assets/ingredient-placeholder.svg';
import { withModalSurface } from './modal-surface-decorator';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/IngredientDetails',
  component: IngredientDetailsUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [withModalSurface],
} satisfies Meta<typeof IngredientDetailsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultIngredientDetails: Story = {
  args: {
    ingredientData: {
      _id: '111',
      name: 'Начинка',
      type: 'main',
      proteins: 23,
      fat: 34,
      carbohydrates: 45,
      calories: 56,
      price: 67,
      image: ingredientImage,
      image_large: ingredientImage,
      image_mobile: ingredientImage,
    },
  },
};
