import { ClockModel } from "../models/ClockModel";
import { ClockView } from "../views/ClockView";


export class ClockController {
    private model: ClockModel;
    private view: ClockView;
    private initialTime: Date;


    constructor(id:string, dateTime:Date, timezoneOffset:number) {
        this.model = new ClockModel(dateTime, timezoneOffset);
        this.view = new ClockView(id);
        this.initialTime = new Date(dateTime.getTime());
        this.initClock();
    }

    
    public initClock(): void {
        this.view.onModeChange(() => this.changeEditMode());
        this.view.onTimeIncrease(() => this.updateTime());
        this.view.onToggleLight(() => this.toggleLightMode());
        this.view.onToggleFormat(() => this.toggleTimeFormat());
        this.view.onResetTime(() => this.resetTime());
        this.view.onTimezoneChange((offset) => this.updateTimezone(offset));
        this.view.updateLightMode(this.model.isLightModeEnabled());
    }


    public refreshClock(): void {

        this.model.progressClock();
        this.view.updateTimeDisplay(
            this.model.getTime(),
            this.model.getEditMode(),
            this.model.is24HFormat()
        );
    }

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

        this.view.updateTimeDisplay(
            this.model.getTime(),
            this.model.getEditMode(),
            this.model.is24HFormat()
        );
    }


    private updateTime(): void {
        this.model.increaseTime();
        this.view.updateTimeDisplay(
            this.model.getTime(),
            this.model.getEditMode(),
            this.model.is24HFormat()
        );
    }

    private toggleLightMode(): void {
        this.model.toggleLightMode();
        this.view.updateLightMode(this.model.isLightModeEnabled());
    }

    private toggleTimeFormat(): void {
        this.model.toggleTimeFormat();
        this.view.updateTimeDisplay(
            this.model.getTime(),
            this.model.getEditMode(),
            this.model.is24HFormat()
        );
    }

    private resetTime(): void {
        this.model.resetTime(this.initialTime);
        this.view.updateTimeDisplay(
            this.model.getTime(),
            this.model.getEditMode(),
            this.model.is24HFormat()
        );
    }

    private updateTimezone(offset: number): void {
        this.model.setTimezoneOffset(offset);
        this.view.updateTimeDisplay(
            this.model.getTime(),
            this.model.getEditMode(),
            this.model.is24HFormat()
        );
    }

    
}
