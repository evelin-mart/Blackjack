export const colorPicker = (value: number) => {
    if (value < 5) {
        return 'yellow';
    }
    if (value < 10) {
        return 'red';
    }
    if (value < 25) {
        return 'blue';
    }
    if (value < 100) {
        return 'green';
    }
    return 'black';
};
