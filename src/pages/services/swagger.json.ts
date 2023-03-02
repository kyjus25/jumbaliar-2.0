import type { APIRoute } from "astro";

export const get: APIRoute = ({params, request}) => {
    return { body: JSON.stringify({test: true}) }
}