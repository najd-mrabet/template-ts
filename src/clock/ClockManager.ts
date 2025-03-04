import { ClockController } from "./controllers/ClockController";

export class ClockManager {
    private clocks: Map<string, ClockController> = new Map();
    private intervalId: null | ReturnType<typeof setTimeout> = null

    constructor() {
        this.startUpdating();
    }

    /**
     *   only one interval is running at any time to prevent memory leaks
     */
    private startUpdating(): void {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => this.updateAllClocks(), 1000);
        }
    }
    /**
     *  Stops the setInterval process if no clocks in the manger.
     */
    private stopUpdating(): void {
        if (this.clocks.size === 0 && this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }


    private updateAllClocks(): void {
        this.clocks.forEach(clock => clock.refreshClock());
    }

    public addClock(id: string, timezoneOffset: number = 0): ClockController {
        const clockController = new ClockController(id, new Date(), timezoneOffset);
        this.clocks.set(id, clockController);
        this.startUpdating();
        return clockController;
    }

    public removeClock(id: string): void {
        if (!this.clocks.has(id)) {
            return;
        }

        this.clocks.delete(id);
        this.stopUpdating();
    }
}
