import { createElement } from 'lwc';
import App from 'wired/app';

const elm = createElement('wired-app', { is: App });
document.body.appendChild(elm);
