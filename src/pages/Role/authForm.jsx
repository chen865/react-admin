import { Form, Input, Tree } from 'antd';
import { forwardRef, useEffect, useState, useCallback, useImperativeHandle} from 'react';
import menuList from '../../config/menuConfig';

const { Item } = Form;

const AuthForm = forwardRef((props, ref) => {

    // 从父组件获取图片
    const { role } = props;

    const [treeData, setTreeData] = useState([]);

    const [checkedKeys, setCheckedKeys] = useState([]);

    // 将数据传递给父组件
    const getNewMenu = () => {
        return checkedKeys;
    }

    useImperativeHandle(ref, () => ({
        getNewMenu,
    }));

    const onSelect = (selectedKeys, info) => {
        console.log('点击了名字', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        // 选择菜单
        setCheckedKeys(checkedKeys);
    };


    const generateMenuTree = useCallback((menuList) => {
        return menuList.map(item => {
            const newItem = {
                title: item.title,
                key: item.key,
            };
            if (item.children) {
                newItem.children = generateMenuTree(item.children);
            }
            return newItem;
        });
    }, []);

    
    useEffect(() => {
        const result = generateMenuTree(menuList);
        setTreeData(result);
        //console.log('树的结构数据:', result);
        // 等列表数据加载完毕，再设置角色被授权的菜单
        setCheckedKeys(role.menus);
    }, [generateMenuTree, role.menus]);

    return (
        <div>
            <div>
                <Item label='角色名称'>
                    <Input value={role.name} disabled ></Input>
                </Item>
            </div>

             {/* 有数据后再展开 */}
            {treeData.length > 0 && <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
            />}
        </div>
    )
})
export default AuthForm;