import { interpolatePositions } from './path-to-your-function-file'; // Adjust the import path as necessary

describe('interpolatePositions', () => {
    it('should return correct positions and dates at specified intervals', () => {
        const startPos = [40.7128, -74.0060]; // New York City
        const endPos = [42.3601, -71.0589]; // Boston
        const startDate = new Date('2023-01-01T00:00:00Z');
        const endDate = new Date('2023-01-02T00:00:00Z');
        const interval = 3600000; // 1 hour

        const result = interpolatePositions(startPos, startDate, endPos, endDate, interval);

        // Check the number of positions
        const expectedNumberOfPositions = Math.floor((endDate.getTime() - startDate.getTime()) / interval) + 1;
        expect(result.length).toBe(expectedNumberOfPositions);

        // Check the first and last positions and dates
        expect(result[0].position).toEqual(startPos);
        expect(result[0].date).toEqual(startDate);
        expect(result[result.length - 1].position).toEqual(endPos);
        expect(result[result.length - 1].date).toEqual(endDate);

        // Optionally, check some intermediate values
        // ...

        // Check if the intervals are correct
        for (let i = 1; i < result.length; i++) {
            expect(result[i].date.getTime() - result[i - 1].date.getTime()).toBe(interval);
        }
    });

    // Add more tests as needed, such as for edge cases, invalid inputs, etc.
});
