import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Table,
  theme,
} from 'antd';
import { useState } from 'react';
import { Link, Navigate } from 'react-router';
// import { PER_PAGE } from '../../constants';
import { PER_PAGE } from '../../constants';
import { createUser, getUsers } from '../../https/api';
import { useAuthStore } from '../../store';
import type { CreateUserData, FieldData, User } from '../../types';
import UserForm from './UserForm';
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
  const queryClient = useQueryClient();
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const [filterForm] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });
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
    queryKey: ['users', queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams(
        queryParams as unknown as Record<string, string>,
      ).toString();
      return getUsers(queryString).then((res) => res.data);
    },
  });

  const { mutate: userMutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    await userMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };

  const onFilterChange = (changedFields: FieldData[]) => {
    console.log(changedFields);
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
            total: users?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {
              console.log(page);
              setQueryParams((prev) => {
                return {
                  ...prev,
                  currentPage: page,
                };
              });
            },
          }}
        />

        <Drawer
          title={currentEditingUser ? 'Edit User' : 'Add User'}
          size={720}
          styles={{ body: { backgroundColor: colorBgLayout } }}
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
              <Button type='primary' onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout='vertical' form={form}>
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
