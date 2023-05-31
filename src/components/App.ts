import { View } from '../model/View';

export class App extends View {
  choices = ['rock', 'paper', 'scissors'];
  playerChoice = '';
  botChoice = '';

  eventsMap(): { [key: string]: () => void; } {
    return {
      'click:.choice': (e?: Event) => { }
    };
  }

  renderSelections = (): string[] => {
    return this.choices.map((choice: string) => {
      return `
        <div class='choice'>
          ${choice}
        </div>
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
          ${this.renderSelections().join('')}
        </div>
      </div>
    `;
  }
}