import { Method } from "./method.type";

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