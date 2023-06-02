import React from 'react'
import {useNavigate } from "react-router-dom";
import {useState} from 'react'
import { Control, useForm, useWatch } from "react-hook-form";
import { authenticationService} from '../services/authenticationService';



const Login = () => {

  const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtuZ_-EzNC5bwD2w9U24xVZbLGx53iAw4';

  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState(false);

  function navigateToHome() {
    navigate("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();


  const handleLogin = async (data, event) => {
    event.preventDefault();
    
    let email = data.email;
    let password = data.password;

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
            setErrorLogin(true)
          } else {
            authenticationService.setUser(data.email)
            window.sessionStorage.setItem("email", data.email);
          setErrorLogin(false)
          navigateToHome();
        }
       }
      );

    } catch(err){
      setErrorLogin(true)
    }
   

  }


  return (
    <div className="container">
      <div className="form-box">
        {errorLogin === true && (
          <div className='alert alert-danger'>
              <p className='text-danger'>Invalid credentials</p>
          </div>
        )}
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label>Email</label>
          <input type="email" className='form-control' email="true" id="email" name="email"  {...register("email", { required: true })}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" className='form-control' id="password" name="password"  {...register("password", { required: true })}/>
        </div>
        <button type="submit" className='btn btn-primary btn-width'>Login</button>
      </form>
      </div>
    </div>
  )
}

export default Login
