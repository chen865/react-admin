import { Card, Table, Button, Space } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton'

// 商品分类
const Category = () => {

  const title = '一级分类列表';

  const extra = (
    <Button type='primary'>
      <PlusCircleOutlined />
      添加
    </Button>)

  const dataSource = [
    { "parentId": 0, "id": 1, "name": "电子产品", "type": "category" },
    { "parentId": 0, "id": 2, "name": "服装", "type": "category" },
    { "parentId": 0, "id": 3, "name": "食品", "type": "category" },
    { "parentId": 0, "id": 4, "name": "家居", "type": "category" },
    { "parentId": 0, "id": 5, "name": "运动用品", "type": "category" },
    { "parentId": 0, "id": 6, "name": "图书", "type": "category" },
    { "parentId": 0, "id": 7, "name": "美妆", "type": "category" },
    { "parentId": 0, "id": 8, "name": "玩具", "type": "category" },
    { "parentId": 0, "id": 9, "name": "珠宝", "type": "category" },
    { "parentId": 0, "id": 10, "name": "汽车配件", "type": "category" },
  ];

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
      render: () => (
        <Space>
          <LinkButton>修改分类</LinkButton >
          <LinkButton>查看子类</LinkButton>
        </Space>

      )
    },
  ];

  return (
    <Card
      title={title}
      extra={extra}
      type="inner"
    >
      <Table dataSource={dataSource} columns={columns} bordered rowKey='id' />
    </Card>
  )
}
export default Category;