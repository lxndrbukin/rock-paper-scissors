import { View } from '../model/View';
import { Player } from './Player';
import { Message } from './Message';

export class App extends View {
  choices: string[] = ['Rock', 'Paper', 'Scissors'];
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

  eventsMap(): { [key: string]: (e?: Event) => void; } {
    return {
      'click:.choice': (e: any) => {
        this.playerChoice = e.target.value;
        this.computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
        this.render();
      }
    };
  }

  get gameMessage(): string {
    switch (this.playerChoice + this.computerChoice) {
      case 'PaperRock':
      case 'RockScissors':
      case 'ScissorsPaper':
        return `${this.playerChoice} beat(s) ${this.computerChoice}. You win!`;
      case 'RockPaper':
      case 'ScissorsRock':
      case 'PaperScissors':
        return `${this.computerChoice} beat(s) ${this.playerChoice}. Computer wins!`;
      case 'RockRock':
      case 'PaperPaper':
      case 'ScissorsScissors':
        return `It's a tie!`;
      default:
        return 'Time to play!';
    }
  }

  renderChoices = (): string[] => {
    return this.choices.map((choice: string) => {
      return `
        <input class='choice' type='button' value='${choice}' />
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