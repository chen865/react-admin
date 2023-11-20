import { useState, useEffect } from 'react';
import { Card, Table, Button, Space, message, Modal } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton'
import { reqCategorys, reqChildCategorys, reqUpdateCategorys, reqAddCategorys } from '../../api';
import AddForm from './addForm';
import UpdateForm from './updateForm';

// 商品分类
const Category = () => {

  const title = '一级分类列表';
  // 一级分类
  const [categorys, setCategorys] = useState([]);
  // 子集分类存储
  const [subCategorys, setSubCategorys] = useState([]);
  // 配置是否显示loading，设置默认值
  const [loading, setLoading] = useState(false);
  // 父级名称
  const [parentName, setParentName] = useState('');
  const [parentId, setParentId] = useState(0);
  // 两个弹窗 0 不显示 1 添加 2 修改
  const [modalStatus, setModalStatus] = useState(0);

  // 存储指定分类数据
  const [category, setCategory] = useState({});

  const extra = (
    <Button type='primary' onClick={showAdd}>
      <PlusCircleOutlined />
      添加
    </Button>)

  // const dataSource = [
  //   { "parentId": 0, "id": 1, "name": "电子产品", "type": "category" },
  //   { "parentId": 0, "id": 2, "name": "服装", "type": "category" },
  //   { "parentId": 0, "id": 3, "name": "食品", "type": "category" },
  //   { "parentId": 0, "id": 4, "name": "家居", "type": "category" },
  //   { "parentId": 0, "id": 5, "name": "运动用品", "type": "category" },
  //   { "parentId": 0, "id": 6, "name": "图书", "type": "category" },
  //   { "parentId": 0, "id": 7, "name": "美妆", "type": "category" },
  //   { "parentId": 0, "id": 8, "name": "玩具", "type": "category" },
  //   { "parentId": 0, "id": 9, "name": "珠宝", "type": "category" },
  //   { "parentId": 0, "id": 10, "name": "汽车配件", "type": "category" },
  // ];

  // 初始化数据

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width: 300,
      render: (record) => (
        <Space>
          <LinkButton onClick={() => showUpdate(record)}>修改分类</LinkButton >
          {parentId === 0 ? <LinkButton onClick={() => showSubCategorys(record)}>查看子类</LinkButton> : null}
        </Space>

      )
    },
  ];


  // 获取分类数据 
  async function getCategorys() {
    // 发请求前，显示loading
    setLoading(true);
    const result = await reqCategorys();
    // 请求完成后，隐藏loading
    setLoading(false);
    //console.log("获取分类里的请求：",result)
    if (result.data.code === 1) {
      setCategorys(result.data.result.data);
    } else {
      message.error('获取数据分类失败')
    }

  }

  // 获取子类数据
  async function getSubCategorys(id) {
    // 发请求前，显示loading
    setLoading(true);
    const result = await reqChildCategorys(id);
    // 请求完成后，隐藏loading
    setLoading(false);
    if (result.data.code === 1) {
      setSubCategorys(result.data.result.data);
    } else {
      message.error('获取数据分类失败')
    }

  }

  // 显示指定一级分类的二级分类列表
  function showSubCategorys(record) {
    console.log('父级id', record)
    // 父级名称
    setParentName(record.name)
    setParentId(record.id)
    getSubCategorys(record.id)
  }

  // 显示一级分类列表
  function showFirstCategorys() {
    setParentName('')
    setParentId(0)
    setSubCategorys([])
  }

  // 显示添加弹窗
  function showAdd() {
    setModalStatus(1)
  }

  // 显示修改弹窗
  function showUpdate(record) {
    // 保存分类对象
    setCategory(record)
    setModalStatus(2);
  }

  // 隐藏确定框
  function handleCancel() {
    setModalStatus(0);
  }

  let formInstance;

  function saveForm(form) {
    formInstance = form;
  }

  // 添加分类
  async function addCategorys() {
    // 隐藏确定框
    setModalStatus(0);
    // 发请求添加分类
    const { addId, addName } = formInstance.getFieldsValue();
    //console.log('父亲添加分类的参数：', addId, addName);
    const result = await reqAddCategorys(addName, addId, '');

    if (result.data.code === 1) {
      // 重新显示列表
      if (parentId === 0) {
        getCategorys();
      } else {
        getSubCategorys(parentId)
      }
    }
  }

  // 更新分类 
  async function updateCategorys() {
    // 隐藏确定框
    setModalStatus(0);

    // 发请求更新分类
    const categoryId = category.id;
    const { updateName } = formInstance.getFieldsValue();
    //console.log('更新分类的参数：', categoryId, updateName)

    const result = await reqUpdateCategorys(categoryId, updateName);

    if (result.data.code === 1) {
      // 重新显示列表
      if (parentId === 0) {
        getCategorys();
      } else {
        getSubCategorys(parentId)
      }
    }
  }



  useEffect(() => {
    getCategorys();
  }, []);

  let categoryName1 = category.name || '';


  return (
    <Card
      title={parentId === 0 ? title : (<span>
        <LinkButton onClick={showFirstCategorys}>{title}</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>)}

      extra={extra}
      type="inner"
    >
      <Table dataSource={parentId === 0 ? categorys : subCategorys} columns={columns} bordered rowKey='id'
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        loading={loading}
      />
      <Modal title="添加分类" open={modalStatus === 1} onOk={addCategorys} onCancel={handleCancel} destroyOnClose={true}>
        <AddForm categorys={categorys} parentId={parentId} saveForm={saveForm} />
      </Modal>
      <Modal title="更新分类" open={modalStatus === 2} onOk={updateCategorys} onCancel={handleCancel} destroyOnClose={true} >
        <UpdateForm categoryName={categoryName1} saveForm={saveForm} />
      </Modal>
    </Card>
  )
}
export default Category;