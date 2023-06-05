import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/user/login', {
          email: inputs.email, password: inputs.password
      });
      if(data.success){
        // localStorage.setItem('userID', data?.user._id);
        alert(`you're login to ${data?.user.email}`)
          navigate('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container'> 
    <Form onSubmit={handleSubmit}>
    <h2 style={{color: '#fff', fontWeight: 'bold'}}>WELCOME TO ASG PLATFORM</h2>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email</Form.Label>
        <Form.Control name='email' value={inputs.email} onChange={handleChange} type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' value={inputs.password} onChange={handleChange}  type="password" placeholder="password" />
      </Form.Group>  
      <Button type='submit'>login</Button>
      <div>
        <Link to={'/'} style={{textDecoration: 'none', color: '#000'}}>Don't have an account? Register</Link>
      </div>
    </Form>
    </div>
  );
}

export default Login;