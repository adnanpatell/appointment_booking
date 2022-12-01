import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const  onFinish =async  (values) =>{
    try {
      dispatch(showLoading())
      const response = await axios.post('http://localhost:5000/api/user/login', values)
      dispatch(hideLoading())
      if(response.data.success){
          toast.success(response.data.message)
          toast("Redirecting To Home Page")
          localStorage.setItem("token", response.data.data)
          navigate("/")
      }else{
        dispatch(hideLoading())
        toast.error("Something Went Wrong")
      }
    } catch (error) {
    
    }
    } 
  return (
    <div className = "authentication">
        <div className="authentication-form card p-3">
      <h1 className='card-title'>Welcome To Jan Seva Kendra</h1>
      <Form layout='vertical' onFinish={onFinish}>

<Form.Item label='Email' name='email'>
    <Input placeholder='Email'></Input>
</Form.Item>
<Form.Item label='Password' name='password' >
    <Input placeholder='Password' type='password'></Input>
</Form.Item>
<Button className='primary-button my-2' htmlType='submit'>LOGIN</Button>

<Link to='/register' className='anchor mt-2'>Click Here To Register</Link>

      </Form>
        </div>
    </div>
  )
}

export default Login