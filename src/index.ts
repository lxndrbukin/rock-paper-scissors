import { App } from './components/App';

const root = document.querySelector('#root');

if (root) {
  new App(root).render();
}