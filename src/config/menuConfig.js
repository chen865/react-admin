const menuList = [
{
    title: '首页',
    key: 'home',
    icon: 'PieChartOutlined'
},
{
    title: '用户管理',
    key: 'user',
    icon: 'DesktopOutlined'
},
{
    title: '角色管理',
    key: 'role',
    icon: 'ContainerOutlined'
},
{
    title: '商品',
    key: 'products',
    icon: 'MailOutlined',
    children: [
        {
            title: '商品管理',
            key: 'product',
            icon: 'PieChartOutlined'
        },
        {
            title: '品类管理',
            key: 'category',
            icon: 'PieChartOutlined'
        }
    ]
},
{
    title: '图形图表',
    key: 'sub',
    icon: 'AppstoreOutlined',
    children: [
        {
            title: '条形图',
            key: 'bar',
            icon: 'PieChartOutlined'
        },
        {
            title: '折线图',
            key: 'line',
            icon: 'PieChartOutlined'
        },
        {
            title: '饼图',
            key: 'pie',
            icon: 'PieChartOutlined'
        }
    ]
}
];

export default menuList;
