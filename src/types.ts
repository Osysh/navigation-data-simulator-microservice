export type GeoPosition = [number, number];

type MobileType = 'plane' | 'boat' | 'ground';

interface Route {
    lat: number;
    long: number;
    time: Date;
}

// interface MobileData {
//     id: string;
//     lat: number;
//     long: number;
//     course?: number; // Optional, depends on how you calculate it
//     speed?: number; // Optional, depends on how you calculate it
//     name: string;
//     type: MobileType;
// }

// export interface DataToSend {
//     timestamp: Date;
//     mobiles: Record<string, MobileData>;
// }

export interface Mobile {
    nom: string;
    type: MobileType;
    isRandom: boolean;
    // schema: null;
    route: Route[];
}

interface Settings {
    rafraichissement: number;
}

export interface Simu {
    mobile: Mobile[];
    settings: Settings;
}

export interface DataToSend {
    [key: string]: { position: GeoPosition, name: string }[]; // Date as key, array of positions and names as value
}

export interface TableData {
    date: Date;
    mobiles: MobileData[];
}

export interface MobileData {
    position: GeoPosition;
    name: string;
}

export interface RequestParams {
    status: number;
    // Other properties if needed
  }