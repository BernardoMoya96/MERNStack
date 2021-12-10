import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Records.css';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/employee`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
    const setData = (data) => {
        let { id, firstName, lastName, date, phoneNumber, age, email } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);        
        localStorage.setItem('Date', date);     
        localStorage.setItem('Phone Number', phoneNumber);   
        localStorage.setItem('Age', age);   
        localStorage.setItem('Email', email);   
    }
    const success = ()=>{
        toast.success('Successfully deleted');
    }
    const onDelete = (id) => {
        success();
        axios.delete(`http://localhost:4000/employee/${id}`)
            .then(() => {
                getData();
            })        
    }
    const getData = () => {
        axios.get(`http://localhost:4000/employee`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }
    return (
        <div className="table">
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className="column-title">ID</Table.HeaderCell>
                        <Table.HeaderCell className="column-title">First Name</Table.HeaderCell>
                        <Table.HeaderCell className="column-title">Last Name</Table.HeaderCell>
                        <Table.HeaderCell className="column-title">Date</Table.HeaderCell>
                        <Table.HeaderCell className="column-title">Phone number</Table.HeaderCell>                        
                        <Table.HeaderCell className="column-title">Age</Table.HeaderCell>                        
                        <Table.HeaderCell className="column-title">Email</Table.HeaderCell>                        
                        <Table.HeaderCell className="column-title">Modify</Table.HeaderCell>
                        <Table.HeaderCell className="column-title">Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>                            
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.date}</Table.Cell>                                
                                <Table.Cell>{data.phoneNumber}</Table.Cell>
                                <Table.Cell>{data.age}</Table.Cell>                                                                
                                <Table.Cell>{data.email}</Table.Cell>    
                                <Link to='/modify'>
                                    <Table.Cell>
                                        <Button onClick={() => setData(data)}>Modify</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                    <Toaster /> 
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}