import React from 'react';
import { Table, Button } from 'react-bootstrap';

const DataTable = ({ data, handleEdit, handleDelete }) => {
    let keys = []
    if (data.length) {
        keys = Object.keys(data[0])
    }


    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {keys.map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {keys.map((key) => (
                            <td key={key}>{typeof item[key] =='object'?item[key].name:item[key]}</td>
                        ))}
                        <td>
                            <Button variant="info" onClick={() => handleEdit(item.id)}>
                                Edit
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;