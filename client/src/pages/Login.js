import { useState, useEffect, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuth } = useContext(DataContext);
  const [error, setError] = useState(null);

  const onClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  async function loginUser() {
    let data = {};
    try {
      const response = await fetch('http://localhost:1337/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      data = await response.json();
    } catch (err) {
      setIsAuth(false);
      setError('Login Failed');
      return false;
    }
    console.log(data);
    if (data.error) {
      setIsAuth(false);
      setError(data.error);
      return false;
    }
    if (data.user) {
      localStorage.setItem('token', data.user);
      setIsAuth(true);
      navigate('/');
      return true;
    } else {
      alert('Please check your username and password');
      return false;
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <div className="form">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={loginUser}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label=""
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              loading={loading}
              onClick={onClick}
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}

export default Login;
