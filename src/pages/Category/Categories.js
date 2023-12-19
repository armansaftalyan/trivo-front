import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import './scss/categories.css'
import {useNavigate} from "react-router-dom";
import instance from "../../utils/axiosInstance";
import Form from "react-bootstrap/Form";
import CustomTable from "../../components/UI/CustomTable";

const Categories = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchData('')
    }, []);

    const addCategory = () => {
        navigate('/add-category')
    }

    const fetchData = async (e = null) => {
        let params = {}
        if (e) {
            params.search = e.target.value.toLowerCase()
        }
        try {
            const {data} = await instance.get('categories', {params})
            setCategories(data)
        } catch (e) {

        }
    }
    const editItem = async (id) => {
      navigate('/edit-category/'+id)
    }
    const deleteItem = async (id) => {
        try {
            await instance.delete(`categories/${id}`,)
            await fetchData()
        } catch (e) {

        }
    }

    return (
        <div className="categories">

            <Button onClick={addCategory}>Add Category</Button>
            <Form.Control className={'mb-2 mt-2'} onInput={fetchData} type="text" placeholder="Search"/>
            {categories.length > 0 && (
            <CustomTable data={categories} handleEdit={editItem} handleDelete={deleteItem}/>)}
        </div>
    );
};

export default Categories;