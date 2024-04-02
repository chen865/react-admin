const menuList = [
{
    title: '首页',
    key: '/home',
    icon: 'DesktopOutlined',
    isPublic: true // 公开的
},
{
    title: '用户管理',
    key: '/user',
    icon: 'UserAddOutlined'
},
{
    title: '角色管理',
    key: '/role',
    icon: 'TeamOutlined'
},
{
    title: '商品',
    key: '/products',
    icon: 'ShopOutlined',
    children: [
        {
            title: '品类管理',
            key: '/category',
            icon: 'ProfileOutlined'
        },
        {
            title: '商品管理',
            key: '/product',
            icon: 'ReconciliationOutlined'
        },
       
    ]
},
{
    title: '图形图表',
    key: '/sub',
    icon: 'AppstoreOutlined',
    children: [
        {
            title: '条形图',
            key: '/bar',
            icon: 'BarChartOutlined'
        },
        {
            title: '折线图',
            key: '/line',
            icon: 'LineChartOutlined'
        },
        {
            title: '饼图',
            key: '/pie',
            icon: 'PieChartOutlined'
        }
    ]
}
];

export default menuList;
