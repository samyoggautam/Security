import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import '../styles/login.css'
import { BASE_URL } from '../utils/config'

const Register = () => {
   function checkPassword(password) {
      // Define the minimum and maximum password length
      const minLength = 8;
      const maxLength = 12;
    
      // Regular expressions for character types
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /\d/;
      const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    
      // Check password length
      if (password.length < minLength || password.length > maxLength) {
        return "Password must be between " + minLength + " and " + maxLength + " characters long.";
      }
      // Check password complexity
      if (!uppercaseRegex.test(password)) {
        return "Password must include at least one uppercase letter.";
      }
    
      if (!lowercaseRegex.test(password)) {
        return "Password must include at least one lowercase letter.";
      }
    
      if (!numberRegex.test(password)) {
        return "Password must include at least one number.";
      } 
      if (!specialCharRegex.test(password)) {
        return "Password must include at least one special character (!, @, #, $, etc.).";
      }
      return "Password is valid!";
    }

   const [credentials, setCredentials] = useState({
      userName: undefined,
      email: undefined,
      password: undefined
   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async e => {
      const result = checkPassword(credentials.password);
      if (result) {
         return alert(result)
      }  

      e.preventDefault()

      try {
         const res = await fetch(`${BASE_URL}/auth/register`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            body: JSON.stringify(credentials)
         })
         const result = await res.json()

         if(!res.ok) alert(result.message)

         dispatch({type:'REGISTER_SUCCESS'})
         navigate('/login')
      } catch(err) {
         alert(err.message)
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register