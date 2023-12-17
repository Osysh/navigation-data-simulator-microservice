import { GeoPosition, Mobile, DataToSend, TableData, MobileData } from './types';

export class SimulationGenerator {
  constructor() {}

  private interpolatePositions(
      startPos: GeoPosition,
      startDate: Date,
      endPos: GeoPosition,
      endDate: Date,
      interval: number // interval in seconds
  ): Array<{ position: GeoPosition; date: Date }> {
      const [startLat, startLng] = startPos;
      const [endLat, endLng] = endPos;
      const intervalInMs = interval * 1000;
      
      const totalDistanceLat = endLat - startLat;
      const totalDistanceLng = endLng - startLng;
  
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      const totalTime = endTime - startTime;
  
      const steps = Math.floor(totalTime / intervalInMs);
      let positions: Array<{ position: GeoPosition; date: Date }> = [];
  
      for (let i = 0; i < steps; i++) {
          let fraction = i / steps;
          let currentLat = startLat + (totalDistanceLat * fraction);
          let currentLng = startLng + (totalDistanceLng * fraction);
          let currentDate = new Date(startTime + intervalInMs * i);
          positions.push({ position: [currentLat, currentLng], date: currentDate });
      }
  
      // Add the end position if it's not already included
      if (positions.length === 0 || positions[positions.length - 1].date.getTime() < endTime) {
          positions.push({ position: endPos, date: new Date(endTime) });
      }
  
      return positions;
  }

  public processRoutes(mobiles: Mobile[], refreshingInterval: number): DataToSend {
    const dataToSend: DataToSend = {};

    mobiles.forEach(mobile => {
        mobile.route.forEach((route, index) => {
            if (index === mobile.route.length - 1) return;

            const nextRoute = mobile.route[index + 1];
            const interpolatedPositions = this.interpolatePositions(
                [route.lat, route.long],
                new Date(route.time),
                [nextRoute.lat, nextRoute.long],
                new Date(nextRoute.time),
                refreshingInterval
            );

            interpolatedPositions.forEach(({ position, date }) => {
                const dateString = date.toISOString(); // Convert date to ISO string for key

                if (!dataToSend[dateString]) {
                    dataToSend[dateString] = [];
                }

                dataToSend[dateString].push({
                    position: position,
                    name: mobile.nom
                });
            });
        });
    });

    return dataToSend;
  }

  public static convertToSortedTable(data: DataToSend, interval: number): TableData[] {
    // Flatten and sort the data
    let flatData: { date: Date; mobileData: MobileData }[] = [];
    Object.keys(data).forEach(dateStr => {
        const date = new Date(dateStr);
        data[dateStr].forEach(mobileData => {
            flatData.push({ date, mobileData });
        });
    });

    flatData.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Insert empty positions as necessary
    let tableData: TableData[] = [];
    let previousDate = flatData[0]?.date || new Date();

    for (const { date, mobileData } of flatData) {
        while (date.getTime() - previousDate.getTime() > interval * 1000) {
            previousDate = new Date(previousDate.getTime() + interval * 1000);
            tableData.push({ date: previousDate, mobiles: [] }); // Inserting empty position
        }
        tableData.push({ date, mobiles: [mobileData] });
        previousDate = date;
    }

    return tableData;
  }
}
