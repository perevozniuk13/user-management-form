import { Nullable } from "primereact/ts-helpers";

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    phone: string,
    age: number,
    gender: string,
    birthDate: string,
    bloodGroup: string,
    height: number,
    weight: number,
    address: {
        address: string,
        city: string,
        state: string
    }
}

export interface ValidationErrors {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    phone: string,
    age: string,
    gender: string,
    birthDate: string,
    bloodGroup: string,
    height: string,
    weight: string,
    address: string,
    city: string,
    state: string
}

export type InputType = string | number| Date | null | undefined | Nullable<string> | Nullable<Date>

export type ButtonText = 'Create User' | 'Update User';

export type ApiError = {
    response: {
        data: {
            message: string
        }
    }
}