export interface UserModal {
    name: string,
    surname: string,
    email: string,
    message?:string,
    user?: {
        name: string,
        surname: string,
        email: string
    }
}