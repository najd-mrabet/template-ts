import { ClockController, ClockModel } from './clock';
import { ClockView } from './clock/views/ClockView';
import './index.css';



document.addEventListener('DOMContentLoaded', () => {
    const model = new ClockModel();
    const view = new ClockView();
    new ClockController(model, view);
});
