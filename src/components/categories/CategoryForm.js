import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import instance from "../../utils/axiosInstance";
import {useNavigate, useParams} from "react-router-dom";

const CategoryForm = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState(false);
    const { id } = useParams();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (id) {
           instance.get(`categories/${id}`).then((res)=>{
               setFormData(res.data)
           })
        }
    }, [id]);
    const createOrUpdate =async (event)=>{
        event.preventDefault()
        event.stopPropagation()
        if(id){
            try{
                const formData = new FormData(event.target);
                const {data} = await instance.put(`categories/${id}`,formData)
                console.log(data)
                if(data){
                    navigate('/categories')
                }
            }catch (err){
                console.log(err)
                setErrors(err.response?.data?.errors)
            }
        }else {
            try{
                const formData = new FormData(event.target);
                const {data} = await instance.post('categories',formData)
                console.log(data)
                if(data){
                    navigate('/categories')
                }
            }catch (err){
                console.log(err)
                setErrors(err.response?.data?.errors)
            }
        }

    }

    const resetError = ()=>{
        setErrors(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update form state on input change
    };

    return (
        <Form className="form-control w-50 m-auto mt-5" onSubmit={createOrUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category name</Form.Label>
                <Form.Control onInput={resetError} onChange={handleInputChange} value={formData.name || ''} isInvalid={errors?.name} type="text" name="name"
                              placeholder="name"/>
                <Form.Control.Feedback type="invalid">
                    {errors?.name?errors?.name[0]:''}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                {id?'Update':'Create'}
            </Button>
        </Form>
    );
};

export default CategoryForm;