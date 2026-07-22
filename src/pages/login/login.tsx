import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
} from 'antd';
import Logo from '../../components/Logo';
import { usePermission } from '../../hooks/usePermission';
import { login, logout, self } from '../../https/api';
import { useAuthStore } from '../../store';
import type { Credentials } from '../../types';

// login User

const loginUser = async (credentials: Credentials) => {
  const { data } = await login(credentials);
  return data;
};
const getSelf = async () => {
  const { data } = await self();
  return data;
};

const LoginPage = () => {
  const { isAllowed } = usePermission();
  const { setUser, logout: logoutFromStore } = useAuthStore();

  const { refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false,
  });

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      // logout from store
      logoutFromStore();
      return;
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();
      // logout or redirect to client ui
      // window.location.href = "http://clientui/url"
      // "admin", "manager", "customer"
      if (!isAllowed(selfDataPromise.data)) {
        logoutMutate();
        return;
      }

      setUser(selfDataPromise.data);
    },
  });
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
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) => {
                mutate({ email: values.username, password: values.password });
              }}
            >
              {isError && (
                <Alert
                  style={{ marginBottom: 24 }}
                  type='error'
                  title={error?.message}
                />
              )}
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
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='Password'
                />
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
                  loading={isPending}
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
