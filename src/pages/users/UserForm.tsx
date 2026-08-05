import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { checkEmail, getTenants } from '../../https/api';
import type { Tenant } from '../../types';

const UserForm = ({ isEditMode = false }: { isEditMode: boolean }) => {
  const selectedRole = Form.useWatch('role');
  const { data: tenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      return await getTenants('').then((res) => res.data);
    },
  });

  const { mutateAsync: checkEmailMutation } = useMutation({
    mutationFn: checkEmail,
  });
  return (
    <Space orientation='vertical' size='large'>
      <Card title='Basic info' variant='borderless'>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label='First Name'
              name='firstName'
              rules={[
                {
                  required: true,
                  message: 'First name is required',
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Last Name'
              name='lastName'
              rules={[
                {
                  required: true,
                  message: 'Last name is required',
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Email'
              name='email'
              validateTrigger='onBlur'
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  type: 'email',
                  message: 'Email is not valid',
                },
                ...(isEditMode
                  ? []
                  : [
                      {
                        validator: async (_: unknown, value: string) => {
                          if (!value) {
                            return Promise.resolve();
                          }

                          try {
                            const { data } = await checkEmailMutation({
                              email: value,
                            });

                            if (data.exists) {
                              return Promise.reject(
                                new Error('Email already exists'),
                              );
                            }

                            return Promise.resolve();
                          } catch {
                            return Promise.reject(
                              new Error('Unable to validate email'),
                            );
                          }
                        },
                      },
                    ]),
              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {!isEditMode && (
        <Card title='Security info' variant='borderless'>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Password required',
                  },
                ]}
              >
                <Input.Password size='large' />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      )}
      <Card title='Role' variant='borderless'>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label='Role'
              name='role'
              rules={[
                {
                  required: true,
                  message: 'Role is Required',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                allowClear={true}
                onChange={() => {}}
                placeholder='Select role'
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'customer', label: 'Customer' },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          {selectedRole === 'manager' && (
            <Col span={12}>
              <Form.Item
                label='Restaurant'
                name='tenantId'
                rules={[
                  {
                    required: true,
                    message: 'Restaurant is required',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  allowClear={true}
                  onChange={() => {}}
                  placeholder='Select restaurant'
                  options={tenants?.data.map((tenant: Tenant) => ({
                    value: tenant.id,
                    key: tenant.id,
                    label: tenant.name,
                  }))}
                ></Select>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Card>
    </Space>
  );
};

export default UserForm;
