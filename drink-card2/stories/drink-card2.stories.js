import { html } from 'lit';
import '../src/drink-card2.js';

export default {
  title: 'DrinkCard2',
  component: 'drink-card2',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <drink-card2
      style="--drink-card2-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </drink-card2>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
