import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { appTheme } from './theme';

// Same global styling the app gets: the design-system package injects the
// CSS custom properties, fonts and utility classes (ml-2, p-4, text_type_*),
// and index.css resets the body margin. Without these, stories that happen
// not to import the package render on a white background in the wrong font.
import '@krgaa/react-developer-burger-ui-components';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    // Docs pages default to a light surface, which makes the app's light text
    // unreadable. Render them with the app's own palette instead.
    docs: {
      theme: appTheme
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ padding: 20 }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default preview;
