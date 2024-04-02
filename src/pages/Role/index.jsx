import { Card, Table, Button, message, Modal } from 'antd'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { reqAllRoles, reqAddRole, reqUpdateRoleAuth } from '../../api';
import AddForm from './addForm';
import AuthForm from './authForm';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

const Role = () => {

    const [roles, setRoles] = useState([]);

    // 配置是否显示loading，设置默认值
    const [loading, setLoading] = useState(false);

    const [buttonStatus, setButtonStatus] = useState(true);

    // 商品总数量
    const [total, setTotal] = useState(0);

    // 被选中的一列，会被选中
    const [selectRole, setSelectRole] = useState([]);

    // 是否显示弹窗
    const [isShowModal, setIsShowModal] = useState(false);

    // 是否显示弹窗-授权
    const [isShowAuth, setIsShowAuth] = useState(false);

    // 用于获取子组件的数据 通过ref
    // 获取角色名称
    const getRoleName = useRef();
    // 获取新的角色授权菜单
    const getNewMenu = useRef();

    // 获取用户信息
    const user = memoryUtils.user

    const navigate = useNavigate();


    const title = (
        <span>
            <Button type='primary' onClick={() => { setIsShowModal(true) }} >创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={buttonStatus} onClick={() => { setIsShowAuth(true) }}>设置角色权限</Button>
        </span>
    )

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: '授权时间',
            dataIndex: 'authTime',
            key: 'authTime',
        },
        {
            title: '授权人名称',
            dataIndex: 'authName',
            key: 'authName',
        }
    ];


    function onRow(role) {
        return {
            onClick: event => {
                // 点击行
                //console.log('点击了行', role);
                setButtonStatus(false);
                setSelectRole(role);
            }
        }
    }

    // 获取分类数据 
    async function getAllRoles(page, size) {
        // 发请求前，显示loading
        setLoading(true);
        if (!page || !size) {
            page = 1;
            size = 3;
        }
        const vo = { page, size };

        const result = await reqAllRoles(vo);
        // 请求完成后，隐藏loading
        setLoading(false);

        if (result.data.code === 1) {
            setRoles(result.data.result.data.records);
            setTotal(result.data.result.data.total);
        } else {
            message.error('获取数据分类失败')
        }

    }

    async function addRole() {
        const roleName = getRoleName.current.getRoleName();
        console.log('获取到的角色名称：', roleName);
        if (roleName) {
            const result = await reqAddRole(roleName);
            setIsShowModal(false);
            if (result.data.code === 1) {
                message.success('添加角色成功');
                //getAllRoles();
                // 刷新页面
                window.location.reload();
            } else {
                message.error('添加角色失败');
            }
        } else {
            message.error('角色名称不能为空');
        }
    }

    async function updateRoleAuth() {
        const newMenu = getNewMenu.current.getNewMenu();
        //console.log('获取到的角色新的授权菜单：', newMenu);

        selectRole.menus = newMenu;
        selectRole.authName = user.name;

        const result = await reqUpdateRoleAuth(selectRole);
        setIsShowAuth(false);
        //console.log('更新角色权限结果：', result.data.code);
        if (result.data.code === 1) {
            //如果更新了当前登录用户的角色，需要重新登录
            if (user.roleId === selectRole.id) {
                // 删除保存的user数据
                storageUtils.removeUser();
                memoryUtils.user = {}
                // 跳转login
                navigate("/login");
                message.info('当前角色权限已更新，请重新登录！');
            } else {
                message.success('设置角色权限成功');
                //setSelectRole(selectRole);
                getAllRoles();
            }
        } else {
            message.error('更新角色权限失败！');
        }

    }


    useEffect(() => {
        getAllRoles();
    }, []);


    return (
        <Card title={title}>
            <Table
                dataSource={roles}
                columns={columns}
                bordered rowKey='id'
                loading={loading}
                rowSelection={{ type: 'radio', selectedRowKeys: [selectRole.id] }}
                onRow={onRow}
                pagination={{
                    defaultPageSize: 3, showQuickJumper: true, total: total,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: (page, size) => getAllRoles(page, size),
                }}
            />

            <Modal title="添加角色" open={isShowModal} cancelText='取消' okText='确定'
                onOk={addRole}
                onCancel={() => { setIsShowModal(false) }}
                destroyOnClose={true}>
                <AddForm ref={getRoleName} />
            </Modal>

            <Modal title="设置角色权限" open={isShowAuth} cancelText='取消' okText='确定'
                onOk={updateRoleAuth}
                onCancel={() => { setIsShowAuth(false) }}
                destroyOnClose={true}>
                <AuthForm role={selectRole} ref={getNewMenu} />
            </Modal>

        </Card>
    )
}
export default Role;