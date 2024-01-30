import React from 'react'
import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import {Link, useNavigate} from 'react-router-dom'
import { Form , Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const ProfileScreen = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [name , setName] = useState("")

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile,{isLoading}] = useUpdateUserMutation();


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
       setName(userInfo.name)
       setEmail(userInfo.email)
    },[userInfo.setName , userInfo.setEmail]);

    
    const submitHandler = async(e)=>{
        e.preventDefault();
        if (password !== confirmPassword)
        {
            toast.error('Passwords Donot MAtch');
        }
        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password
            }).unwrap()
            dispatch(setCredentials({...res}))
            toast.success('Profile updated')
        } catch (error) {
            toast.error(err?.data?.message || err.error);
        }
    }

  return (
    <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group className='my-2 ' controlId='name'>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2 ' controlId='email'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2 ' controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2 ' controlId='confirm password'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            {isLoading && <Loader/>}

            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>

            
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen
