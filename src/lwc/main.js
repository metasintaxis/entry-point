import { createElement } from 'lwc';
import App from 'wired/app';

const element = createElement('wired-app', { is: App });
document.body.appendChild(element);
