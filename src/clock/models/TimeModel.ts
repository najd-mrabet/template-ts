/**
 * Manages time-related operations for the clock.
 * This model is responsible for handling time increments and formatting.
 */
export class TimeModel {
    private currentTime: Date;

    /**
     * Initializes the time model with the current system time or a custom time.
     * @param initialTime (optional) A specific Date instance to set the initial time.
     */
    constructor(initialTime?: Date) {
        this.currentTime = initialTime || new Date();
    }

    /**
     * Returns the current time as a Date object.
     * @returns {Date} The current clock time.
     */
    public getTime(): Date {
        return this.currentTime;
    }

    /**
     * Moves the clock forward by one second.
     */
    public progressClock(): void {
        this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
    }

    /**
     * Increases the hour by 1. If it reaches 24, it resets to 0.
     */
    public increaseHour(): void {
        const newHour = (this.currentTime.getHours() + 1) % 24;
        this.currentTime.setHours(newHour);
    }

    /**
     * Increases the minutes by 1.
     * If minutes reset to 00, the hour is also incremented.
     */
    public increaseMinute(): void {
        const newMinute = (this.currentTime.getMinutes() + 1) % 60;
        if (newMinute === 0) {
            this.increaseHour();
        }
        this.currentTime.setMinutes(newMinute);
    }
}
