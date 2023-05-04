import { html } from 'lit';
import '../src/finalproject-audio.js';

export default {
  title: 'Final Project Audio',
  component: 'finalproject-audio',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ audioSrc, backgroundColor }) {
  return html`
    <finalproject-audio
      style="--finalproject-audio-background-color: ${backgroundColor || 'white'}"
      audio-src=${audioSrc}
    >
    </finalproject-audio>
  `;
}

export const Player = Template.bind({});
Player.args = {
  audioSrc: 'audio1.mp3',
};
