export type GeoPosition = [number, number];

type MobileType = 'plane' | 'boat' | 'ground';

interface Route {
    lat: number;
    long: number;
    time: Date;
}

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
    [key: string]: { position: GeoPosition, name: string }[];
}

export interface TableData {
    date: Date;
    mobiles: MobileData[];
}

export interface MobileData {
    position: GeoPosition;
    name: string;
}
