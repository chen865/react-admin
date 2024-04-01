import {
    Card, Select, Button, Input, Table, message,
    Form, Col, Row, Space, Modal
} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import {
    PlusOutlined
} from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import LinkButton from '../../components/LinkButton';
import { reqAllUsers, reqDeleteUser, reqUpdateOrInsertUser } from '../../api'
import { PAGE_SIZE } from '../../utils/constants';
//import { useNavigate } from 'react-router-dom';
import UpdateOrInsertUser from './updateOrInsertUser';

const { Option } = Select;

const User = () => {

    // 用于获取子组件的数据 通过ref
    const getForm = useRef();

    const [form] = Form.useForm();

    const [expand, setExpand] = useState(false);

    const formStyle = {
        padding: 24,
    };

    // 配置是否显示loading，设置默认值
    const [loading, setLoading] = useState(false);

    const [userList, setUserList] = useState([]);

    // 商品总数量
    const [total, setTotal] = useState(0);

    // 两个弹窗 0 不显示 1 添加 2 修改
    const [modalStatus, setModalStatus] = useState(0);

    // 需要更新的用户信息
    const [updateUser, setUpdateUser] = useState([]);

    async function getUserList(page, size, searchParams = {}) {
        // 发送请求前显示loading
        setLoading(true);
        let result;
        searchParams.page = page;
        searchParams.size = size;
        //console.log('userSearch:', searchParams);
        if (searchParams) {
            // searchName如果有数据，表示是带搜索的查询
            result = await reqAllUsers(searchParams);
        } else {
            result = await reqAllUsers(searchParams);
        }
        // 请求完成后关闭loading
        setLoading(false);
        if (result.data.code === 1) {
            setUserList(result.data.result.data.records);
            setTotal(result.data.result.data.total);
        } else {
            message.error('获取用户列表失败！')
        }
    }


    function initUserList() {
        getUserList(1, PAGE_SIZE);
    }

    useEffect(() => {
        initUserList(); // eslint-disable-next-line
    }, []);

    async function deleteUser(userId) {
        let result = await reqDeleteUser(userId);
        if (result.data.code === 1) {
            message.success('删除用户成功！');
            getUserList(1, PAGE_SIZE);
        } else {
            message.error(result.data.msg);
        }
    }

    async function updateOrInsertUser() {
        const modalInfo = getForm.current.getForm();
        const { id, userName, phone, email, roleId } = modalInfo.getFieldsValue();
        //console.log('huo qu dao de shu ju:', id, userName, phone, email, roleId)

        // 表单验证
        modalInfo.validateFields().then(async () => {
            // 关闭弹窗
            setModalStatus(0)

            const newUser = {
                name: userName,
                phone: phone,
                email: email,
                roleId: roleId
            }
            if (id) {
                newUser.userId= id;
            }
            let result = await reqUpdateOrInsertUser(newUser);
            if (result.data.code === 1) {
                message.success('操作成功。');
                getUserList(1, PAGE_SIZE);
            } else {
                message.error(result.data.msg);
            }

        }).catch((errorInfo) => {
            console.log('您录入的数据有误！')
        })


    }

    // 隐藏确定框
    function handleCancel() {
        setModalStatus(0);
    }



    const onFinish = (values) => {
        //console.log('获取搜索框数据: ', values);
        // 获取搜索框数据
        const user = {
            name: values.name,
            email: values.email,
            roleId: values.roleId,
            phone: values.phone,
            page: 1,
            size: PAGE_SIZE
        }
        getUserList(1, 10, user);
    };


    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '创建日期',
            dataIndex: 'created',
        },
        {
            title: '角色',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            width: 100,
            render: (users) => {
                const { userId } = users;
                return (
                    <span>
                        <LinkButton onClick={() => { setModalStatus(2); setUpdateUser(users); }}>修改</LinkButton>
                        <LinkButton onClick={() => deleteUser(userId)}>删除</LinkButton>
                    </span>
                )
            }
        }
    ];


    const getFields = () => {
        const children = [];

        children.push(<Col span={8} key={1} >

            <Form.Item
                name='name'
                label='用户名称'
                rules={[
                    {
                        required: false,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input placeholder="用户名称" />
            </Form.Item>

            <Form.Item
                name='email'
                label='用户邮箱'
                rules={[
                    {
                        required: false,
                        message: '用户邮箱',
                    },
                ]}
            >
                <Input placeholder="用户邮箱" />
            </Form.Item>


        </Col>);


        children.push(
            <Col span={8} key={2} >
                <Form.Item
                    name='roleId'
                    label='用户角色'
                >
                    <Select>
                        <Option value="1">管理员</Option>
                        <Option value="2">商品管理员</Option>
                    </Select>
                </Form.Item>

            </Col>);

        children.push(
            <Col span={8} key={3} >
                <Form.Item
                    name='phone'
                    label='电话号码'
                    rules={[
                        {
                            required: false,
                            message: '电话号码',
                        },
                    ]}
                >
                    <Input placeholder="电话号码" />
                </Form.Item>
            </Col>);

        return children;
    };



    const title = (
        <span>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Row gutter={12}>{getFields()}</Row>
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space size="small">
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            重置输入
                        </Button>
                        <span
                            style={{
                                fontSize: 12,
                            }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            <DownOutlined rotate={expand ? 180 : 0} /> 展开
                        </span>
                    </Space>
                </div>
            </Form>

            <Button type='primary' onClick={() => { setModalStatus(1); setUpdateUser([]); }}>
                <PlusOutlined />
                添加用户
            </Button>
        </span>
    )



    return (
        <Card title={title} >
            <Table dataSource={userList} columns={columns} rowKey='userId'
                bordered loading={loading}
                pagination={{
                    defaultPageSize: PAGE_SIZE, showQuickJumper: true, total: total,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: (page, size) => getUserList(page, size),
                }}
            />

            <Modal title={modalStatus === 1 ? "新增用户" : "修改用户"} cancelText='取消' okText='确定'
                open={modalStatus === 1 || modalStatus === 2} onOk={updateOrInsertUser} onCancel={handleCancel} destroyOnClose={true} >
                <UpdateOrInsertUser ref={getForm} user={updateUser} />
            </Modal>


        </Card>

    )
}
export default User;