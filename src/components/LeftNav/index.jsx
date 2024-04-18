import './index.css'
import logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// 之前旧的列表，
const items = [
  getItem('首页', '/home', <PieChartOutlined />),
  getItem('用户管理', 'user', <DesktopOutlined />),
  getItem('角色管理', 'role', <ContainerOutlined />),
  getItem('商品', 'p1', <MailOutlined />, [
    getItem('商品管理', 'product', <PieChartOutlined />),
    getItem('品类管理', 'category', <PieChartOutlined />),
  ]),
  getItem('图形图表', 'sub2', <AppstoreOutlined />, [
    getItem('条形图', 'bar'),
    getItem('折线图', 'line'),
    getItem('饼图', 'pie'),
    // getItem('饼图', 'pie', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

// 获取当前路径
const urlParams = new URL(window.location.href);
let pathname = urlParams?.pathname;
console.log("当前路径是：", pathname);

// 如果是分类下的子标题刷新的时候要展开导航
let openKey = '';


const LeftNav = () => {

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    console.log('左边导航栏的值', collapsed)
  };

  const handleClick = (item) => {
    console.log('当前key是', item.key)

    navigate(item.key, { replace: true })
  };


  function authMenu(item) {
    // 判断用户的菜单权限
    const { key, isPublic } = item;
    const menu = memoryUtils.user.menus;
    const roleId = memoryUtils.user.roleId;
    
    // menu如果是空的 返回true
    if (!menu) {
      return true;
    }

    if (roleId === 1 || isPublic || (menu && menu.indexOf(key) !== -1)) {
      return true;
    }else if (item.children){
      return !!item.children.find(child => menu.indexOf(child.key) !== -1);
    }
    return false;

  }

  function buildItems(menuList) {
    return menuList.map(item => {

      // 判断用户的菜单权限
      if (authMenu(item)) {
        if (!item.children) {
          return {
            key: item.key,
            icon: React.createElement(Icons[item.icon]),
            label: item.title,
          };
        } else {
          // 递归处理子元素
          const childrenItems = buildItems(item.children);

          // 找当前路由匹配的字路由
          let result = false;
          item.children.find(cItem => {
            if (pathname.indexOf(cItem.key) === 0) {
              result = true;
              pathname = cItem.key;
            }
          });

          if (result) {
            openKey = item.key;
          }

          return {
            key: item.key,
            icon: React.createElement(Icons[item.icon]),
            children: childrenItems,
            label: item.title,
          };
        }
      }

    })
  }

  const newitems = buildItems(menuList);


  return (
    <div>
      <div className="left-nav">
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo'></img>
          <h1>中国诚信管理后台</h1>
        </Link>
      </div>

      <div
        style={{

        }}
      >
        <Layout.Sider collapsed={collapsed}>
          <Menu
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={[openKey]}
            mode="inline"
            theme="dark"

            items={newitems}
            onClick={handleClick}
          />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Layout.Sider>

      </div>
    </div>

  )
}
export default LeftNav;


// 这里是组件的内容 上面是自己写的
// import React, { useState } from 'react';
// import {
//   AppstoreOutlined,
//   CalendarOutlined,
//   LinkOutlined,
//   MailOutlined,
//   SettingOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
// } from '@ant-design/icons';
// import { Divider, Menu, Switch, Button } from 'antd';
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//   getItem('Navigation One', '1', <MailOutlined />),
//   getItem('Navigation Two', '2', <CalendarOutlined />),
//   getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
//     getItem('Option 3', '3'),
//     getItem('Option 4', '4'),
//     getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
//   ]),
//   getItem('Navigation Three', 'sub2', <SettingOutlined />, [
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//   ]),
//   getItem(
//     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//       Ant Design
//     </a>,
//     'link',
//     <LinkOutlined />,
//   ),
// ];
// const LeftNav = () => {
//   const [mode, setMode] = useState('inline');
//   const [theme, setTheme] = useState('light');
//   const [collapsed, setCollapsed] = useState(false);

//   const changeMode = (value) => {
//     setMode(value ? 'vertical' : 'inline');
//     setCollapsed(!collapsed);
//     console.log('按钮等状态:',value,collapsed);
//   };
//   const changeTheme = (value) => {
//     setTheme(value ? 'dark' : 'light');
//   };


//   const toggleCollapsed = (value) => {
//     setMode(value ? 'vertical' : 'inline');
//     setCollapsed(!collapsed);
//     console.log('按钮等状态:',value,collapsed);
//   };

//   return (
//     <>

//       <Button
//         type="primary"
//         onClick={toggleCollapsed}
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       <Switch onChange={changeMode} />收缩列表
//       <Divider type="vertical" />
//       <Switch
//         checked={theme === 'dark'}
//         onChange={changeTheme}
//         checkedChildren="黑暗"
//         unCheckedChildren="明亮"
//       />
//       <Menu
//         // style={{
//         //   width: 100,
//         // }}
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         mode={mode}
//         theme={theme}
//         items={items}
//       />
//     </>
//   );
// };
// export default LeftNav;