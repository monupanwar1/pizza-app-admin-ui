import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from 'antd';
import Logo from '../../components/Logo';

const LoginPage = () => {
  return (
    <>
      <Layout
        style={{ height: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Space orientation='vertical' size='large' align='center'>
          <Layout.Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            variant='borderless'
            style={{ width: 300 }}
            title={
              <Space
                style={{
                  width: '100%',
                  fontSize: 16,
                  justifyContent: 'center',
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form initialValues={{ remember: true }}>
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your username',
                  },
                  {
                    type: 'email',
                    message: 'Email is not valid',
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password',
                  },
                ]}
              >
                <Input prefix={<LockOutlined />} />
              </Form.Item>
              <Flex justify='space-between' align='baseline'>
                <Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href='' id='login-form-forget'>
                  Forget password
                </a>
              </Flex>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ width: '100%' }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
