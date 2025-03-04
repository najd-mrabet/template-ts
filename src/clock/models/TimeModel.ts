/**
 * @class TimeModel
 * @description Manages time-related operations for the clock.
 * This model is responsible for handling time increments and formatting.
 */
export class TimeModel {
    private currentTime: Date;
    private timezoneOffset: number;
    private use24HFormat: boolean;

    /**
     * @constructor
     * @param {Date} [initialTime] - (Optional) A specific Date instance to set the initial time.
     * @param {number} [timezoneOffset=0] - (Optional) The timezone offset in hours (e.g., 1 for GMT+1).
     * @description Initializes the time model with the current system time or a custom time.
     */
    constructor(initialTime?: Date, timezoneOffset: number = 0) {
        this.timezoneOffset = timezoneOffset;
        this.currentTime = initialTime || new Date();
        this.use24HFormat = true; // Default to 24H format
        this.adjustTimeForTimezone();
    }

    /**
     * @method adjustTimeForTimezone
     * @description Adjusts the current time based on the timezone offset.
     */
    private adjustTimeForTimezone(): void {
        const offsetInMilliseconds = this.timezoneOffset * 60 * 60 * 1000;
        this.currentTime = new Date(this.currentTime.getTime() + offsetInMilliseconds);
    }

    /**
     * @method getTime
     * @returns {Date} The current clock time.
     */
    public getTime(): Date {
        return this.currentTime;
    }

    /**
     * @method progressClock
     * @description Moves the clock forward by one second.
     */
    public progressClock(): void {
        const now = new Date();
        const newSeconds = now.getSeconds(); 
        this.currentTime.setSeconds(newSeconds);
        if (newSeconds === 0) {
            this.currentTime.setMinutes(this.currentTime.getMinutes() + 1);
        }
    }
    

    /**
     * @method increaseHour
     * @description Increases the hour by 1. If it reaches 24, it resets to 0.
     */
    public increaseHour(): void {
        const newHour = (this.currentTime.getHours() + 1) % 24;
        this.currentTime.setHours(newHour);
    }

    /**
     * @method increaseMinute
     * @description Increases the minutes by 1.
     * If minutes reset to 00, the hour is also incremented.
     */
    public increaseMinute(): void {
        const newTime = new Date(this.currentTime.getTime() + 60000); // Ajoute 1 minute
        this.currentTime = newTime;
    }

    /**
     * @method setTimezoneOffset
     * @param {number} offset - The timezone offset in hours (e.g., 1 for GMT+1).
     * @description Sets the timezone offset and adjusts the current time accordingly.
     */
    public setTimezoneOffset(offset: number): void {
        const currentOffset = this.timezoneOffset; // Retrieve the old offset
        this.timezoneOffset = offset; // Update to new offset
        const offsetDifference = (offset - currentOffset) * 60 * 60 * 1000; // Convert to milliseconds
        this.currentTime = new Date(this.currentTime.getTime() + offsetDifference);
    }

    /**
     * @method toggleTimeFormat
     * @description Toggles between 24H and AM/PM time formats.
     */
    public toggleTimeFormat(): void {
        this.use24HFormat = !this.use24HFormat;
    }

    /**
     * @method is24HFormat
     * @returns {boolean} True if using 24H format, false if using AM/PM.
     */
    public is24HFormat(): boolean {
        return this.use24HFormat;
    }

    /**
     * @method resetTime
     * @param {Date} initialTime - The initial time to reset to.
     * @description Resets the time to the initial time, keeping the timezone and format.
     */
    public resetTime(initialTime: Date): void {
        this.currentTime = new Date(initialTime.getTime());
        this.adjustTimeForTimezone();
    }

    /**
     * @method getTimezoneOffset
     * @returns {number} The current timezone offset in hours (e.g., 1 for GMT+1).
     */
    public getTimezoneOffset(): number {
        return this.timezoneOffset;
    }
}