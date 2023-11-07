import { json } from "@sveltejs/kit";

export function GET(location: string, options: any) {
    return fetch(location, {
        method: "GET",
        body: JSON.stringify(options)
    }).then((r) => r.json());
}

export function POST(location: string, options: any) {
    return fetch(location, {
        method: "POST",
        body: JSON.stringify(options)
    }).then((r) => r.json());
}
