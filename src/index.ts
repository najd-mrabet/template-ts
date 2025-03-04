import './index.css';
import { ClockManager } from "./clock/ClockManager";


document.addEventListener('DOMContentLoaded', () => {
    const clockManager = new ClockManager();
    let clockCount = 0;

    document.getElementById('addClockButton')!.addEventListener('click', () => {
        const clockId = `clock-${clockCount++}`;
        let timezoneOffset = parseInt(prompt("Enter timezone offset (e.g., 0 for GMT+0, 1 for GMT+1):") || "0", 10);
        if (isNaN(timezoneOffset) || timezoneOffset < -12 || timezoneOffset > 14) {
            timezoneOffset = 0;
        }
        
        // Add the clock's HTML structure to the DOM
        const clockHTML = `
            <div class="clock-frame" id="${clockId}">
                <div class="watch-container">
                    <div id="time-${clockId}" class="time-display">
                        <span id="hourDisplay-${clockId}">00</span>:
                        <span id="minuteDisplay-${clockId}">00</span>:
                        <span id="secondDisplay-${clockId}">00</span>
                        <span id="ampmDisplay-${clockId}">--</span>
                    </div>
                    <button id="removeButton-${clockId}" class="button remove-button" aria-label="Remove clock">X</button>

                    <div class="button-container reset-button">
                        <span>Reset</span>
                        <button id="resetButton-${clockId}" class="button" aria-label="Reset time"></button>
                    </div>

                    <div class="button-container mode-button">
                        <span>Mode</span>
                        <button id="modeButton-${clockId}" class="button" aria-label="Change editable time unit"></button>
                    </div>

                    <div class="button-container format-button">
                        <span>AMPM-24H</span>
                        <button id="toggleFormatButton-${clockId}" class="button" aria-label="Toggle time format"></button>
                    </div>

                    <div class="button-container increase-button">
                        <span>Increase</span>
                        <button id="increaseButton-${clockId}" class="button" aria-label="Increase selected time unit"></button>
                    </div>

                    <div class="button-container light-button">
                        <span>Light</span>
                        <button id="lightButton-${clockId}" class="button" aria-label="Toggle light mode"></button>
                    </div>

                    <div class="select-container">
                        <select id="timezoneSelect-${clockId}" class="timezone-selector" aria-label="Select timezone">
                            <option value="0">GMT+0</option>
                            <option value="1">GMT+1</option>
                            <option value="2">GMT+2</option>
                        </select>
                    </div>
                </div>
            </div>
        `;


        const clocksContainer = document.getElementById('clocksContainer');
        if (clocksContainer) {
            clocksContainer.insertAdjacentHTML('beforeend', clockHTML);
        } else {
            console.error("Could not find clocksContainer element.");
            return;
        }

        clockManager.addClock(clockId, timezoneOffset);


        const removeButton = document.getElementById(`removeButton-${clockId}`);
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                clockManager.removeClock(clockId);
                document.getElementById(clockId)?.remove();
            });
        } else {
            console.error(`Could not find removeButton-${clockId} element.`);
        }
    });
});