import '../styles/UserFormStyles.css';

import { Button } from 'primereact/button';    
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FormEvent, useEffect, useState } from 'react';
import { fetchUser, createUser, updateUser } from '../api/userService';
import { FloatLabel } from 'primereact/floatlabel';
import { validate } from '../utils/utilityFunctions';
import { genders, bloodGroups, defaultFormData, defaultValidationErrors } from '../utils/utilityVars';




import { User, ButtonText, ValidationErrors, ApiError } from '../types/userFormTypes';
import { useParams } from 'react-router-dom';


export default function UserForm() : JSX.Element {
    const { userId } = useParams<{ userId: string }>();

    const [formData, setFormData] = useState<User|null>(null)
    const [buttonText, setButtonText] = useState<ButtonText>('Create User');
    const [errors, setErrors] = useState<ValidationErrors>(defaultValidationErrors);
    const [apiError, setApiError] = useState<ApiError>({response: {data: {message:''}}});

    useEffect(() => {
        if (userId) {
            fetchUser(userId).then((data : User | null) => {
                setFormData(data);
                setButtonText('Update User');
            }).catch((error : ApiError) => {
                setFormData(defaultFormData);
                setApiError(error);
            });
        } else {
            setFormData(defaultFormData);
        }
    }, [])

    if (apiError.response.data.message) {
        return <h1 style={{fontSize: "30px", marginTop: '50px'}}>Error sending request: {apiError.response.data.message}</h1>
    }

    if (!formData) {
        return <form  className="user-form">
            <ProgressSpinner/>
        </form>
    }

    const checkErrors = () => {
        if (formData === defaultFormData) {
            return true
        }
        return Object.values(errors).some(value => value !== '');
    }
    const validateInput = (key: string, value : string | number | Date | null | undefined) => {
        const inputValidationError = validate(key, value);
        if (inputValidationError) {
            setErrors({...errors, [key]: inputValidationError});
        } else {
            setErrors({...errors, [key]: ''})
        }
    }



    const handleInputChange = (key : string, value: string | number | Date | null | undefined) => {
        
        if (key === 'address' || key === 'city' || key === 'state') {
            setFormData({...formData, address: {...formData.address, [key]: value}})
        } else {
            setFormData({...formData, [key]: value}) 
        }

        validateInput(key, value);
    }

    const handleFormSubmit = (e : FormEvent) => {
        e.preventDefault(); 

        if (buttonText === 'Create User') {
            createUser(formData).then((createdUserData : User | null) => {
                setFormData(createdUserData);
            }).catch(() => {
                console.log("Error creating the user!")
            })
        } else if (buttonText === 'Update User' && userId) {
            updateUser(userId, formData).then((updatedUserData : User | null) => {
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
                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}><i className='pi pi-user' style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> <h2>Personal Information</h2></div>
               

                <div className="form-row">
                    <div className='input-container'> 
                    <FloatLabel>
                        <InputText className={`input ${errors.firstName ? 'p-invalid' : ''}`} id="firstName" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} onBlur={(e) => {validateInput('firstName', e.target.value)}}/>
                        <label htmlFor="firstName">First Name</label>
                    </FloatLabel>
                    <p className='error'>{errors.firstName}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                    <InputText  className={`input ${errors.lastName ? 'p-invalid' : ''}`} id='lastName' value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} onBlur={(e) => {validateInput('lastName', e.target.value)}}/>
                    <label htmlFor="lastName">Last Name</label>
                    </FloatLabel>
                    <p className='error'>{errors.lastName}</p>
                    </div>
                
                </div>

                <div className='input-container input--wide'>
                <FloatLabel>
                    <InputText id='email' className={`input ${errors.email ? 'p-invalid' : ''}`} value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} onBlur={(e) => {validateInput('email', e.target.value)}}/>
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <p className='error'>{errors.email}</p>
                </div>


                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <InputText id='username' className={`input ${errors.username ? 'p-invalid' : ''}`} value={formData.username} onChange={(e) => handleInputChange('username', e.target.value)} onBlur={(e) => {validateInput('username', e.target.value)}}/>
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                    <p className='error'>{errors.username}</p>
                    </div>
                    
                    <div className='input-container'>
                    <FloatLabel>
                        <InputMask id='phone' className={`input ${errors.phone ? 'p-invalid' : ''}`} value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} mask='+99 999-999-9999' onBlur={(e) => {validateInput('phone', e.target.value)}}></InputMask>
                        <label htmlFor="phone">Phone</label>
                    </FloatLabel>
                    <p className='error'>{errors.phone}</p>
                    </div>
                </div>

            </div>

            <div className="form-section">
                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}><i className='pi pi-map-marker' style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> <h2>Address</h2></div>

                <div className='input-container input--wide'>
                <FloatLabel>
                    <InputText id='address' className={`input ${errors.address ? 'p-invalid' : ''}`} value={formData.address.address} onChange={(e) => handleInputChange('address', e.target.value)} onBlur={(e) => {validateInput('address', e.target.value)}}/>
                    <label htmlFor="address">Adress</label>
                </FloatLabel>
                <p className='error'>{errors.address}</p>
                </div>

                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <InputText id='city' className={`input ${errors.city ? 'p-invalid' : ''}`} value={formData.address.city} onChange={(e) => handleInputChange('city', e.target.value)} onBlur={(e) => {validateInput('city', e.target.value)}}/>
                        <label htmlFor="city">City</label>
                    </FloatLabel>
                    <p className='error'>{errors.city}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <InputText id='state' className={`input ${errors.state ? 'p-invalid' : ''}`} value={formData.address.state} onChange={(e) => handleInputChange('state', e.target.value)} onBlur={(e) => {validateInput('state', e.target.value)}}/>
                        <label htmlFor="state">State</label>
                    </FloatLabel>
                    <p className='error'>{errors.state}</p>
                    </div>
                </div>

                
            </div>
        </div>

        <div className="right-container">
            <div className="form-section">
                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}><i className='pi pi-info-circle' style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> <h2>Demographics & physical information</h2></div>

                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <Dropdown id='gender' className={`input ${errors.gender ? 'p-invalid' : ''}`} value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} options={genders} onBlur={(e) => {validateInput('gender', e.target.value)}}/>
                        <label htmlFor="gender">Gender</label>
                    </FloatLabel>
                    <p className='error'>{errors.gender}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <Calendar id='birthDate' className={`input ${errors.birthDate ? 'p-invalid' : ''}`} value={formData.birthDate ? new Date(formData.birthDate) : null} onChange={(e) => handleInputChange('birthDate', e.value)} dateFormat="yy-mm-dd" placeholder='yyyy-mm-dd' showIcon onBlur={(e) => {validateInput('birthDate', e.target.value)}}/>
                        <label htmlFor="birthDate">Birth Date</label>
                    </FloatLabel>
                    <p className='error'>{errors.birthDate}</p>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='input-container'>
                    <FloatLabel>
                        <InputNumber id='age' className={`input ${errors.age ? 'p-invalid' : ''}`} value={formData.age || null} onValueChange={(e) => handleInputChange('age', e.value)} onBlur={(e) => {validateInput('age', e.target.value)}}/>
                        <label htmlFor="age">Age</label>
                    </FloatLabel>
                    <p className='error'>{errors.age}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <Dropdown id='bloodGroup' className={`input ${errors.bloodGroup ? 'p-invalid' : ''}`} value={formData.bloodGroup} onChange={(e) => handleInputChange('bloodGroup', e.target.value)} options={bloodGroups} onBlur={(e) => {validateInput('bloodGroup', e.target.value)}}/>
                        <label htmlFor="bloodGroup">Blood Group</label>
                    </FloatLabel>
                    <p className='error'>{errors.bloodGroup}</p>
                    </div>
                </div>

                <div className="form-row">
                    <div className='input-container'>
                    <FloatLabel>
                        <InputNumber id='height' className={`input ${errors.height ? 'p-invalid' : ''}`} value={formData.height || null} onValueChange={(e) => handleInputChange('height', e.value)} suffix=' cm' onBlur={(e) => {validateInput('height', e.target.value)}}/>
                        <label htmlFor="heigt">Height, cm</label>
                    </FloatLabel>
                    <p className='error'>{errors.height}</p>
                    </div>

                    <div className='input-container'>
                    <FloatLabel>
                        <InputNumber id='weight' className={`input ${errors.weight ? 'p-invalid' : ''}`} value={formData.weight || null} onValueChange={(e) => handleInputChange('weight', e.value)} suffix=' kg' onBlur={(e) => {validateInput('weight', e.target.value)}}/>
                        <label htmlFor="weight">Weight, kg</label>
                    </FloatLabel>
                    <p className='error'>{errors.weight}</p>
                    </div>
                </div>
                
            </div>

        </div>

        <Button type='submit' className='form-button' disabled={checkErrors()}>{buttonText}</Button>
    </form>
}