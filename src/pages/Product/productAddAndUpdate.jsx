import { Card, Button, Form, Input, Cascader, Tooltip, message } from 'antd'
import {
    EditOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { reqCategoryCascade, reqAddOrUpdateGoods } from '../../api'
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'
import PictureWall from './picture-wall';
//import RichTextEditor from './richTextEditor';
import TinymceText from './tinymceText';



const ProdcutAddAndUpdate = () => {

    // 获取修改页面跳转过来的数据
    const { state } = useLocation();

    const product = state != null ? state.product : {};

    //console.log('修改页面跳转过来的数据', product);

    const { TextArea, } = Input;

    // 用于获取子组件的数据 通过ref
    const childRef = useRef();
    const getDetail = useRef();

    const title = (
        <span>
            <Button type="primary" size={'large'} style={{ marginRight: 10 }}
                onClick={() => {
                    window.history.back();
                }}>
                返回
            </Button>
            <span style={{ fontSize: 22 }}>{state != null ? '修改商品' : '新增商品'}</span>
        </span>
    )

    // item布局
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
    };

    const updateForm = async (values) => {
        // 表单校验成功后

        // 调用子组件的 getImages 函数
        const imageUrl = childRef.current.getImages();
        //console.log('子组件的图片地址', imageUrl);

        const detail = getDetail.current.getDetail();
        //console.log('富文本编辑器的内容', detail);

        // 封装商品对象
        const { goodsName, goodsDesc, goodsPrice, goodsCategory } = values;

        let categoryId, parentCategoryId;
        if (goodsCategory.length === 1) {
            parentCategoryId = goodsCategory[0];
        } else {
            parentCategoryId = goodsCategory[0];
            categoryId = goodsCategory[1];
        }

        const goods = {
            goodsName,
            goodsDesc,
            goodsPrice,
            categoryId,
            parentCategoryId,
            picturesArray: imageUrl,
            goodsDetail: detail
        }

        if (state != null) {
            goods.goodsId = product.goodsId;
        }

        //console.log('封装的商品对象', goods);

        const result = await reqAddOrUpdateGoods(goods);

        if (result.data.code === 1) {
            message.success('操作成功');
            // 返回上一级页面
            window.history.back();
        }else{
            message.error('操作失败');
        }
    }

    const [options, setOptions] = useState([])


    useEffect(() => {
        getProductCategory();
    }, []);

    async function getProductCategory() {
        const result = await reqCategoryCascade();
        if (result.data.code === 1) {
            setOptions(result.data.result.data);
        }
    }


    return (
        <div>
            <Card title={title}  >
                <Form {...formItemLayout} onFinish={updateForm}>
                    <Form.Item label='商品名称'
                        name='goodsName'
                        initialValue={product.goodsName}
                        rules={[
                            { required: true, message: '商品名称必须输入' },
                        ]}
                    >
                        <Input prefix={<EditOutlined />} suffix={
                            <Tooltip title="注意非法字符不可使用，@#等">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        } placeholder='请输入名称' />
                    </Form.Item>

                    <Form.Item label='商品描述'
                        name='goodsDesc'
                        initialValue={product.goodsDesc}
                        rules={[
                            { required: true, message: '商品描述必须输入' },
                        ]}
                    >
                        <TextArea placeholder='请输入描述' autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>

                    <Form.Item label='商品价格'
                        name='goodsPrice'
                        initialValue={product.goodsPrice}
                        rules={[
                            { required: true, message: '商品价格必须输入' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value > 0) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('价格必须大于0'));
                                },
                            }),
                        ]}
                    >
                        <Input type='number' prefix='¥' suffix="RMB" placeholder='请输入商品价格' />
                    </Form.Item>


                    <Form.Item label='商品分类'
                        name='goodsCategory'
                        initialValue={product.parentCategoryId != null ?
                            product.categoryId != null ? [product.parentCategoryId.toString(), product.categoryId.toString()]
                                : [product.parentCategoryId.toString()] : []}
                        rules={[
                            {
                                type: 'array',
                                required: true,
                                message: '请选择商品分类!',
                            },
                        ]}
                    >
                        <Cascader options={options}
                            // defaultValue={ product.parentCategoryId != null ? 
                            //     product.categoryId != null ? [product.parentCategoryId.toString(), product.categoryId.toString()] 
                            //     : [product.parentCategoryId.toString()] :[] }
                            placeholder="请选择分类" />
                    </Form.Item>

                    <Form.Item label='商品图片'>
                        <PictureWall ref={childRef} imgs={product.goodsPictures} />
                    </Form.Item>


                    {/* <Form.Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 20}} >
                       <RichTextEditor ref={getDetail} detail={product.goodsDetail} />
                    </Form.Item> */}

                    <Form.Item label='新的商品详情' labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} >
                        <TinymceText ref={getDetail} detail={product.goodsDetail} />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType="submit">提交</Button>
                    </Form.Item>


                </Form>
            </Card>
        </div>
    )
}
export default ProdcutAddAndUpdate;