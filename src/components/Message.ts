import { View } from '../model/View';

export class Message extends View {
  constructor(public parent: Element, public result: string) {
    super(parent);
  }

  template(): string {
    return `
      <div class='message-text'>
        ${this.result}
      </div>
    `;
  }
}