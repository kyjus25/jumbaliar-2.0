import { defineEventHandler } from 'h3';
export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export interface Model {
    id: number;
    name: string;
    type: object;
    editable: boolean;
    data: any[]
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

const models: Model[] = [
    {
        id: 1,
        name: "Endpoints",
        editable: false,
        type: {},
        data: [
            {
                id: 1,
                // authenticated: false,
                modelId: 2,
                method: Method.GET,
                path: '/users',
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
            },
            {
                id: 2,
                // authenticated: false,
                modelId: 3,
                method: Method.GET,
                path: '/models',
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
        ]
    },
    {
        id: 2,
        name: "Users",
        editable: false,
        type: {},
        data: [
            {
                id: 1,
                firstName: 'Justin',
                lastName: 'White',
                username: 'juwhite'
            },
            {
                id: 2,
                firstName: 'Trey',
                lastName: 'Russel',
                username: 'trussel'
            }
        ]
    },
    {
        id: 3,
        name: "Models",
        editable: false,
        type: {},
        data: [
            {id: 1, name: "Endpoints", editable: false},
            {id: 2, name: "Users", editable: false},
            {id: 3, name: "Models", editable: false},
        ]
    },
];

export default defineEventHandler((event) => {

    const response = (body: object | string = [], status: number = 200) => {
        event.node.res.statusCode = status;
        return body;
    }

    if (!event.path) { return response('Path cannot be empty.', 400); }

    const method = event.node.req.method as Method;
    const url: URL = new URL(`https://example${event.path}`)
    const path: string = url.pathname;

    const endpointModel = models.find(i => i.name === 'Endpoints');
    if (!endpointModel) { return response('The specified endpoint could not be found.', 404); }
    const endpoint = endpointModel.data.find(i => i.method === method && i.path === path);
    if (!endpoint) { return response('The specified endpoint could not be found.', 404); }

    // Conditional IF logic here, else return 404 also

    const conditional = endpoint.conditionals[0];
    switch(conditional.then.how) {
        case 'RETURN':
            switch(conditional.then.what) {
                case 'DB':
                    const model = models.find(i => i.id === endpoint.modelId);
                    if (!model) { return response(`The specified model ${endpoint.modelId} could not be found.`, 500); }
                    switch(conditional.then.where) {
                        case 'ALL':
                            return response(model.data);
                        case 'INDEX':
                            if (!conditional.then.whereData) { return response(`The specified model ${endpoint.modelId} could not be found.`, 500); }
                            if (Number.isNaN(conditional.then.whereData)) { return response(`The specified index ${conditional.then.whereData} is not a number.`, 500); }
                            const index = model.data[parseInt(conditional.then.whereData)]
                            if (!index) { return response(`The specified index ${conditional.then.whereData} does not exist.`, 404); }
                            return response(index);
                        case 'PARAM':
                            const params = Array.from(url.searchParams);
                            if (Object.keys(params).length === 0) { return response(`No params to filter by.`, 400); }
                            let payload = model.data;
                            params.forEach(([key, value]) => {
                                payload = payload.map(i => i as any).filter(i => i[key] == value);
                            })
                            if (payload.length === 0) { return response(`No data matching the query.`, 404); }
                            return response(payload);
                    }
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
});