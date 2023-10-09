import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './index.css'
import { reqLogin } from '../../api';
import { useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { useLayoutEffect } from 'react';

const App = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {


    //console.log('Received values of form: ', values);
    const { username, password, remember } = values;
    console.log(username, password, remember)

    // // 接口返回的数据内容
    // const response = await reqLogin(username, password)
    // console.log('访问成功', response)
    // const result = response.data
    // if(result.code === 1){
    //   message.success('登录成功')
    //   // 跳转到后台页面

    // }else{
    //   message.error(result.msg)
    // }

    const user = {"name":username}

    console.log(user)
    memoryUtils.user = user
    storageUtils.saveUser(user) // 存储到local里

    navigate("/")

  };





  // 通过下面对表单数据进行交互
  //const [form] = Form.useForm();

  // 如果用户登录,跳转到admin
  const userHistory = memoryUtils.user
  console.log("判定是否登录了",userHistory)

  useLayoutEffect(() => {
    const location = window.location;
    if (JSON.stringify(userHistory) === '{}') {
      // 跳转到登录页面
      // navigate("/login");
      // location.reload(); // 强制刷新页面
      console.log("没有用户了，要跳转到登录页面");
    } else {
      navigate("/");
      location.reload(); // 强制刷新页面
      console.log("用户存在", userHistory);
    }
  }, [navigate, userHistory]);


  return (
    <div className='main'>
      <header className='login-header'>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            username: 'lcy',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            // 配置对象,使用别人写好的定义方式验证
            rules={[
              {
                required: true,
                message: '你还没有输入你的用户名!',
                whitespace: true,
              },
              {
                min: 3,
                message: '用户名不可以低于4位',
              },
              {
                max: 12,
                message: '用户名不可以超过12位',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '必须是英文，数字或下划线组成。',
              },
            ]}

          // 当你为 Form.Item 设置 name 属性后，子组件会转为受控模式。因而 defaultValue 不会生效。你需要在 Form 上通过 initialValues 设置默认值。
          //initialValues = 'admin'
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '别忘记输入你的密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('密码必须要输入！'));
                  } else if (value.length < 4) {
                    return Promise.reject(new Error('密码不能少于4位！'));
                  } else if (value.length > 12) {
                    return Promise.reject(new Error('密码不能多于12位！'));
                  } else if (/^[a-zA-Z0-9_]+$/.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('密码必须是英文，数字或下划线组成。'));
                  }

                }
              })
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/#">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <a href="/#">现在去注册!</a>
          </Form.Item>
        </Form>
      </section>

    </div>

  );
};
export default App;
