import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import './styles.css';
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInputs((prevent) => ({
            ...prevent,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:8080/api/v1/user/register', {
                username: inputs.name, email: inputs.email, password: inputs.password
            });
            if(data.success){
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='container'> 
    <Form onSubmit={handleSubmit}>
    <h2 style={{color: '#fff', fontWeight: 'bold'}}>WELCOME TO ASG PLATFORM</h2>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control name='name' onChange={handleChange} value={inputs.name} type="text" placeholder="name"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email</Form.Label>
        <Form.Control name='email' onChange={handleChange} value={inputs.email} type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' onChange={handleChange} value={inputs.password} type="password" placeholder="password" />
      </Form.Group>
      <Button type='submit'>Register</Button>
      <div>
        <Link to={'/login'} style={{textDecoration: 'none', color: '#000'}}>Already have an account? Login</Link>
      </div>
    </Form>
    </div>
  );
}

export default Register;