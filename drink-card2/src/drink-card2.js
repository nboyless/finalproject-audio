import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';


class DrinkCard2 extends LitElement {
  static get properties() {
    return {
      drink_background: {
        type: Boolean,
        reflect: true
      },
      expanded: {
        type: Boolean,
        reflect: true
      },

      title: {
        type: String,
        reflect: true
      },

      subtitle: {
        type: String, 
        reflect: true
      }
    }
  }

  static styles = css`
 @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

 :root {
      --cardbg: "red";
    }
    *[drink_background] {
      background-color: var(--cardbg);
    }

.controls {
  margin: 16px auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  max-width: 300px;
  margin: 16px 16px;
  text-align: center;
  font-family: 'Roboto Mono', monospace;
}
.card img {
  width: 100%;
}
.card p {
  padding: 16px;
}
.card>.button {
  display: none;
}

.button {
  background-color: #2895e8; /* Blue */
  border: none;
  color: white;
  padding: 8px 2vw;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  width: 25%;
  transform: scale(1);
  transition: 0.6s;
}

.button2 {
  background-color: #2895e8; /* Blue */
  border: none;
  color: white;
  padding: 8px 2vw;
  text-align: left;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  width: 70%;
  transform: scale(1);
  transition: 0.6s;
}

.button:hover, .button:focus {
  transform: scale(1.05);
  box-shadow: 0px 0px 48px 10px rgba(40,149,232,.7);
}

@media (min-width: 501px) and (max-width: 800px) {
  .card>.button {
    display: inline-block;
  }
}
@media (max-width: 500px) {
  .card {
    transform: scale(1.1);
  }
}
  `;

  constructor() {
    super();
    this.header = 'My app';
  }

  
  background() {
    if (this.drink_background) {
      this.drink_background = false;
      this.expanded = false;
      }
      else {
      this.drink_background = true;
      this.expanded = true;
      }
  }

  render() {
    return html`
    
  <div class="card">
    <img src="https://i5.walmartimages.com/asr/bb451fb5-04ed-4a3a-8a0c-692959107d58.6a5e1a0769e1d0f8b37313849efceaf5.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF"/>
    <h2 >Drink Prime!</h2>
    <p >Prime is a sports drink</p>
      <details class="button2" @toggle=${this.background}>
        <summary>Nutrition info</summary>
        <div>
          <ul>
          <slot name="calories"><li>0 calories</li></slot>
          <slot name="sugar"><li>25g of sugar</li></slot>
          <slot name="flavor"><li>Fruit Punch</li></slot>
          </ul>
  </div>
  </details>
  </div>

    `;
  }
}

customElements.define('drink-card2', DrinkCard2);