import type { Decorator } from '@storybook/react';

/**
 * Some components are only ever rendered inside a Modal in the app. Showing
 * them on the bare page background misrepresents them — most visibly for
 * OrderDetails, whose done.svg carries an opaque backdrop that then reads as a
 * square. Values mirror `.modal` in modal.module.css.
 */
export const withModalSurface: Decorator = (Story) => (
  <div
    style={{
      width: 'fit-content',
      margin: 20,
      padding: '40px 40px 60px',
      borderRadius: 40,
      background: 'var(--background)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Story />
  </div>
);
