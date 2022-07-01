import './style.css';
import $ from 'jquery';
import { init } from './scripts/init';

$.getJSON("src/assets/ksap.json", init);
