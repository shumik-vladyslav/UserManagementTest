export enum Role {
    Admin = 'Admin',
    User = 'User'
}

export interface User {
    firstName: string
    lastName: string
    Phone: string
    Email:string
    birthdate: Date
    role: Role
}
