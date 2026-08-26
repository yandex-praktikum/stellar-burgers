import { OrderDetailsUI } from '@ui';

import { withModalSurface } from './modal-surface-decorator';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/OrderDetails',
  component: OrderDetailsUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [withModalSurface],
} satisfies Meta<typeof OrderDetailsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrderDetails: Story = {
  args: {
    orderNumber: 12,
  },
};
