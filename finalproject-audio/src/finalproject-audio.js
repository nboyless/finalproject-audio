import { LitElement, html, css } from 'lit';

class AudioPlayer extends LitElement {
  static get properties() {
    return {
      src: { type: String },
    };
  }

  static get styles() {
    return css`
      .audio-player {
        display: inline-block;
        width: 75px;
        height: 20px;
        padding: 5px;
        border: 1px solid var(--border-color, black);
        background-color: lightblue;
        color: var(--text-color, black);
        font-size: var(--font-size, 16px);
        position: relative;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        text-align: center;
      }

      .audio-player:hover {
        background-color: var(--hover-color, #56C3E8);
      }

      .play-pause .pause {
        display: none;
      }

      .progress-container {
        width: 100%;
        height: 10px;
        background-color: #ddd;
        position: absolute;
        bottom: 0;
        left: 0;
      }

      .progress {
        height: 100%;
        background-color: #4caf50;
        width: 0;
        transition: width 0.1s linear;
      }

      .play-pause {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }

      .play-pause span {
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.src = '';
  }

  render() {
    return html`
      <div class="audio-player">
        <span class="play-pause" tabindex="0">
          <span class="play">►</span>
          <span class="pause">❚❚</span>
        </span>
        <audio id="audio" src="${this.src}"></audio>
        <div class="progress-container">
          <div class="progress"></div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const audio = this.shadowRoot.querySelector('#audio');
    const playPause = this.shadowRoot.querySelector('.play-pause');
    const progress = this.shadowRoot.querySelector('.progress');

    playPause.addEventListener('click', () => {
      togglePlayPause(playPause, audio);
    });

    playPause.addEventListener('keydown', (event) => {
      if (event.keyCode === 32) {
        togglePlayPause(playPause, audio);
        event.preventDefault();
      }
    });

    audio.addEventListener('timeupdate', () => {
      const progressPercentage = (audio.currentTime / audio.duration) * 100;
      progress.style.width = `${progressPercentage}%`;
    });

    function togglePlayPause(playPause, audio) {
      if (audio.paused) {
        audio.play();
        playPause.querySelector('.play').style.display = 'none';
        playPause.querySelector('.pause').style.display = 'inline-block';
      } else {
        audio.pause();
        playPause.querySelector('.play').style.display = 'inline-block';
        playPause.querySelector('.pause').style.display = 'none';
      }
    }
  }
}

customElements.define('audio-player', AudioPlayer);
