import { TimeModel } from "./TimeModel";

/**
 * @class ClockModel
 * @description The main clock model that handles UI state and interacts with the time model.
 */
export class ClockModel {
    private timeModel: TimeModel;
    private editMode: 'hours' | 'minutes' | 'none';
    private isLightOn: boolean;


    constructor(initialTime?: Date, timezoneOffset: number = 0) {
        this.timeModel = new TimeModel(initialTime, timezoneOffset);
        this.editMode = 'none';
        this.isLightOn = true;
    }


    public getTime(): Date {
        return this.timeModel.getTime();
    }

    /**
     * @method isLightModeEnabled
     * @returns {boolean} Whether light mode is currently enabled.
     */
    public isLightModeEnabled(): boolean {
        return this.isLightOn;
    }

    /**
     * @method getEditMode
     * @returns {'hours' | 'minutes' | 'none'} The current edit mode (hours, minutes, or none).
     */
    public getEditMode(): 'hours' | 'minutes' | 'none' {
        return this.editMode;
    }

    /**
     * @method setEditMode
     * @param {'hours' | 'minutes' | 'none'} mode - The edit mode to be set.
     * @description Updates the edit mode, allowing the user to change hours or minutes.
     */
    public setEditMode(mode: 'hours' | 'minutes' | 'none'): void {
        this.editMode = mode;
    }

    /**
     * @method progressClock
     * @description Moves the clock forward by one second.
     */
    public progressClock(): void {
        this.timeModel.progressClock();
    }

    /**
     * @method increaseTime
     * @description Increases the currently selected time unit (hours or minutes).
     */
    public increaseTime(): void {
        if (this.editMode === 'hours') {
            this.timeModel.increaseHour();
        } else if (this.editMode === 'minutes') {
            this.timeModel.increaseMinute();
        }
    }

    /**
     * @method toggleLightMode
     * @description Toggles the light mode of the clock.
     */
    public toggleLightMode(): void {
        this.isLightOn = !this.isLightOn;
    }

    /**
     * @method setTimezoneOffset
     * @param {number} offset - The timezone offset in hours (e.g., 1 for GMT+1).
     * @description Sets the timezone offset for the clock.
     */
    public setTimezoneOffset(offset: number): void {
        this.timeModel.setTimezoneOffset(offset);
    }

    /**
     * @method toggleTimeFormat
     * @description Toggles between 24H and AM/PM time formats.
     */
    public toggleTimeFormat(): void {
        this.timeModel.toggleTimeFormat();
    }

    /**
     * @method is24HFormat
     * @returns {boolean} True if using 24H format, false if using AM/PM.
     */
    public is24HFormat(): boolean {
        return this.timeModel.is24HFormat();
    }

    /**
     * @method resetTime
     * @param {Date} initialTime - The initial time to reset the clock to.
     * @description Resets the time to the initial time, keeping the timezone and format.
     */
    public resetTime(initialTime: Date): void {
        this.timeModel.resetTime(initialTime);
    }

    /**
     * @method getTimezoneOffset
     * @returns {number} The current timezone offset in hours (e.g., 1 for GMT+1).
     */
    public getTimezoneOffset(): number {
        return this.timeModel.getTimezoneOffset();
    }
}