export function validate(key: string, input: string | number| Date | null | undefined) {
    console.log("keyyy", key)
    if (!input || /^ *$/.test(input as string)) {
        return '* Required'
    } 
    
    if (key === "email") {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input as string)) {
            return 'Email is not valid!'
        }
    } 
    
    if (key === "firstName" || key ===  "lastName" || key === "username" || key === "address" || key === "city" || key === "state"){
        if ((input as string).length < 3) {
            return "Must me at least 3 characters long!"
        }
    }  
    
    if (key === "firstName" || key === "lastName" || key === "city" || key === "state"){
        if (!/^[a-zA-Z\-]+$/.test(input as string) ) {
            return "Numbers and special characters are not allowed!"
        }
    } 

    return ''
}