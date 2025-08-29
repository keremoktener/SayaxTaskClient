export const fmtTL = (n: number) =>
    n.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 2 });

export const fmtMWh = (n: number) =>
    `${n.toLocaleString("tr-TR", { maximumFractionDigits: 3 })} MWh`;