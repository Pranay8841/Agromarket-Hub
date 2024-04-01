import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <Link to={`/products/${product._id}`} className="block bg-richblue-400 border-[1px] border-richblue-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative pb-2/3">
                <img
                    src={product?.thumbnail}
                    alt="product thumbnail"
                    className="inset-0 w-[200px] h-[200px] object-cover items-center mx-auto pt-4"
                />
            </div>
            <div className="pt-4 px-4">
                <h3 className="text-lg font-semibold text-white mb-2">{product?.productName}</h3>
                {/* <p className='text-sm text-richblack-200'>{product?.productDescription}</p> */}
                <p className="text-sm text-richblack-50 mb-4">Rs. {product?.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard
