import { Card, Col, Form, Input, Row, Space } from 'antd';

const TenantForm = () => {
  return (
    <Space orientation='vertical' style={{ width: '100%' }}>
      <Card title='Basic info' variant='borderless'>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Name is required',
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Address'
              name='address'
              rules={[
                {
                  required: true,
                  message: 'Address is required',
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default TenantForm;
