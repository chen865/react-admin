import { useNavigate } from 'react-router-dom'
import { useState, useLayoutEffect} from 'react';
import './index.css'
import { formateDate } from '../../utils/dataUtils'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqWeather } from '../../api';
import menuList from '../../config/menuConfig';
import { Modal } from 'antd';



const Header = () => {

    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));

    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');

    const username = memoryUtils.user.name;

    const title = getTitle();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        // 删除保存的user数据
        storageUtils.removeUser();
        memoryUtils.user = {}
        // 跳转login
        navigate("/login");
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function getTime() {
        console.log('获取时间的任务')
        setInterval(() => {
            const newCurrentTime = formateDate(Date.now());
            setCurrentTime(newCurrentTime);
        }, 1000);
       
    }

    async function getWeather() {
        const { province, city, weather } = await reqWeather('110101');
        setProvince(province);
        setCity(city);
        setWeather(weather);
    }

    function getTitle() {
        // 获取当前请求路径
        const urlParams = new URL(window.location.href);
        const pathname = urlParams?.pathname;
        let titie;
        menuList.forEach(item => {
            if (item.key === pathname) {
                titie = item.title;
            } else if (item.children) {
                // 子item查找
                const cItem = item.children.find(cItem => cItem.key === pathname);
                // 有值表示匹配了
                if (cItem) {
                    titie = cItem.title;
                }
            }
        })
        return titie;
    }

    function logout(){
        showModal();
    }

    useLayoutEffect(() => {
        // 更新时间
        getTime();
        // 获取天气
        getWeather();
    },);

    return (
        <div className='header'>
            <div className='header-top'>
                <span>欢迎,{username}</span>
                <a href='#!' onClick={logout}>退出</a>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>确定要退出么？</p>
                </Modal>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>{title}</div>
                <div className='header-bottom-right'>
                    <span>{currentTime} </span>
                    <span>{province} {city} {weather}</span>
                </div>
            </div>
        </div>
    )
}
export default Header;