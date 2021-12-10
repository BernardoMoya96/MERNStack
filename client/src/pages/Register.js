import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  
  const onClick = () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000);
};

  async function registerUser(event) {    
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data = await response.json()
    if (data.status === 'ok') {
      navigate('/login')
    }

  }

  return (
    //  <div>
    //    <h1>Register</h1>
    //    <form onSubmit={registerUser}>
    //      <input 
    //         value={name}
    //         onChange= {(e)=> setName(e.target.value)}
    //         type="text"
    //         placeholder="Name"
    //      />
    //      <br/>
    //       <input 
    //         value={email}
    //         onChange= {(e)=> setEmail(e.target.value)}
    //         type="email"
    //         placeholder="Email"
    //      />
    //      <br/>
    //       <input 
    //         value={password}
    //         onChange= {(e)=> setPassword(e.target.value)}
    //         type="password"
    //         placeholder="Password"
    //      />
    //    <br/>
    //    <input type="submit" value="Register"/>
    //    </form>     
    //  </div>
    <div>
      <h1>Please register</h1>
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
          onFinish={registerUser}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
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
            <Input onChange={(e) => setEmail(e.target.value)} />
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
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
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

export default Register;
