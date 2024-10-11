export function validate(key: string, input: string | number| Date | null | undefined) {
    if (!input || /^ *$/.test(input as string)) {
        return '* Required'
    } else if (key === "email") {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input as string)) {
            return 'Email is not valid!'
        }
    } else {
        return ''
    }
}