import config from '../config/config';
import { GetObjResponse, GetArrayResponse } from '../config/types';

export function arrayResponse<T>(categories: T[]): GetArrayResponse<T> {
    const response: GetArrayResponse<T> = {
        responseCode: config.ARRAY_RESPONSE_CODE,
        entities: categories
    };

    return response;
}

export function objResponse<T>(catagory: T): GetObjResponse<T> {
    const response: GetObjResponse<T> = {
        responseCode: config.OBJ_RESPONSE_CODE,
        entity: catagory
    };

    return response;
}
