import React from 'react'
import {useNavigate } from "react-router-dom";
import {useState} from 'react';
import { Control, useForm, useWatch } from "react-hook-form";
import { data } from 'jquery';


const Registration = () => {

  const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtuZ_-EzNC5bwD2w9U24xVZbLGx53iAw4';

  const navigate = useNavigate();

  const [errorRegister, setErrorRegister] = useState(null);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  function navigateToLogin() {
    navigate("/login");
  }

    const handleRegister = async (data, event) => {
      event.preventDefault();
      console.log(data)

      let email = data.email;
      let password = data.password;
      let confirmPassword = data.confirmPassword;

      if(password === confirmPassword) {
        try {
          let user = {email: email, password: password, returnSecureToken: true};
  
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            accept: 'application/json',
            body: JSON.stringify(user)
        };
        const response = await fetch(`${API_URL}`, requestOptions);
        await response.json().then(
          (data) =>     {
            if(data.error !== undefined) {
            setErrorRegister(data.error.message)
          } else {
            setErrorRegister(null)
            navigateToLogin();
          }
         }
        );

      } catch(err){
        setErrorRegister(err.error.message)
      }
     
      } else {
        setErrorRegister("Passwords are not same")
      }
    }
 

  return (
    <div className="container">
      <div className="form-box">
      {errorRegister != null && (
        <div className="alert alert-danger">
          <p>{errorRegister}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>
          <label>Email</label>
          <input type="email" id="email" name="email" className='form-control' email="true" {...register("email", { required: true })}/>
          <p>{data.email}</p>
          {errors.email && (
            <span className="text-danger">Email is required</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" name="password" className='form-control' {...register("password", { required: {value: true, message: "Confirm password is required"}, minLength: {
              value: 6,
              message: "Confirm password needs to have atleast 6 letters"
            }, maxLength: {
              value: 50,
              message: "Confirm password needs to have less than or equal to 50 letters"
            } })}/>
                  {errors.password?.message && (
            <span className="text-danger">{errors.password?.message}</span>
          )}
        </div>
        <div>
          <label>Confirm password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className='form-control' {...register("confirmPassword", { required: {value: true, message: "Confirm password is required"}, minLength: {
              value: 6,
              message: "Confirm password needs to have atleast 6 letters"
            }, maxLength: {
              value: 50,
              message: "Confirm password needs to have less than or equal to 50 letters"
            },  validate: (value) => {
              const { password } = getValues();
              return password === value || "Passwords should match!";
            } })}/>
          {errors.confirmPassword?.message && (
            <span className="text-danger">{errors.confirmPassword?.message}</span>
          )}
        </div>
        <button type="submit"  className='btn btn-primary btn-width'>Registration</button>
      </form>
      </div>
    </div>
  )
}

export default Registration
