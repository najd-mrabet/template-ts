import { ClockModel } from "../models/ClockModel";
import { ClockView } from "../views/ClockView";

/**
 * Manages the clock by handling user actions and updating the display.
 */
export class ClockController {
    private model: ClockModel;
    private view: ClockView;

    /**
     * Sets up the controller with the clock model and view.
     * Starts the clock
     * @param model - The clock's data and logic.
     * @param view - The clock's UI.
     */
    constructor(model: ClockModel, view: ClockView) {
        this.model = model;
        this.view = view;
        this.initClock();
    }

    /**
     * Starts the clock:
     * - Listens for button clicks
     * - Syncs light mode settings
     * - Updates the display every second
     */
    public initClock(): void {
        this.view.onModeChange(() => this.changeEditMode());
        this.view.onTimeIncrease(() => this.updateTime());
        this.view.onToggleLight(() => this.toggleLightMode());
        this.view.updateLightMode(this.model.isLightModeEnabled());
        setInterval(() => this.refreshClock(), 1000);
    }

    /**
     * Updates the clock display every second.
     */
    private refreshClock(): void {
        this.model.progressClock();
        this.view.updateTimeDisplay(
            this.model.getTime(),
            this.model.getEditMode()
        );
    }

    /**
     * Switches between editing hours, minutes, or turning off edit mode.
     */
    private changeEditMode(): void {
        const currentMode = this.model.getEditMode();

        switch (currentMode) {
            case 'none': 
                this.model.setEditMode('hours');
                break;
            case 'hours':
                this.model.setEditMode('minutes');
                break;
            default:
                this.model.setEditMode('none');
        }

        this.view.updateTimeDisplay(this.model.getTime(), this.model.getEditMode());
    }

    /**
     * Increases hours or minutes if they are being edited.
     */
    private updateTime(): void {
        this.model.increaseTime();
        this.view.updateTimeDisplay(this.model.getTime(), this.model.getEditMode());
    }

    /**
     * Turns light mode on or off.
     */
    private toggleLightMode(): void {
        this.model.toggleLightMode();
        this.view.updateLightMode(this.model.isLightModeEnabled());
    }
}
