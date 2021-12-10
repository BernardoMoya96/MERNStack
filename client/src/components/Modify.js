import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './Home.css';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};
const Modify = () => {

    let history = useNavigate();
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState(null);
    const [form] = Form.useForm();
  
    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setDate(localStorage.getItem('Date'));
        setPhoneNumber(localStorage.getItem('Phone Number'));
        setAge(localStorage.getItem('Age'));
        setEmail(localStorage.getItem('Email'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:4000/employee/${id}`, {
            id,
            firstName,
            lastName,
            date,
            phoneNumber,
            age,
            email
        }).then(() => {
            history('/records')
        })
    }

    const success = () => {
        toast.success('Successfully toasted!');
    }

    const onFinish = (values) => {
        success();
        updateAPIData();        
    };

    const onClick = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 6000);
    };

    // const prefixSelector = (
    //     <Form.Item name="prefix" noStyle>
    //         <Select
    //             style={{
    //                 width: 70,
    //             }}
    //         >
    //             <Option value="86">+86</Option>
    //             <Option value="87">+87</Option>
    //         </Select>
    //     </Form.Item>
    // );
    console.log();
    const [fields, setFields] = useState([
        {
            name: ['firstname'],
            value: localStorage.getItem('First Name'),
        },
        {
            name: ['lastname'],
            value: localStorage.getItem('Last Name'),
        },
        {
            name: ['phone'],
            value: localStorage.getItem('Phone Number'),
        },
        {
            name: ['age'],
            value: localStorage.getItem('Age'), 
        },
        {
            name: ['email'],
            value: localStorage.getItem('Email'), 
        }

    ]);
    return (
        <div className="form">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}       
                scrollToFirstError
                fields={fields}
            >
                <Form.Item
                    name="firstname"
                    label="Firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Lastname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>
                <Form.Item name="date-picker" label="DatePicker" {...config}>
                    <DatePicker onChange={(date) => setDate(date)} />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your age!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setAge(e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" loading={loading} htmlType="submit" onClick={onClick}>
                            Submit
                    </Button>   
                    <Toaster />
                </Form.Item>
            </Form>
        </div>

    );
};
export default Modify;