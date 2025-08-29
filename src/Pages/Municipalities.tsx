import { useEffect, useState } from "react";
import { api } from "../Api/api";
import { fmtTL } from "../Utils/utils";
import type {MunicipalityTotal} from "../Models/Types.ts";

export default function Municipalities() {
    const [rows, setRows] = useState<MunicipalityTotal[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.getMunicipalities()
            .then(setRows)
            .catch(e => setError(e.message));
    }, []);

    if (error) return <p style={{color:"#ef4444"}}>Hata: {error}</p>;
    if (!rows) return <p className="muted">Yükleniyor…</p>;

    const total = rows.reduce((s, x) => s + x.totalBtv, 0);

    return (
        <div className="card">
            <div className="section-title">Belediye Bazlı BTV</div>
            <table>
                <thead>
                <tr><th>Belediye</th><th className="num">Toplam BTV</th></tr>
                </thead>
                <tbody>
                {rows.map((r, i) => (
                    <tr key={i}>
                        <td>{r.municipality}</td>
                        <td className="num">{fmtTL(r.totalBtv)}</td>
                    </tr>
                ))}
                <tr>
                    <td className="strong">Genel Toplam</td>
                    <td className="num strong">{fmtTL(total)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}