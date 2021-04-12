import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import * as Input from '../Input'
import {useFormValidation } from "../../../lib/hooks/useFormValidation"
import useAuthentication from "../../../lib/hooks/useAuthentication"
import { useDispatch } from "react-redux"

const Alert = ({ isVisible }) => (
	isVisible &&
	<div className="alert alert-info mt-3">
		<p className="icontext"><i className="icon text-primary fa fa-thumbs-up"></i>User successfully created</p>
    </div>
)
const ErrorMessage = ({ error }) => (
	error && 
	<div className="alert alert-danger mt-3">
		<p className="icontext]" style={{ color: 'crimson' }}><i className="icon text-danger fas fa-exclamation-circle"></i> {' '}{error?.error}</p>
    </div>
)

const defaultValues = {
	first: 'Robin' ,
	last: 'Crochet' ,
	email: 'crochetrobin@gmail.com' ,
	gender: 'Male' ,
	city: 'Velaux' ,
	password: '123456' ,
	confirm_password: '123456' 
}
const options = ['France', 'Russie', 'United Kingdom', 'United States', 'Allemagne']

const Register = ({history}) => {
	const dispatch = useDispatch();
	const  {handleUserRegistration} = useAuthentication(dispatch);
	const {formValues, validate, register, handleOnChange, isValid} = useFormValidation({formName:'register'});
	const {first,last, email, city, country, gender, password, confirm_password} = formValues['register'] ?? {};


useEffect (() => { register(defaultValues);
},[]);
useEffect (() => { validate(formValues['register'] ?? {});
},[formValues]);

const handleOnSubmit =(e) => {
	e.preventDefault();
	const newUser = {
		first,
		last,
		email,
		city,
		country,
		gender,
		password,
		confirm_password,
	};
	handleUserRegistration(newUser).then(() => {
		console.log('user successfully register')
		setTimeout(() => history.push("/"), 2000);
	});
};

	return (
	<>
    <div className="card mx-auto" style={{maxWidth:'520px', marginTop:'140px'}} >
      <article className="card-body">
			<header className="mb-4"><h4 className="card-title">Sign up</h4></header>
			{/* feedback et message d'erreurs */}
 			<form name="register" onSubmit={handleOnSubmit}>
				<div className="form-row">
					<Input.Text label="First Name" name='first' value={first} onChange={handleOnChange} />
					<Input.Text label="Label Name" name='last' value={last}  onChange={handleOnChange} /> 
				</div> 
				<div className="form-group">
					<Input.Email label="Email" value={email} style={{padding: 0}} onChange={handleOnChange}/>
				</div> 
				<div className="form-group">
					<Input.Radio name="gender" label="Male" value={gender} onChange={handleOnChange} />
					<Input.Radio name="gender" label="Female" value={gender} onChange={handleOnChange} />
				</div> 
				<div className="form-row">
					<Input.Text name='city' label="City" value={city} onChange={handleOnChange} col="6"  />
					<Input.Select name='country' options={options} value={country} label="Country" col="6" onChange={handleOnChange}/>
				</div> 	
				
				<div className="form-row">	
					<Input.Password label="Create password" value={password} style={{padding: 0}} col="6" onChange={handleOnChange} />
					<Input.ConfirmPassword label="Repeat password" value={confirm_password} style={{padding: 0}} col="6" onChange={handleOnChange} />
				</div>
				<div className="form-group">
					<Input.Submit 
					classNames="btn-primary btn-block" 
					title="Register"
					disable={!isValid} 
					/> 
			    </div>              
			</form>
		</article>
    </div>
    <p className="text-center mt-4">Have an account? <Link to='/login'>Log In</Link></p>
    <br /><br /><br />
</>
)}
export default Register