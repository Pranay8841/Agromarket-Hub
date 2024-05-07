import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart } from '../../../slices/cartSlice'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { buyProduct } from '../../../services/operations/paymentAPI'

const ProductCard = ({ product }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.DEALER) {
            toast.error("You are an Dealer. You can't buy a Product.")
            return
        }
        if (token) {
            dispatch(addToCart(product))
            return
        }
        if(!user){
            toast.error("Log in to Buy Prodcut")
            return
        }
    }



    return (
        <div className="flex flex-col items-center justify-between bg-richblue-400 border-[1px] border-richblue-300 transition-all duration-300 gap-3 p-4 mt-10 ml-5 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_0px_95px_53px_#00000024]">
            <Link to={`/products/${product._id}`} className="h-[180px] items-center">
                <img src={product.thumbnail} alt=""
                    className="h-full w-full" />
            </Link>

            <div className="flex flex-col justify-between w-full">
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

            <div className="flex justify-between items-center w-full mt-2">
                <div>
                    <p className="text-yellow-50 font-semibold">
                        ${product.price}
                    </p>
                </div>

                <button className="text-yellow-50 border-[1px] border-white bg-richblack-800 rounded-full font-semibold text-[12px] p-1 px-2 uppercase hover:text-black hover:bg-yellow-50 transition ease-in duration-300"
                    onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard
