import { TimeModel } from "./TimeModel";


/**
 * The main clock model that handles UI state and interacts with the time model.
 */
export class ClockModel {
    private timeModel: TimeModel;
    private editMode: 'hours' | 'minutes' | 'none';
    private isLightOn: boolean;

    /**
     * Initializes the clock model
     */
    constructor(initialTime?: Date) {
        this.timeModel = new TimeModel(initialTime);
        this.editMode = 'none';
        this.isLightOn = true; // Default: light mode is on
    }

    /**
     * Gets the current clock time.
     */
    public getTime(): Date {
        return this.timeModel.getTime();
    }

    /**
     * Checks if light mode is currently enabled.
     */
    public isLightModeEnabled(): boolean {
        return this.isLightOn;
    }

    /**
     * Gets the current edit mode (hours, minutes, or none).
     */
    public getEditMode(): 'hours' | 'minutes' | 'none' {
        return this.editMode;
    }

    /**
     * Updates the edit mode, allowing the user to change hours or minutes.
     */
    public setEditMode(mode: 'hours' | 'minutes' | 'none'): void {
        this.editMode = mode;
    }

    /**
     * Moves the clock forward by one second.
     */
    public progressClock(): void {
        this.timeModel.progressClock();
    }

    /**
     * Increases the currently selected time unit (hours or minutes).
     */
    public increaseTime(): void {
        if (this.editMode === 'hours') {
            this.timeModel.increaseHour();
        } else if (this.editMode === 'minutes') {
            this.timeModel.increaseMinute();
        }
    }

    /**
     * Toggles the light mode of the clock.
     */
    public toggleLightMode(): void {
        this.isLightOn = !this.isLightOn;
    }
}
