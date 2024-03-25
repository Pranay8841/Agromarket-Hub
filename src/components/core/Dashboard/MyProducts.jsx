import React, { useEffect, useState } from 'react'
import IconButton from '../../common/IconButton'
import { VscAdd } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchDealerProducts } from '../../../services/operations/ProductAPI'
import ProductsTable from './DealerProducts/ProductsTable'

const MyProducts = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
  
    useEffect(() => {
      const fetchProducts = async () => {
        const result = await fetchDealerProducts(token)
        if (result) {
          setProducts(result)
        }
      }
      fetchProducts()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return (
      <div>
        <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">My Products</h1>
           
          <IconButton
            text="Add Product"
            onclick={() => navigate("/dashboard/add-product")}
          >
            <VscAdd />
          </IconButton>
        </div>
        {products && <ProductsTable products={products} setProducts={setProducts} />}
      </div>
    )
}

export default MyProducts
