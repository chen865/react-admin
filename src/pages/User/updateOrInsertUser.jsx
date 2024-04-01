import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form, Input, Select, message } from 'antd';
import { PhoneOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { reqSelectRoles } from '../../api'



const { Item } = Form;

const UpdateOrInsertUser = forwardRef((props, ref) => {

    // 从父组件获取图片
    const {user} = props;

    const [form] = Form.useForm();

    const [options, setOptions] = useState([]);

    // 将数据传递给父组件
    const getForm = () => {
        return form;
    }

    useImperativeHandle(ref, () => ({
        getForm,
    }));

    useEffect(() => {
        getSelectRoles();
    }, []);


    async function getSelectRoles() {
        const result = await reqSelectRoles();
        if (result.data.code === 1) {
            setOptions(result.data.result.roles)
        } else {
            message.error('获取角色列表失败，请联系管理员。')
        }

    }

    // const options=[
    //     {
    //       value: 1,
    //       label: '超级管理员',
    //     },
    //     {
    //       value: 2,
    //       label: '角色管理',
    //     },
    //     {
    //       value: 3,
    //       label: '图标管理员',
    //     },
    //     {
    //       value: 4,
    //       label: '商品管理员',
    //     },
    //     {
    //       value: 5,
    //       label: '哈哈哈哈',
    //     }
    //   ]


    return (
        <div>
            <Form form={form}>

                <Item name='id' initialValue={user.userId} hidden>
                    <Input ></Input>
                </Item>

                <Item name='userName' initialValue={user.name} rules={[{
                    required: true,
                    message: '用户名称必须输入'
                }]}>
                    <Input placeholder='请输入用户名称' prefix={<UserOutlined />}></Input>
                </Item>

                <Item name='phone' initialValue={user.phone} rules={[{
                    required: true,
                    pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                    message: '输入的电话不符合规则'
                }]}>
                    <Input placeholder='请输入电话' prefix={<PhoneOutlined />}></Input>
                </Item>

                <Item name='email' initialValue={user.email} rules={[{
                    required: true,
                    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: '输入的邮箱不符合规则'
                }]}>
                    <Input placeholder='请输入邮箱' prefix={<MailOutlined />}></Input>
                </Item >

                <Item name='roleId' label="角色" initialValue={user.roleId} rules={[{
                    required: true,
                    message: '角色必须选择'
                }]}>
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        options={options}
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                    />
                </Item >
            </Form >
        </div >
    )
})

export default UpdateOrInsertUser;