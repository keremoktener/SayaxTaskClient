export type InvoiceBreakdown = {
    meterNo: string;
    municipality: string;
    totalConsumptionMwh: number;

    energy: number;
    comission: number;
    distribution: number;
    btv: number;
    kdv: number;
    grandTotal: number;
};

export type MunicipalityTotal = {
    municipality: string;
    totalBtv: number;
};