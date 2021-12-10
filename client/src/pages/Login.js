import { useState, useEffect,useContext } from 'react'
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';
import { DataContext } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);  
  const {setIsAuth} = useContext(DataContext);

  const onClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  async function loginUser() {    
    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    if (data.user) {
      localStorage.setItem('token', data.user)    
      setIsAuth(true)
      alert('Login successful')            
      navigate('/')
      return true;
    } else {
      alert('Please check your username and password')      
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
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
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
            <Input.Password placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Login" 
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" loading={loading} onClick={onClick} htmlType="submit">
              Login
            </Button>            
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
