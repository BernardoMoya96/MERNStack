import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {
    Form,
    Input,    
    Button,
    DatePicker
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './Home.css';

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
const TheForm = () => {
    let history = useNavigate();
    const [loading, setLoading] = useState(false);
    const [id, setID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();

    const postData = () => {
        axios.post(`http://localhost:4000/employee`, {
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
        postData();
    };

    const onClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 6000);

    };

    return (
        <div className="form">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="id"
                    label="ID"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your id!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setID(e.target.value)} />
                </Form.Item>

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
export default TheForm;