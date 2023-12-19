import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import './scss/products.css'
import instance from "../../utils/axiosInstance";
import Form from "react-bootstrap/Form";
import CustomTable from "../../components/UI/CustomTable";
import {useNavigate} from "react-router-dom";

const Products = () => {
    const navigate = useNavigate()
    const [products, setproducts] = useState([])

    useEffect(() => {
        fetchData('')
    }, []);

    const addProduct = () => {
        navigate('/add-product')
    }

    const fetchData = async (e = null) => {
        let params = {}
        if (e) {
            params.search = e.target.value.toLowerCase()
        }
        try {
            const {data} = await instance.get('products', {params})
            setproducts(data)
        } catch (e) {

        }
    }
    const editItem = async (id) => {
      navigate('/edit-product/'+id)
    }
    const deleteItem = async (id) => {
        try {
            await instance.delete(`products/${id}`,)
            await fetchData()
        } catch (e) {

        }
    }

    return (
        <div className="products">

            <Button onClick={addProduct}>Add Product</Button>
            <Form.Control className={'mb-2 mt-2'} onInput={fetchData} type="text" placeholder="Search"/>
            {products.length > 0 && (
            <CustomTable data={products} handleEdit={editItem} handleDelete={deleteItem}/>)}
        </div>
    );
};

export default Products;