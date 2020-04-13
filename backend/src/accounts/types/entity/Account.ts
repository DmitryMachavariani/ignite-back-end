import {IBaseEntity} from "../../../nedb/entity";

export interface Account extends IBaseEntity {
    address: string,
    privateKey: string,
    default: boolean
}
