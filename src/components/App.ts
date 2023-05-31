import { View } from '../model/View';

export class App extends View {
  template(): string {
    return `
      <div class='selections'>
      </div>
    `;
  }
}