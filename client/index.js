/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/Router';
import {name as appName} from './app.json';
import './src/services/langs/i18next';

AppRegistry.registerComponent(appName, () => App);
