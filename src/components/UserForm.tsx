import '../styles/UserFormStyles.css';

import { Button } from 'primereact/button';    
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FormEvent, useEffect, useState } from 'react';
import { fetchUser, createUser, updateUser } from '../api/userService';
import { useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { validate } from '../utils/utilityFunctions';




import { User, ButtonText, ValidationErrors } from '../types/userFormTypes';
import { useParams } from 'react-router-dom';

const genders = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Other', value: 'other' }
];

const bloodGroups = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' }
];

export default function UserForm() : JSX.Element {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<User|null>(null)
    const [buttonText, setButtonText] = useState<ButtonText>('Create User');
    const [errors, setErrors] = useState<ValidationErrors>({
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
    })

    useEffect(() => {
        if (userId) {
            fetchUser(userId).then((data : User) => {
                setFormData(data);
                setButtonText('Update User');
            }).catch(() => {
                setFormData({
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
            
                });
                navigate('/');
            });
        } else {
            setFormData({
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
        
            })
        }
    }, [])

    if (!formData) {
        return <>Loading...</>
    }


    const handleInputChange = (key : string, value: string | number | Date | null | undefined) => {
        console.log(key)

        const inputValidationError = validate(key, value);
        console.log("val err", inputValidationError);
        if (inputValidationError) {
            setErrors({...errors, [key]: inputValidationError});
        } else {
            setErrors({...errors, [key]: ''})
        }

        if (key === 'address' || key === 'city' || key === 'state') {
            setFormData({...formData, address: {...formData.address, [key]: value}})
        } else {
            setFormData({...formData, [key]: value}) 
        }
    }

    const handleFormSubmit = (e : FormEvent) => {
        e.preventDefault();

        if (buttonText === 'Create User') {
            createUser(formData).then((createdUserData : User) => {
                setFormData(createdUserData);
            }).catch(() => {
                console.log("Error creating the user!")
            })
        } else if (buttonText === 'Update User' && userId) {
            updateUser(userId, formData).then((updatedUserData : User) => {
                setFormData(updatedUserData);
            }).catch(() => {
                console.log("Error updating the user!")
            })
        }
        console.log("Form submitted!")
    }

    console.log(formData)
    console.log("errors", errors)

    return <form onSubmit={(e) => handleFormSubmit(e)} className="user-form">
        <div className="left-container">
            <div className="form-section">
                <h2>Personal Information</h2>

                <div className="form-row">
                    <div className='input-container'> 
                    <FloatLabel>
                        <InputText className={`input ${errors.firstName ? 'p-invalid' : ''}`} id="firstName" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)}/>
                        <label htmlFor="firstName">First Name</label>
                    </FloatLabel>
                    <p className='error'>{errors.firstName}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                    <InputText  className={`input ${errors.lastName ? 'p-invalid' : ''}`} id='lastName' value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                    <label htmlFor="lastName">Last Name</label>
                    </FloatLabel>
                    <p className='error'>{errors.lastName}</p>
                    </div>
                
                </div>

                <div className='input-container input--wide'>
                <FloatLabel>
                    <InputText id='email' className={`input ${errors.email ? 'p-invalid' : ''}`} value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <p className='error'>{errors.email}</p>
                </div>


                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <InputText id='username' className={`input ${errors.username ? 'p-invalid' : ''}`} value={formData.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                    <p className='error'>{errors.username}</p>
                    </div>
                    
                    <div className='input-container'>
                    <FloatLabel>
                        <InputText id='phone' className={`input ${errors.phone ? 'p-invalid' : ''}`} value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                        <label htmlFor="phone">Phone</label>
                    </FloatLabel>
                    <p className='error'>{errors.username}</p>
                    </div>
                </div>

            </div>

            <div className="form-section">
                <h2>Address</h2>

                <div className='input-container input--wide'>
                <FloatLabel>
                    <InputText id='address' className={`input ${errors.address ? 'p-invalid' : ''}`} value={formData.address.address} onChange={(e) => handleInputChange('address', e.target.value)}/>
                    <label htmlFor="address">Adress</label>
                </FloatLabel>
                <p className='error'>{errors.address}</p>
                </div>

                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <InputText id='city' className={`input ${errors.city ? 'p-invalid' : ''}`} value={formData.address.city} onChange={(e) => handleInputChange('city', e.target.value)}/>
                        <label htmlFor="city">City</label>
                    </FloatLabel>
                    <p className='error'>{errors.city}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <InputText id='state' className={`input ${errors.state ? 'p-invalid' : ''}`} value={formData.address.state} onChange={(e) => handleInputChange('state', e.target.value)}/>
                        <label htmlFor="state">State</label>
                    </FloatLabel>
                    <p className='error'>{errors.state}</p>
                    </div>
                </div>

                
            </div>
        </div>

        <div className="right-container">
            <div className="form-section">
                <h2>Demographics & physical information</h2>

                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <Dropdown id='gender' className={`input ${errors.gender ? 'p-invalid' : ''}`} value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} options={genders}/>
                        <label htmlFor="gender">Gender</label>
                    </FloatLabel>
                    <p className='error'>{errors.gender}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <Calendar id='birthDate' className={`input ${errors.birthDate ? 'p-invalid' : ''}`} value={formData.birthDate ? new Date(formData.birthDate) : null} onChange={(e) => handleInputChange('birthDate', e.value)} dateFormat="yy-mm-dd" placeholder='yyyy-mm-dd' showIcon/>
                        <label htmlFor="birthDate">Birth Date</label>
                    </FloatLabel>
                    <p className='error'>{errors.birthDate}</p>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='input-container'>
                    <FloatLabel>
                        <InputNumber id='age' className={`input ${errors.age ? 'p-invalid' : ''}`} value={formData.age || null} onValueChange={(e) => handleInputChange('age', e.value)}/>
                        <label htmlFor="age">Age</label>
                    </FloatLabel>
                    <p className='error'>{errors.age}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <Dropdown id='bloodGroup' className={`input ${errors.bloodGroup ? 'p-invalid' : ''}`} value={formData.bloodGroup} onChange={(e) => handleInputChange('bloodGroup', e.target.value)} options={bloodGroups}/>
                        <label htmlFor="bloodGroup">Blood Group</label>
                    </FloatLabel>
                    <p className='error'>{errors.bloodGroup}</p>
                    </div>
                </div>

                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <InputNumber id='height' className={`input ${errors.height ? 'p-invalid' : ''}`} value={formData.height || null} onValueChange={(e) => handleInputChange('height', e.value)} suffix=' cm'/>
                        <label htmlFor="heigt">Height</label>
                    </FloatLabel>
                    <p className='error'>{errors.height}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <InputNumber id='weight' className={`input ${errors.weight ? 'p-invalid' : ''}`} value={formData.weight || null} onValueChange={(e) => handleInputChange('weight', e.value)} suffix=' kg'/>
                        <label htmlFor="weight">Weight</label>
                    </FloatLabel>
                    <p className='error'>{errors.weight}</p>
                    </div>
                </div>
                
            </div>

        </div>

        <Button type='submit' className='form-button'>{buttonText}</Button>
    </form>
}