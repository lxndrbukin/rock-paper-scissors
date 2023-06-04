import { View } from '../model/View';

export class Player extends View {
  constructor(public parent: Element, public playerNum: number, public choice: string, public score: number) {
    super(parent);
  }

  template(): string {
    return `
      <div class='player-data'>
        <h5>Player ${this.playerNum}</h5>
        <h5>Score: ${this.score}</h5>
        <span class='player-choice'>
          <i class='fa-solid fa-hand-${this.choice.toLowerCase()}'></i>
        </span>
      </div>
    `;
  }
}