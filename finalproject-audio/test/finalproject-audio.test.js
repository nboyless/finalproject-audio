import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/audio-button.js';

describe('AudioButton', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <div>
        <audio-button src="audio1.mp3"></audio-button>
      </div>
    `);
  });

  it('renders the play button', () => {
    const playButton = element.shadowRoot.querySelector('.play');
    expect(playButton).to.exist;
  });

  it('toggles the play/pause button when clicked', async () => {
    const playPauseButton = element.shadowRoot.querySelector('.play-pause');
    playPauseButton.click();

    await element.updateComplete;
    let playButton = element.shadowRoot.querySelector('.play');
    let pauseButton = element.shadowRoot.querySelector('.pause');
    expect(playButton).to.not.exist;
    expect(pauseButton).to.exist;

    playPauseButton.click();
    await element.updateComplete;
    playButton = element.shadowRoot.querySelector('.play');
    pauseButton = element.shadowRoot.querySelector('.pause');
    expect(playButton).to.exist;
    expect(pauseButton).to.not.exist;
  });

  it('fills the progress bar as the audio plays', async () => {
    const audio = element.shadowRoot.querySelector('audio');
    const progress = element.shadowRoot.querySelector('.progress');
    audio.currentTime = 0;
    audio.play();

    await new Promise((resolve) => {
      audio.addEventListener('timeupdate', () => {
        const progressPercentage = (audio.currentTime / audio.duration) * 100;
        const progressWidth = progress.style.width.replace('%', '');
        expect(progressPercentage).to.be.closeTo(parseInt(progressWidth), 0.1);
        if (progressPercentage >= 99.9) {
          resolve();
        }
      });
    });
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
