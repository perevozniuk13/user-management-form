export interface User {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    phone: string,
    age: number,
    gender: string,
    birthDate: Date,
    bloodGroup: string,
    height: number | undefined,
    weight: number | undefined,
    address: {
        address: string,
        city: string,
        state: string
    }
}