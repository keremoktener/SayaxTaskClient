import { useEffect, useState } from "react";
import { fmtTL, fmtMWh } from "../Utils/utils";
import {api} from "../Api/api.ts";
import type {InvoiceBreakdown} from "../Models/Types.ts";

function FormulaLegend() {
    return (
        <div className="card" style={{ marginTop: 20, lineHeight: 1.5 }}>
            <h3 style={{ marginBottom: 10 }}>💡 Hesaplama Formülleri</h3>

            <details open>
                <summary style={{ fontWeight: "600", marginBottom: 6 }}>S1 – PTF+YEK, % Komisyon</summary>
                <ul style={{ marginTop: 6, marginLeft: 20 }}>
                    <li><b>Enerji:</b> Σ (MWh<sub>h</sub> × (PTF<sub>h</sub> + YEK))</li>
                    <li><b>Komisyon:</b> Enerji × KomisyonOranı</li>
                    <li><b>Dağıtım:</b> ToplamMWh × DağıtımBirimFiyat</li>
                    <li><b>BTV:</b> Enerji × BtvOranı</li>
                    <li><b>KDV:</b> (Enerji + Komisyon + Dağıtım + BTV) × KdvOranı</li>
                    <li><b>Genel Toplam:</b> Enerji + Komisyon + Dağıtım + BTV + KDV</li>
                </ul>
            </details>

            <details style={{ marginTop: 12 }}>
                <summary style={{ fontWeight: "600", marginBottom: 6 }}>S2 – PTF+YEK, TL/MWh Komisyon</summary>
                <ul style={{ marginTop: 6, marginLeft: 20 }}>
                    <li><b>Enerji:</b> Σ (MWh × (PTF+YEK))</li>
                    <li><b>Komisyon:</b> ToplamMWh × KomisyonTL/MWh</li>
                    <li><b>Dağıtım / BTV / KDV:</b> S1 ile aynı formüller</li>
                </ul>
            </details>

            <details style={{ marginTop: 12 }}>
                <summary style={{ fontWeight: "600", marginBottom: 6 }}>S3 – Tarife − % İndirim</summary>
                <ul style={{ marginTop: 6, marginLeft: 20 }}>
                    <li><b>Enerji:</b> ToplamMWh × (Tarife × (1 − İndirimOranı))</li>
                    <li><b>Komisyon:</b> Yok (0)</li>
                    <li><b>Dağıtım / BTV / KDV:</b> S1 ile aynı formüller</li>
                </ul>
            </details>
        </div>
    );
}

export default function InvoicesList() {
    const [data, setData] = useState<InvoiceBreakdown[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [month, setMonth] = useState<string>("");
    const [path, setPath] = useState<string>("");

    const load = () => {
        setLoading(true);
        setError(null);
        api.getInvoices({ month: month || undefined, path: path || undefined })
            .then(setData)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    return (
        <div>


            {loading && <p className="muted">Yükleniyor…</p>}
            {error && <p style={{color:"#ef4444"}}>Hata: {error}</p>}

            {!loading && data && Array.isArray(data) && (
                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            <th>Sayaç</th>
                            <th>Belediye</th>
                            <th>Tüketim</th>
                            <th>Enerji</th>
                            <th>Komisyon</th>
                            <th>Dağıtım</th>
                            <th>BTV</th>
                            <th>KDV</th>
                            <th>Toplam</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                <td className="strong">{row.meterNo}</td>
                                <td>{row.municipality}</td>
                                <td>{fmtMWh(row.totalConsumptionMwh)}</td>
                                <td className="num">{fmtTL(row.energy)}</td>
                                <td className="num">{fmtTL(row.comission)}</td>
                                <td className="num">{fmtTL(row.distribution)}</td>
                                <td className="num">{fmtTL(row.btv)}</td>
                                <td className="num">{fmtTL(row.kdv)}</td>
                                <td className="num strong">{fmtTL(row.grandTotal)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                )}
            <FormulaLegend />

        </div>

    );
}