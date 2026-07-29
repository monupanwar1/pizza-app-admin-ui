import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Drawer, Flex, Form, Space, Table } from 'antd';
import { useState } from 'react';
import { Link, Navigate } from 'react-router';
// import { PER_PAGE } from '../../constants';
import { getUsers } from '../../https/api';
import { useAuthStore } from '../../store';
import type { FieldData, User } from '../../types';
import UsersFilter from './UsersFilter';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Restaurant',
    dataIndex: 'tenant',
    key: 'tenant',
    render: (_text: string, record: User) => {
      return <div>{record.tenant?.name}</div>;
    },
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(
    null,
  );

  // const [queryParams, setQueryParams] = useState({
  //   perPage: PER_PAGE,
  //   currentPage: 1,
  // });

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return getUsers().then((res) => res.data);
    },
  });

  const onFilterChange = (changedFields: FieldData[]) => {
    console.log(changedFields);

    // [
    //     {q: 'something'},
    //     {role: 'admin'}
    // ]

    // {
    //     q: 'something',
    //     role: 'admin'
    // }
  };

  const { user } = useAuthStore();

  if (user?.role === 'Admin') {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <>
      <Space orientation='vertical' size='large' style={{ width: '100%' }}>
        <Flex justify='space-between'>
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              {
                title: <Link to='/'>Dashboard</Link>,
              },
              {
                title: 'Users',
              },
            ]}
          />
          {isLoading && <div>Loading...</div>}
          {isError && <div>{error.message}</div>}
        </Flex>
        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <UsersFilter>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add User
            </Button>
          </UsersFilter>
        </Form>

        <Table
          columns={[
            ...columns,
            {
              title: 'Actions',
              key: 'Actions',
              render: (_: string, record: User) => {
                return (
                  <Space>
                    <Button
                      type='link'
                      onClick={() => setCurrentEditingUser(record)}
                    >
                      Edit
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={users?.data}
          rowKey={'id'}
          pagination={{
            total: 10,
            pageSize: 6,
            current: 1,
          }}
        />

        <Drawer
          title={currentEditingUser ? 'Edit User' : 'Add User'}
          size={720}
          open={drawerOpen}
          onClose={() => {
            setCurrentEditingUser(null);
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type='primary'>Submit</Button>
            </Space>
          }
        >
          <Form layout='vertical' form={form}></Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
