export interface Asset {
    id: string;
    title: string;
    description: string;
    status: AssetStatus;
}

export enum AssetStatus {
    OPEN="OPEN",
    SOLD="SOLD"
}
