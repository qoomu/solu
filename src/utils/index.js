import { rsc } from 'rsc-env';

const utils = !rsc ? (require('./helpers.client.js')).default : (require('./helpers.server.js')).default;

let appTitle = 'App';

utils.setTitle = function (title) {
  appTitle = title;
}

utils.getTitle = () => appTitle;

utils.isServer = () => rsc;

utils.isClient = () => !rsc;

export default utils;
