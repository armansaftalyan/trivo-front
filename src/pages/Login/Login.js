import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './scss/login.scss'
import {AuthContext} from "../../auth/AuthWrapper";
import instance from "../../utils/axiosInstance";
import {useContext, useState} from "react";


export const Login = ()=> {

    const { afterLoginRegister,user } = useContext(AuthContext);
    const [errors, setErrors] = useState(false);

    const resetError = ()=>{
        setErrors(false)
    }
    const loginFunc = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const {data} = await instance.post('login',formData)
            if(data){
                afterLoginRegister(data)

                console.log(data)
                console.log(user)
            }

        }catch (err){
            setErrors(true)
        }
    }
    return (
        <Form className="login-form" onSubmit={loginFunc}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onInput={resetError} isInvalid={errors} type="email" name="email" placeholder="Enter email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onInput={resetError} isInvalid={errors} type="password" name="password" placeholder="Password"/>
                <Form.Control.Feedback type="invalid">
                   Invalid Credentials
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
}
