import { View } from '../model/View';
import { Player } from './Player';
import { Message } from './Message';
import { Choices, Combinations } from './types';


export class App extends View {
  choices: string[] = [Choices.Rock, Choices.Paper, Choices.Scissors];
  playerChoice: string = '';
  computerChoice: string = '';

  regionsMap(): { [key: string]: string; } {
    return {
      choices: '.choices',
      message: '.message',
      playerOne: '.player-one',
      playerTwo: '.player-two'
    };
  }

  eventsMap(): { [key: string]: (e?: any) => void; } {
    return {
      'click:.choice': (e: any) => {
        this.playerChoice = e.target.name;
        this.computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
        this.render();
      }
    };
  }

  get gameMessage(): string {
    switch (this.playerChoice + this.computerChoice) {
      case Combinations.PR:
      case Combinations.RS:
      case Combinations.SP:
        return `${this.playerChoice.toUpperCase()} beat(s) ${this.computerChoice.toUpperCase()}. You win!`;
      case Combinations.RP:
      case Combinations.SR:
      case Combinations.PS:
        return `${this.computerChoice.toUpperCase()} beat(s) ${this.playerChoice.toUpperCase()}. Computer wins!`;
      case Combinations.RR:
      case Combinations.PP:
      case Combinations.SS:
        return `It's a tie!`;
      default:
        return 'Time to play!';
    }
  }

  renderChoices = (): string[] => {
    return this.choices.map((choice: string) => {
      return `
        <button class='choice' name='${choice}'>
          <i class='fa-solid fa-hand-${choice}'></i>
        </button>
      `;
    });
  };

  onRender(): void {
    new Player(this.regions.playerOne, 1, this.playerChoice).render();
    new Player(this.regions.playerTwo, 2, this.computerChoice).render();
    new Message(this.regions.message, this.gameMessage).render();
  }

  template(): string {
    return `
      <div class='board'>
        <div class='message'></div>
        <div class='players'>
          <div class='player player-one'></div>
          <div class='player player-two'></div>
        </div>
        <div class='choices'>
          ${this.renderChoices().join('')}
        </div>
      </div>
    `;
  }
}