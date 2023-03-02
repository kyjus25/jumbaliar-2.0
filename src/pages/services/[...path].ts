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
    // authenticated: boolean;
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
        // authenticated: false,
        method: Method.GET,
        path: 'auth/user',
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
];

const response = (payload: object) => {
    return {
        body: JSON.stringify(payload),
    }
}


export const all: APIRoute = ({params, request}) => {
    console.log(params, request.method);

    if (!params.path) { return new Response('Path cannot be empty.', { status: 400 }); }

    const method: Method = request.method as Method;
    const path: string = params.path;

    const endpoint = endpoints.find(i => i.method === method && i.path === path);
    if (!endpoint) { return new Response('The specified endpoint could not be found.', { status: 404 }); }

    // Conditional IF logic here, else return 404 also

    const conditional = endpoint.conditionals[0];
    switch(conditional.then.how) {
        case 'RETURN':
            switch(conditional.then.what) {
                case 'DB':
                    const model = models.find(i => i.id === endpoint.modelId);
                    if (!model) { return new Response(`The specified model ${endpoint.modelId} could not be found.`, { status: 500 }); }
                    switch(conditional.then.where) {
                        case 'ALL':
                            return response(model.data);
                        case 'INDEX':
                            if (!conditional.then.whereData) { return new Response(`The specified model ${endpoint.modelId} could not be found.`, { status: 500 }); }
                            if (Number.isNaN(conditional.then.whereData)) { return new Response(`The specified index ${conditional.then.whereData} is not a number.`, { status: 500 }); }
                            const index = model.data[parseInt(conditional.then.whereData)]
                            if (!index) { return new Response(`The specified index ${conditional.then.whereData} does not exist.`, { status: 404 }); }
                            return response(index);
                        case 'PARAM':

                            break;
                    }
                    break;
                case 'BODY':
                    // body
                    break;
                case 'ERROR':
                    // whereData
                    break;
                case 'OBJECT':
                    // whereData
                    break;
            }
            break;
        case 'PUSH':
            switch(conditional.then.what) {
                case 'BODY':
                    break;
                case 'OBJECT':
                    // whereBody
                    break;
            }
            break;
        case 'UPDATE':
            switch(conditional.then.what) {
                case 'BODY':
                    break;
                case 'OBJECT':
                    // whereBody
                    break;
            }
            break;
        case 'DELETE':
            switch(conditional.then.what) {
                case 'DB':
                    switch(conditional.then.where) {
                        case 'ALL':
                            break;
                        case 'INDEX':
                            break;
                        case 'PARAM':
                            break;
                    }
                    break;
            }
            break;
    }

    return new Response(`The specified conditional could not be found.`, { status: 500 });
}