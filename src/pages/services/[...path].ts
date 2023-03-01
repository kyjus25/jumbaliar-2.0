import type { APIRoute } from 'astro';

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export enum ConditionalThen {
    READ_DATA = 'READ_DATA',
    PUT_DATA = 'PUT_DATA',
    DELETE_DATA = 'DELETE_DATA',

}

export interface Model {
    id: string;
    name: string;
    type: string;
}

export interface Endpoint {
    id: number;
    authenticated: boolean;
    modelId: number;
    method: Method;
    path: string;
    conditionals: {
        if: string,
        then: {
            how: 'RETURN' | 'PUSH' | 'UPDATE' | 'DELETE',
            what: 'DB' | 'OBJECT' | 'BODY' | 'ERROR',
            where: 'INDEX' | 'PARAM' | 'ALL',
            whereData?: string,
            returnData?: object
        }
    }[]
}

const endpoints: Endpoint[] = [
    {
        id: 1,
        modelId: 1,
        authenticated: false,
        method: Method.GET,
        path: '/auth/users',
        conditionals: [
            {
                if: '*',
                then: {
                    how: 'RETURN',
                    what: 'DB',
                    where: 'ALL'
                }
            }
        ]
    }
];

const models = [
    {
        id: 1,
        data: [
            {
                id: 1,
                name: 'Justin'
            }
        ]
    }
]


export const all: APIRoute = ({params, request}) => {
    console.log(params, request.method);
    return {
        body: JSON.stringify({
          name: 'Astro 1',
          url: 'https://astro.build/',
        }),
    }
}