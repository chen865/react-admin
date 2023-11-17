import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils';
import { useEffect } from 'react';
import { Layout } from 'antd';
import Header from '../../components/Header';
import LeftNav from '../../components/LeftNav';
import Home from '../Home';
import Category from '../Category';
import Product from '../Product';
import Role from '../Role';
import User from '../User';
import Bar from '../Chart/bar';
import Line from '../Chart/line';
import Pie from '../Chart/pie';

const { Footer, Sider, Content } = Layout;

// const headerStyle = {
//   textAlign: 'center',
//   color: '#fff',
//   height: 200,
//   paddingInline: 50,
//   lineHeight: '94px',
//   backgroundColor: '#108ee9',
// };
const contentStyle = {
  //textAlign: 'center',
  minHeight: 140,
  lineHeight: '120px',
  color: '#fff',
  //backgroundColor: '#108ee9',
  margin: 20
};
const siderStyle = {
  // textAlign: 'center',
  // lineHeight: '120px',
  // color: '#fff',
  // backgroundColor: '#3ba0e9',
};

const footerStyle = {
  textAlign: 'center',
  color: 'black',
  backgroundColor: 'white',
};


function Admin() {

  const navigate = useNavigate();

  const user = memoryUtils.user

 //console.log('Admin 组件被渲染了'); // 添加这行日志

  useEffect(() => {
    //console.log('useEffect 被执行了'); // 添加这行日志
    const location = window.location;
    if (JSON.stringify(user) === '{}') {
      // 跳转到登录页面
      navigate("/login");
      location.reload(); // 强制刷新页面
      console.log("没有用户了，要跳转到登录页面");
    } else {
      console.log("admin页面验证用户存在:", user);
    }
  }, [user, navigate]); // 将 user 添加到依赖数组中



  return (
    <div>
      <Layout style={{
        minHeight: '100vh',
      }}>
        <Sider style={siderStyle}><LeftNav /></Sider>
        <Layout>
          <Header />
          <Content style={contentStyle}>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/category' element={<Category />} />
              <Route path='/product' element={<Product />} />
              <Route path='/role' element={<Role />} />
              <Route path='/user' element={<User />} />
              <Route path='/bar' element={<Bar />} />
              <Route path='/line' element={<Line />} />
              <Route path='/pie' element={<Pie />} />
              <Route path='/' element={<Navigate to='/home' />} />
            </Routes>
          </Content>
          <Footer style={footerStyle}>Copyright © 2023 - 2023  Chen.io</Footer>
        </Layout>
      </Layout>
    </div>
  );

}
export default Admin

