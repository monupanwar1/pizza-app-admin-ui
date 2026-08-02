import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  Breadcrumb,
  Button,
  Drawer,
  Form,
  Space,
  Spin,
  Table,
  theme,
  Typography,
} from 'antd';
import { debounce } from 'lodash';
import React, { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { PER_PAGE } from '../../constants';
import { createTenant, getTenants } from '../../https/api';
import { useAuthStore } from '../../store';
import type { CreateTenantData, FieldData } from '../../types';
import TenantFilter from './TenantFilter';
import TenantForm from './TenantForm';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Tenants = () => {
  const { user } = useAuthStore();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const queryClient = useQueryClient();

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // get
  const {
    data: tenants,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['tenants', queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1]),
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>,
      ).toString();

      return getTenants(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { mutate: tenantMutate } = useMutation({
    mutationKey: ['tenant'],
    mutationFn: async (data: CreateTenantData) =>
      createTenant(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    await tenantMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({
        ...prev,
        q: value,
      }));
    }, 500);
  }, []);

  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    if ('q' in changedFilterFields) {
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams((prev) => ({ ...prev, ...changedFilterFields }));
    }
  };

  if (user?.role !== 'admin') {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <>
      <Space orientation='vertical' size='large' style={{ width: '100%' }}>
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            { title: <Link to='/'>Dashboard</Link> },
            { title: 'Restaurant' },
          ]}
        />
        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />}></Spin>
        )}
        {isError && (
          <Typography.Text type='danger'>{error.message}</Typography.Text>
        )}

        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <TenantFilter>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add Restaurant
            </Button>
          </TenantFilter>
        </Form>

        <Table
          columns={columns}
          dataSource={tenants?.data}
          rowKey={'id'}
          pagination={{
            total: tenants?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page) => {
              setQueryParams((prev) => ({
                ...prev,
                currentPage: page,
              }));
            },
          }}
        />

        <Drawer
          title='Create restaurant'
          styles={{ body: { backgroundColor: colorBgLayout } }}
          size={720}
          destroyOnHidden={true}
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={onHandleSubmit} type='primary'>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout='vertical' form={form}>
            <TenantForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Tenants;
