import { Card, Col, Form, Input, Row, Select } from 'antd';

type UsersFilterProps = {
  children?: React.ReactNode;
};

const UsersFilter = ({ children }: UsersFilterProps) => {
  return (
    <Card>
      <Row justify='space-between'>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name='q'>
                <Input.Search allowClear={true} placeholder='Search' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='role'>
                <Select
                  defaultValue='customer'
                  style={{ width: 120 }}
                  allowClear
                  options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'customer', label: 'Customer' },
                  ]}
                  placeholder='select role'
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
