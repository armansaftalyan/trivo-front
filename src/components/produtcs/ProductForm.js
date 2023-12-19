import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import instance from "../../utils/axiosInstance";
import {useNavigate, useParams} from "react-router-dom";

const ProductForm = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState(false);
    const {id} = useParams();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '', // For selected category
    });

    useEffect(() => {
        if (id) {
            instance.get(`products/${id}`).then((res) => {
                setFormData(res.data)
            })
        }
    }, [id]);

    useEffect(() => {
        instance.get(`categories`).then((res) => {
            setCategories(res.data)
        })
    }, []);


    const createOrUpdate = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (id) {
            try {
                const formData = new FormData(event.target);
                const {data} = await instance.put(`products/${id}`, formData)
                console.log(data)
                if (data) {
                    navigate('/products')
                }
            } catch (err) {
                console.log(err)
                setErrors(err.response?.data?.errors)
            }
        } else {
            try {
                const formData = new FormData(event.target);
                const {data} = await instance.post('products', formData)
                console.log(data)
                if (data) {
                    navigate('/products')
                }
            } catch (err) {
                console.log(err)
                setErrors(err.response?.data?.errors)
            }
        }

    }

    const resetError = () => {
        setErrors(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form className="form-control w-50 m-auto mt-5" onSubmit={createOrUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product name</Form.Label>
                <Form.Control onInput={resetError} onChange={handleInputChange} value={formData.name || ''}
                              isInvalid={errors?.name} type="text" name="name"
                              placeholder="name"/>
                <Form.Control.Feedback type="invalid">
                    {errors?.name ? errors?.name[0] : ''}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product description</Form.Label>
                <Form.Control onInput={resetError} onChange={handleInputChange} value={formData.description || ''}
                              isInvalid={errors?.description} type="text" name="description"
                              placeholder="description"/>
                <Form.Control.Feedback type="invalid">
                    {errors?.description ? errors?.description[0] : ''}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Price</Form.Label>
                <Form.Control onInput={resetError} onChange={handleInputChange} value={formData.price || ''}
                              isInvalid={errors?.price} type="number" name="price"
                              placeholder="price"/>
                <Form.Control.Feedback type="invalid">
                    {errors?.price ? errors?.price[0] : ''}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Select aria-label="Default select example" name="category_id"
                         value={formData.category_id}
                         onChange={handleInputChange}>
                <option>Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </Form.Select>
            <Button variant="primary" type="submit">
                {id ? 'Update' : 'Create'}
            </Button>
        </Form>
    );
};

export default ProductForm;