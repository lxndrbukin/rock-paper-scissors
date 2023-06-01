import { View } from '../model/View';
import { Choice } from './Choice';

export class App extends View {
  choices = ['rock', 'paper', 'scissors'];
  playerChoice = '';
  botChoice = '';

  regionsMap(): { [key: string]: string; } {
    return {
      playerOne: '.player-one',
      playerTwo: '.player-two'
    };
  }

  eventsMap(): { [key: string]: () => void; } {
    return {
      'click:.choice': (e?: any) => {
        this.regions.playerOne.innerHTML = e.target.innerText;
        this.regions.playerTwo.innerHTML = this.choices[Math.floor(Math.random() * this.choices.length)];
      }
    };
  }

  renderChoices = (): string[] => {
    return this.choices.map((choice: string) => {
      return `
        <button class='choice'>
          ${choice}
        </button>
      `;
    });
  };

  template(): string {
    return `
      <div class='board'>
        <div class='players'>
          <div class='player-one'></div>
          <div class='player-two'></div>
        </div>
        <div class='choices'>
          ${this.renderChoices().join('')}
        </div>
      </div>
    `;
  }
}