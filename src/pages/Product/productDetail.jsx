import { Card, List, Button } from 'antd'
import { useLocation } from 'react-router-dom'
import './product.css'

const ProdcutDetail = () => {

    const { Item } = List;

    const { state } = useLocation();

    const { goodsName, goodsDesc, goodsPrice, goodsPictures, goodsDetail, parentCategoryName, categoryName } = state.product;

    const objPicture = JSON.parse(goodsPictures);


    const title = (
        <span>
            <Button type="primary" size={'large'} style={{ marginRight: 10 }}
                onClick={() => {
                    window.history.back();
                }}>
                返回
            </Button>
            <span style={{ fontSize: 22 }}>商品详情</span>
        </span>


    )


    return (
        <div>
            <Card title={title} className='goods-detail' >
                <List>
                    <Item>
                        <div>
                            <span className='left'>商品名称：</span>
                            <span className='right'>{goodsName}</span>
                        </div>

                    </Item>
                    <Item>
                        <div>
                            <span className='left'>商品描述：</span>
                            <span>{goodsDesc}</span>
                        </div>

                    </Item>
                    <Item>
                        <div>
                            <span className='left'>商品价格：</span>
                            <span>¥{goodsPrice}</span>
                        </div>

                    </Item>
                    <Item>
                        <div>
                            <span className='left'>所属分类：</span>
                            <span>{parentCategoryName} --> {categoryName}</span>
                        </div>

                    </Item>
                    <Item>
                        <div>
                            <span className='left'>商品图片：</span>
                            <span>
                                {
                                    objPicture.map(img => (
                                        <img className='goods-img' src={img.url} key={img.name} alt='img' />

                                    ))
                                }
                            </span>
                        </div>

                    </Item>
                    <Item>
                        <div>
                            <span className='left'>商品详情：</span>
                            {/* 这样会显示文本里的特殊样式 */}
                            <span dangerouslySetInnerHTML={{__html: goodsDetail}}></span>
                        </div>

                    </Item>
                </List>
            </Card>
        </div>
    )
}

export default ProdcutDetail;