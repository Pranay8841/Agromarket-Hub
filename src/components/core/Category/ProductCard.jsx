import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const { cart } = useSelector((state) => state)

    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addToCart(product));
        toast.success("Item Added To Cart")
    }

    const removeFromCart = () => {
        dispatch(removeFromCart(product.id));
        toast.error("Item Removed From Cart")
    }
    return (
        <Link to={`/products/${product._id}`} className="flex flex-col items-center justify-between bg-richblue-400 border-[1px] border-richblue-300 transition-all duration-300 gap-3 p-4 mt-10 ml-5 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_0px_95px_53px_#00000024]">
            <div className="flex flex-col justify-between items-center w-full">
                <div>
                    <h1 className='text-white font-semibold text-lg truncate mt-1 w-40'>
                        {product.productName}
                    </h1>
                </div>

                <div>
                    <p className="w-40 text-richblack-200 font-normal text-[10px] text-left">
                        {product.productDescription.split(" ").slice(0, 10).join(" ") + "..."}
                    </p>
                </div>
            </div>

            <div className="h-[180px] items-center">
                <img src={product.thumbnail} alt=""
                    className="h-full w-full" />
            </div>

            <div className="flex justify-between items-center w-full mt-3">
                <div>
                    <p className="text-yellow-50 font-semibold">
                        ${product.price}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
