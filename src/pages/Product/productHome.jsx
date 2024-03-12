import { Card, Select, Button, Input, Table, message } from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import LinkButton from '../../components/LinkButton';
import { reqAllGoods, reqGoodsStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';



const { Option } = Select;





const ProdcutHome = () => {

    const [product, setProduct] = useState([]);


    // 配置是否显示loading，设置默认值
    const [loading, setLoading] = useState(false);

    // 商品总数量
    const [total, setTotal] = useState(0);

    // 搜索列表和搜索分类
    const [searchName, setSearchName] = useState();
    const [searchType, setSearchType] = useState(1);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const navigate = useNavigate();


    async function getAllGoods(page, size) {
        // 发送请求前显示loading
        setLoading(true);
        let result;
        if (searchName && searchType) {
            // searchName如果有数据，表示是带搜索的查询
            result = await reqAllGoods(page, size, searchName, searchType);
        } else {
            result = await reqAllGoods(page, size, null, null);
        }
        // 请求完成后关闭loading
        setLoading(false);
        if (result.data.code === 1) {
            setProduct(result.data.result.data.records);
            setTotal(result.data.result.data.total);
            setCurrent(result.data.result.data.current)
            setPageSize(result.data.result.data.size)
        } else {
            message.error('获取商品列表失败！')
        }
    }

    async function updateGoodsStatus(goodsId, status) {
          status = status === 1 ? 2 : 1;
        // 发送请求前显示loading
        setLoading(true);
        const result = await reqGoodsStatus(goodsId, status);
        // 请求完成后关闭loading
        setLoading(false);
        if (result.data.code === 1) {
            message.success('更新商品状态成功')
            getAllGoods(current,pageSize);
        } else {
            message.error('更新商品状态失败！')
        }
    }


    useEffect(() => {
        getGoods(); // eslint-disable-next-line
    },[]);


    function getGoods() {
        getAllGoods(1, PAGE_SIZE)
    }


    const columns = [
        {
            title: '商品名称',
            dataIndex: 'goodsName',
        },
        {
            title: '商品描述',
            dataIndex: 'goodsDesc',
        },
        {
            title: '价格',
            dataIndex: 'goodsPrice',
            render: (price) => '¥' + price
        },
        {
            title: '状态',
            width: 100,
            //dataIndex: 'status',
            render: (product) => {
                const {goodsId,status} = product

                return (
                    <span>
                        <Button type='primary' onClick={()=>{updateGoodsStatus(goodsId,status)}}>
                            {status === 1 ? '下架' : '上架'}
                        </Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                    </span>
                )
            }
        },
        {
            title: '操作',
            width: 100,
            render: (product) => {
                return (
                    <span>
                        <LinkButton onClick={() => navigate("/product/details", { state: { product } })}>详情</LinkButton>
                        <LinkButton onClick={() => navigate("/product/addAndUpdate", { state: { product } })}>修改</LinkButton>
                    </span>
                )
            }
        }
    ];




    const title = (
        <span>
            <Select value={searchType} style={{ width: 150 }} onChange={value => setSearchType(value)} >
                <Option value={1}>按名称搜索</Option>
                <Option value={2}>按描述搜索</Option>
            </Select>
            <Input placeholder='关键词' style={{ width: 200, margin: '0 15px' }} value={searchName}
                onChange={event => setSearchName(event.target.value)} />
            <Button type='primary' onClick={event => getAllGoods(current, pageSize)}>搜索</Button>
        </span>
    )

    const extra = (
        <Button type='primary' onClick={() => navigate("/product/addAndUpdate")}>
            <PlusOutlined />
            添加商品
        </Button>
    )

    return (
        <Card title={title} extra={extra}>
            <Table dataSource={product} columns={columns} rowKey='goodsId'
                bordered loading={loading}
                pagination={{
                    defaultPageSize: PAGE_SIZE, showQuickJumper: true, total: total,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: (page, size) => getAllGoods(page, size),
                }}
            />
        </Card>
    )
}
export default ProdcutHome;