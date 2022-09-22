import { keyAction, timerAction } from './actions.js';
import keyboard from '../services/keyboard.js';
import timer from '../services/timer.js';


keyboard.addListener(keyAction);  // <-- convert key to action
timer.addListener(timerAction);
