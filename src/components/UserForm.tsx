import '../styles/UserFormStyles.css';

import { Button } from 'primereact/button';    
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const genders = ['Female', 'Male', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']


export default function UserForm() : JSX.Element {
    return <div className="user-form">
        <div className="left-container">
            <div className="form-section">
                <h2>Personal Information</h2>

                <div className="form-row">
                    <InputText placeholder='First Name'/>
                    <InputText placeholder='Last Name' />
                </div>

                <InputText placeholder='Email' />
                <div className="form-row">
                    <InputText placeholder='Username' />
                    <InputText placeholder='Phone' />
                </div>

            </div>

            <div className="form-section">
                <h2>Address</h2>

                <InputText placeholder='Address'/>
                <div className="form-row">
                    <InputText placeholder='City'/>
                    <InputText placeholder='State'/>
                </div>

                
            </div>
        </div>

        <div className="right-container">
            <div className="form-section">
                <h2>Demographics & physical information</h2>

                <div className="form-row">
                    <Dropdown placeholder='Gender' options={genders}/>
                    <Calendar dateFormat="dd/mm/yy" placeholder='dd/mm/yy'/>
                    <InputNumber placeholder='Age'/>
                </div>

                <div className="form-row">
                    <InputNumber placeholder='Height' suffix=' cm'/>
                    <InputNumber placeholder='Weight' suffix=' kg'/>
                    <Dropdown placeholder='Blood Group' options={bloodGroups}/>
                </div>
                
            </div>

        </div>

        <Button>Submit</Button>
    </div>
}