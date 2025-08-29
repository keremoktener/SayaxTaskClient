const BASE = (import.meta.env.VITE_API_BASE as string) ?? "http://localhost:5183";
console.log("API BASE =>", BASE);

async function j<T>(res: Response): Promise<T> {
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export const api = {
    getInvoices: (opts?: { path?: string; month?: string }) => {
        const url = new URL(`${BASE}/api/invoices`);
        if (opts?.path) url.searchParams.set("path", opts.path);
        if (opts?.month) url.searchParams.set("month", opts.month);
        return fetch(url).then(j);
    },
    getInvoice: (meterNo: string, opts?: { path?: string; month?: string }) => {
        const url = new URL(`${BASE}/api/invoices/${meterNo}`);
        if (opts?.path) url.searchParams.set("path", opts.path);
        if (opts?.month) url.searchParams.set("month", opts.month);
        return fetch(url).then(j);
    },
    getMunicipalities: (opts?: { path?: string; month?: string }) => {
        const url = new URL(`${BASE}/api/municipalities`);
        if (opts?.path) url.searchParams.set("path", opts.path);
        if (opts?.month) url.searchParams.set("month", opts.month);
        return fetch(url).then(j);
    },
};