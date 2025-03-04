import { ClockModel } from "../clock/models/ClockModel";

describe('ClockModel', () => {
    let clockModel: ClockModel;

    beforeEach(() => {
        clockModel = new ClockModel(new Date(2023, 10, 1, 12, 30, 0));
    });

    test('should initialize with the correct time', () => {
        const time = clockModel.getTime();
        expect(time.getHours()).toBe(12);
        expect(time.getMinutes()).toBe(30);
        expect(time.getSeconds()).toBe(0);
    });

    test('should progress the clock by one second', () => {
        clockModel.progressClock();
        const time = clockModel.getTime();
        expect(time.getSeconds()).toBe(new Date().getSeconds());
    });

    test('should increase the hour in edit mode', () => {
        clockModel.setEditMode('hours');
        clockModel.increaseTime();
        const time = clockModel.getTime();
        expect(time.getHours()).toBe(13);
    });

    test('should increase the minute in edit mode', () => {
        clockModel.setEditMode('minutes');
        clockModel.increaseTime();
        const time = clockModel.getTime();
        expect(time.getMinutes()).toBe(31);
    });

    test('should toggle light mode', () => {
        expect(clockModel.isLightModeEnabled()).toBe(true);
        clockModel.toggleLightMode();
        expect(clockModel.isLightModeEnabled()).toBe(false);
        clockModel.toggleLightMode();
        expect(clockModel.isLightModeEnabled()).toBe(true);
    });

    test('should toggle time format between 24H and AM/PM', () => {
        expect(clockModel.is24HFormat()).toBe(true);
        clockModel.toggleTimeFormat();
        expect(clockModel.is24HFormat()).toBe(false);
        clockModel.toggleTimeFormat();
        expect(clockModel.is24HFormat()).toBe(true);
    });

    test('should reset the time correctly', () => {
        const initialTime = new Date(2023, 10, 1, 12, 30, 0);
        clockModel.resetTime(initialTime);
        const time = clockModel.getTime();
        expect(time.getHours()).toBe(12);
        expect(time.getMinutes()).toBe(30);
        expect(time.getSeconds()).toBe(0);
    });

    test('should set timezone offset correctly', () => {
        clockModel.setTimezoneOffset(2);
        const time = clockModel.getTime();
        expect(time.getHours()).toBe(14); // hour12 + 2 = 14
    });
});
