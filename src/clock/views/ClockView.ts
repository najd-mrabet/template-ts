/**
 * @class ClockView
 * @description Manages the clock's UI and handles user interactions.
 */
export class ClockView {
    private timeElement: HTMLElement;
    private modeButton: HTMLElement;
    private increaseButton: HTMLElement;
    private lightButton: HTMLElement;
    private timezoneSelector: HTMLSelectElement;
    private formatButton: HTMLElement;
    private resetButton: HTMLElement;
    private idClockElement: string;

    constructor(id: string) {
        this.timeElement = document.getElementById(`time-${id}`)!;
        this.modeButton = document.getElementById(`modeButton-${id}`)!;
        this.increaseButton = document.getElementById(`increaseButton-${id}`)!;
        this.lightButton = document.getElementById(`lightButton-${id}`)!;
        this.timezoneSelector = document.getElementById(`timezoneSelect-${id}`)! as HTMLSelectElement;
        this.formatButton = document.getElementById(`toggleFormatButton-${id}`)!;
        this.resetButton = document.getElementById(`resetButton-${id}`)!;
        this.idClockElement = id;
    }

    public onModeChange(handler: () => void): void {
        this.modeButton.addEventListener('click', handler);
    }


    public onTimeIncrease(handler: () => void): void {
        this.increaseButton.addEventListener('click', handler);
    }


    public onToggleLight(handler: () => void): void {
        this.lightButton.addEventListener('click', handler);
    }


    public onToggleFormat(handler: () => void): void {
        this.formatButton.addEventListener('click', handler);
    }


    public onResetTime(handler: () => void): void {
        this.resetButton.addEventListener('click', handler);
    }


    public onTimezoneChange(handler: (offset: number) => void): void {
        this.timezoneSelector.addEventListener('change', () => {
            const offset = parseInt(this.timezoneSelector.value, 10);
            handler(offset);
        });
    }

    public resetTimezoneSelector(defaultOffset: number): void {
        this.timezoneSelector.value = defaultOffset.toString();
    }

    public updateLightMode(isLightOn: boolean): void {
        this.timeElement.style.backgroundColor = isLightOn ? '#FBE106' : '#FFFFFF';
    }


    public updateTimeDisplay(time: Date, editMode: 'hours' | 'minutes' | 'none', is24HFormat: boolean): void {
        const hoursElement = document.getElementById(`hourDisplay-${this.idClockElement}`);
        const minutesElement = document.getElementById(`minuteDisplay-${this.idClockElement}`);
        const secondsElement = document.getElementById(`secondDisplay-${this.idClockElement}`);
        const ampmElement = document.getElementById(`ampmDisplay-${this.idClockElement}`);

    
        if (!hoursElement || !minutesElement || !secondsElement || !ampmElement) return;
    
        let hours = time.getHours();
        let ampm = "";
    
        if (!is24HFormat) {
            ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
        }
    
        hoursElement.textContent = this.formatTimeUnit(hours);
        minutesElement.textContent = this.formatTimeUnit(time.getMinutes());
        secondsElement.textContent = this.formatTimeUnit(time.getSeconds());
        ampmElement.textContent = ampm;
    
        hoursElement.classList.remove("blink");
        minutesElement.classList.remove("blink");
    
        if (editMode === 'hours') {
            hoursElement.classList.add("blink");
        } else if (editMode === 'minutes') {
            minutesElement.classList.add("blink");
        }
    }

    private formatTimeUnit(unit: number): string {
        return unit < 10 ? `0${unit}` : `${unit}`;
    }
}
