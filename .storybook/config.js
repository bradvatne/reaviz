import { configure, addDecorator, addParameters } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { themes } from '@storybook/theming';

addParameters({
  options: {
     theme: {
       ...themes.dark,
       animation: false,
       brand: 'r2d3',
       title: 'r2d3',
       image: '',
       url: ''
     }
  },
});

addDecorator(centered);

// Grep src for .story file extensions
const req = require.context('../src', true, /\.story\.tsx/);
const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
