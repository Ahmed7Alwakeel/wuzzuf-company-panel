export interface User {
    userId: string,
    firstName: string,
    lastName: string,
    middleName:string,
    mobile: string,
    altMobile:string,
    email: string,
    maritalStatus: string,
    militarySatus: string,
    nationality: string,
    title: string,
    postalCode:string,
    carOwn:string,
    relocation:string,
    birthDate: {
        day: string,
        month: string,
        year: string
    },
    gender: string,
    cvPath: string,

}
