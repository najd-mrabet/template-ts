/**
 * Manages the clock's UI and handles user interactions.
 */
export class ClockView {
    private timeElement: HTMLElement;
    private modeButton: HTMLElement;
    private increaseButton: HTMLElement;
    private lightButton: HTMLElement;

    /**
     * Finds the UI elements when the view is created.
     */
    constructor() {
        this.timeElement = document.getElementById('time')!;
        this.modeButton = document.getElementById('modeButton')!;
        this.increaseButton = document.getElementById('increaseButton')!;
        this.lightButton = document.getElementById('lightButton')!;
    }

    /**
     * Runs the function when the mode button is clicked.
     * @param handler - What should happen when the button is clicked.
     */
    public onModeChange(handler: () => void): void {
        this.modeButton.addEventListener('click', handler);
    }

    /**
     * Runs a function when the increase button is clicked.
     * @param handler - What should happen when the button is clicked.
     */
    public onTimeIncrease(handler: () => void): void {
        this.increaseButton.addEventListener('click', handler);
    }

    /**
     * Runs a function when the light mode button is clicked.
     * @param handler - What should happen when the button is clicked.
     */
    public onToggleLight(handler: () => void): void {
        this.lightButton.addEventListener('click', handler);
    }

    /**
     * Changes the background color based on light mode.
     * @param isLightOn - If `true`, sets a bright background; otherwise, uses a white background.
     */
    public updateLightMode(isLightOn: boolean): void {
        this.timeElement.style.backgroundColor = isLightOn ? '#FBE106' : '#FFFFFF';
    }

    /**
     * Updates the time on the screen and highlights the part that can be edited.
     */
    public updateTimeDisplay(time: Date, editMode: 'hours' | 'minutes' | 'none'): void {
        const hoursElement = document.getElementById("hourDisplay");
        const minutesElement = document.getElementById("minuteDisplay");
        const secondsElement = document.getElementById("secondDisplay");
    
        if (!hoursElement || !minutesElement || !secondsElement) return;

        hoursElement.textContent = this.formatTimeUnit(time.getHours());
        minutesElement.textContent = this.formatTimeUnit(time.getMinutes());
        secondsElement.textContent = this.formatTimeUnit(time.getSeconds());

        hoursElement.classList.remove("blink");
        minutesElement.classList.remove("blink");
    
        if (editMode === 'hours') {
            hoursElement.classList.add("blink");
        } else if (editMode === 'minutes') {
            minutesElement.classList.add("blink");
        }
    }
    /**
     * Makes sure hours, minutes, and seconds always have two digits.
     * @param unit - A number (hours, minutes, or seconds).
     * @returns The number as a two-digit string.
     */
    private formatTimeUnit(unit: number): string {
        return unit < 10 ? `0${unit}` : `${unit}`;
    }
}
