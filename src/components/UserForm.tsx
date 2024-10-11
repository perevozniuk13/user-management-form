import '../styles/UserFormStyles.css';

import { Button } from 'primereact/button';    
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FormEvent, useState } from 'react';

import { User } from '../types/userFormTypes';

const genders = ['Female', 'Male', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']


export default function UserForm() : JSX.Element {
    const [formData, setFormData] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        age: 0,
        gender: '',
        birthDate: new Date(),
        bloodGroup: '',
        height: undefined,
        weight: undefined,
        address: {
            address: '',
            city: '',
            state: ''
        }

    })

    const handleInputChange = (key : string, value: string | number | Date | null | undefined) => {
        console.log(key)
        if (key === 'address' || key === 'city' || key === 'state') {
            setFormData({...formData, address: {...formData.address, [key]: value}})
        } else {
            setFormData({...formData, [key]: value}) 
        }
    }

    const handleFormSubmit = (e : FormEvent) => {
        e.preventDefault();
        console.log("Form submitted!")
    }

    console.log(formData)

    return <form onSubmit={(e) => handleFormSubmit(e)} className="user-form">
        <div className="left-container">
            <div className="form-section">
                <h2>Personal Information</h2>

                <div className="form-row">
                    <InputText value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} placeholder='First Name'/>
                    <InputText value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} placeholder='Last Name' />
                </div>

                <InputText value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder='Email' />
                <div className="form-row">
                    <InputText value={formData.username} onChange={(e) => handleInputChange('username', e.target.value)} placeholder='Username' />
                    <InputText value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder='Phone' />
                </div>

            </div>

            <div className="form-section">
                <h2>Address</h2>

                <InputText value={formData.address.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder='Address'/>
                <div className="form-row">
                    <InputText value={formData.address.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder='City'/>
                    <InputText value={formData.address.state} onChange={(e) => handleInputChange('state', e.target.value)} placeholder='State'/>
                </div>

                
            </div>
        </div>

        <div className="right-container">
            <div className="form-section">
                <h2>Demographics & physical information</h2>

                <div className="form-row">
                    <Dropdown value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} placeholder='Gender' options={genders}/>
                    <Calendar value={formData.birthDate} onChange={(e) => handleInputChange('birthDate', e.value)} dateFormat="dd/mm/yy" placeholder='dd/mm/yy'/>
                    <InputNumber value={formData.age} onValueChange={(e) => handleInputChange('age', e.value)}  placeholder='Age'/>
                </div>

                <div className="form-row">
                    <InputNumber value={formData.height} onValueChange={(e) => handleInputChange('height', e.value)}  placeholder='Height' suffix=' cm'/>
                    <InputNumber value={formData.weight} onValueChange={(e) => handleInputChange('weight', e.value)} placeholder='Weight' suffix=' kg'/>
                    <Dropdown value={formData.bloodGroup} onChange={(e) => handleInputChange('bloodGroup', e.target.value)}  placeholder='Blood Group' options={bloodGroups}/>
                </div>
                
            </div>

        </div>

        <Button type='submit'>Submit</Button>
    </form>
}