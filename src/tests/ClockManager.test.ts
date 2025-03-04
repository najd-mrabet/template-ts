import { ClockManager } from "../clock/ClockManager";


jest.mock("../clock/controllers/ClockController", () => {
    return {
        ClockController: jest.fn().mockImplementation((id: string, date: Date, offset: number) => ({
            id,
            timezoneOffset: offset,
            refreshClock: jest.fn(),
        })),
    };
});

describe("ClockManager Unit Tests", () => {
    let clockManager: ClockManager;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, "setInterval");
        jest.spyOn(global, "clearInterval");
        clockManager = new ClockManager();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.restoreAllMocks();
    });

    test("startUpdating should start an interval if not already running", () => {
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    });


    test("updateAllClocks should call refreshClock on all clocks", () => {
        const clock1 = clockManager.addClock("clock-1");
        const clock2 = clockManager.addClock("clock-2");

        clockManager["updateAllClocks"]();

        expect(clock1.refreshClock).toHaveBeenCalled();
        expect(clock2.refreshClock).toHaveBeenCalled();
    });

    test("removeClock should remove a clock", () => {
        clockManager.addClock("clock-1");
        expect(clockManager["clocks"].size).toBe(1);
        clockManager.removeClock("clock-1");

        expect(clockManager["clocks"].size).toBe(0);
    });

    test("removeClock should stop interval if no clocks remain", () => {
        clockManager.addClock("clock-1");
        clockManager.removeClock("clock-1");

        expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    test("stopUpdating should clear interval when no clocks exist", () => {
        clockManager["stopUpdating"]();
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    test("startUpdating should not start multiple intervals", () => {
        clockManager.addClock("clock-1");
        clockManager.addClock("clock-2");
       // after add two clock we sould not start multiple intervals
        expect(setInterval).toHaveBeenCalledTimes(1);
    });

    test("removing a non-existent clock should not throw an error", () => {
        expect(() => clockManager.removeClock("non-existent-clock")).not.toThrow();
    });
});
