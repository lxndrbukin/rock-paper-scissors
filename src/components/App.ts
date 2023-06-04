import { View } from '../model/View';
import { Player } from './Player';
import { Message } from './Message';
import { Choices, Combinations, LocalStorage } from './types';


export class App extends View {
  choices: string[] = [Choices.Rock, Choices.Paper, Choices.Scissors];
  playerChoice: string = '';
  computerChoice: string = '';
  playerScore: number = Number(localStorage.getItem(LocalStorage.PlayerScore)) || 0;
  computerScore: number = Number(localStorage.getItem(LocalStorage.ComputerScore)) || 0;

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

  get gameWin(): string {
    switch (this.playerChoice + this.computerChoice) {
      case Combinations.PR:
      case Combinations.RS:
      case Combinations.SP:
        this.playerScore = this.playerScore + 1;
        localStorage.setItem(LocalStorage.PlayerScore, JSON.stringify(this.playerScore));
        return `<b>${this.playerChoice}</b> beat(s) <b>${this.computerChoice}</b>. You win!`;
      case Combinations.RP:
      case Combinations.SR:
      case Combinations.PS:
        this.computerScore = this.computerScore + 1;
        localStorage.setItem(LocalStorage.ComputerScore, JSON.stringify(this.computerScore));
        return `<b>${this.computerChoice}</b> beat(s) <b>${this.playerChoice}</b>. Computer wins!`;
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
          <i class='fa-solid fa-hand-${choice.toLowerCase()}'></i>
        </button>
      `;
    });
  };

  onRender(): void {
    new Player(this.regions.playerOne, 1, this.playerChoice, this.playerScore).render();
    new Player(this.regions.playerTwo, 2, this.computerChoice, this.computerScore).render();
    new Message(this.regions.message, this.gameWin).render();
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
          <h4>Choices:</h4>
          <div class='choice-btns'>
            ${this.renderChoices().join('')}
          </div>
        </div>
      </div>
    `;
  }
}