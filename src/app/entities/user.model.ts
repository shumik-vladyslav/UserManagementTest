export enum Role {
    ADMIN = 'Admin',
    USER = 'User'
}

export interface IUser {
    firstName: string
    lastName: string
    email:string
    phone: string
    birthdate: Date
    role: Role
    password?: string
}
