import { TimeModel } from "../clock";



describe('TimeModel', () => {
    let timeModel: TimeModel;

    beforeEach(() => {
        timeModel = new TimeModel(new Date(2023, 10, 1, 12, 30, 0)); // Initialize with a specific time
    });

    test('should initialize with the correct time', () => {
        const time = timeModel.getTime();
        expect(time.getHours()).toBe(12);
        expect(time.getMinutes()).toBe(30);
        expect(time.getSeconds()).toBe(0);
    });

    test('should progress the clock by one second', () => {
        timeModel.progressClock();
        const time = timeModel.getTime();
        expect(time.getSeconds()).toBe(new Date().getSeconds());
    });

    test('should increase the hour correctly', () => {
        timeModel.increaseHour();
        const time = timeModel.getTime();
        expect(time.getHours()).toBe(13);
    });

    test('should increase the minute correctly', () => {
        timeModel.increaseMinute();
        const time = timeModel.getTime();
        expect(time.getMinutes()).toBe(31);
    });

    test('should reset the time correctly', () => {
        const initialTime = new Date(2023, 10, 1, 12, 30, 0);
        timeModel.resetTime(initialTime);
        const time = timeModel.getTime();
        expect(time.getHours()).toBe(12);
        expect(time.getMinutes()).toBe(30);
        expect(time.getSeconds()).toBe(0);
    });

    test('should toggle time format between 24H and AM/PM', () => {
        expect(timeModel.is24HFormat()).toBe(true);
        timeModel.toggleTimeFormat();
        expect(timeModel.is24HFormat()).toBe(false);
        timeModel.toggleTimeFormat();
        expect(timeModel.is24HFormat()).toBe(true);
    });

    test('should adjust time for timezone offset', () => {
        timeModel.setTimezoneOffset(2); // GMT+2
        const time = timeModel.getTime();
        expect(time.getHours()).toBe(14); // 12 + 2 = 14
    });
});