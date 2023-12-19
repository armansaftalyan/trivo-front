import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './scss/register.scss'
import {useContext, useState} from "react";
import instance from "../../utils/axiosInstance.js";
import {AuthContext} from "../../auth/AuthWrapper";
export const Register = () =>{
    const { afterLoginRegister } = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const resetError = ()=>{
        setErrors(false)
    }
    const register = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const {data} = await instance.post('register',formData)
            if(data){
                afterLoginRegister(data)
            }
        }catch (err){
            console.log(err)
            setErrors(err.response?.data?.errors)
        }
    }
    return (
        <Form className="register-form" onSubmit={register}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control onInput={resetError} isInvalid={errors?.name} name="name" type="text" placeholder="Name" />
                <Form.Control.Feedback type="invalid">
                    {errors?.name?errors?.name[0]:''}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control onInput={resetError} isInvalid={errors?.email} name="email" type="email" placeholder="Enter email" />
                 <Form.Control.Feedback type="invalid">
                     {errors?.email?errors?.email[0]:''}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control onInput={resetError} isInvalid={errors?.password} name="password" type="password" placeholder="Password" />
                 <Form.Control.Feedback type="invalid">
                     {errors?.password?errors?.password[0]:''}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control onInput={resetError} isInvalid={errors?.password} name="password_confirmation" type="password" placeholder="Password Confirmation" />
                 <Form.Control.Feedback type="invalid">
                     {errors?.password?errors?.password[0]:''}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
}
