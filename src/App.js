// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { ConfigProvider } from 'antd';


function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/*' element={<Admin />}></Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
