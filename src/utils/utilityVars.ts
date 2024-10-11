export const genders = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Other', value: 'other' }
];

export const bloodGroups = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' }
];

export const defaultFormData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    age: 0,
    gender: '',
    birthDate: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    address: {
        address: '',
        city: '',
        state: ''
    }

}

export const defaultValidationErrors = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    age: '',
    gender: '',
    birthDate: '',
    bloodGroup: '',
    height: '',
    weight: '',
    address: '',
    city: '',
    state: ''
}