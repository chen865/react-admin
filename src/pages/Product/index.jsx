import { Route, Routes, Navigate} from 'react-router-dom'
import ProdcutAddAndUpdate from './productAddAndUpdate';
import ProdcutHome from './productHome';
import ProdcutDetail from './productDetail';

// 产品
const Product = () => {

    return (
        <div>
           <Routes>
              <Route path='/' element={<ProdcutHome />}  />
              <Route path='/details' element={<ProdcutDetail />}  />
              <Route path='/addAndUpdate' element={<ProdcutAddAndUpdate />} />
              <Route path='*' element={<Navigate to='/product' replace />} />
            </Routes>
        </div>
    )
}
export default Product;