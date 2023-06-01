import { View } from '../model/View';

export class Choice extends View {
  constructor(public parent: Element, public choice: string) {
    super(parent);
  }

  handleClick = (): void => {
    const playerOne = document.querySelector('.player-one')!;
    playerOne.innerHTML = this.choice;
  };

  eventsMap(): { [key: string]: () => void; } {
    return {
      'click:.choice': this.handleClick
    };
  }

  template(): string {
    return `
      <button class='choice'>${this.choice}</button>
    `;
  }
}