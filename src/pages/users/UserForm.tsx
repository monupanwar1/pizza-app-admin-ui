import { useQuery } from '@tanstack/react-query';
import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { getTenants } from '../../https/api';
import type { Tenant } from '../../types';

const UserForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      return await getTenants().then((res) => res.data);
    },
  });
  return (
    <Space orientation='vertical' size='large'>
      <Card title='Basic info' variant='borderless'>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label='First Name' name='firstName'>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Last Name' name='lastName'>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Email' name='Email'>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title='Security info' variant='borderless'>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label='Password' name='password'>
              <Input size='large' type='password' />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title='Role' variant='borderless'>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label='Role' name='role'>
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
          <Col span={12}>
            <Form.Item label='Restaurant' name='tenantId'>
              <Select
                style={{ width: '100%' }}
                allowClear={true}
                onChange={() => {}}
                placeholder='Select restaurant'
                options={tenants?.map((tenant: Tenant) => ({
                  value: tenant.id,
                  label: tenant.name,
                }))}
              ></Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default UserForm;
