import copy from 'copy-to-clipboard'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'
import { FaShareSquare } from 'react-icons/fa'

const ProductDetailsCard = ({ product, setConfirmationModal, handleBuyProduct }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        _id: productId,
    } = product

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.DEALER) {
            toast.error("You are an Dealer. You can't buy a Product.")
            return
        }
        if (token) {
            dispatch(addToCart(product))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }
    return (
        <>
            <div
                className={`flex flex-col gap-4 rounded-md bg-richblue-400 border-[1px] border-richblue-300 p-4 text-richblack-5`}
            >
                {/* Course Image */}
                <img
                    src={ThumbnailImage}
                    alt={product?.productName}
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />

                <div className="px-4">
                    <div className="space-x-3 pb-4 text-3xl font-semibold">
                        Rs. {CurrentPrice}
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                         onClick={handleBuyProduct}
                        >
                            Buy Now 
                        </button>

                        {(!user || !product.customerEngaged.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="blackButton">
                                Add to Cart
                            </button>
                        )}
                    </div>
                    <div>
                        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                            7 Days Replacement policy
                        </p>
                    </div>

                    {/* <div className={``}>
                        <p className={`my-2 text-xl font-semibold `}>
                            This Course Includes :
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                            {product?.instructions?.map((item, i) => {
                                return (
                                    <p className={`flex gap-2`} key={i}>
                                        <BsFillCaretRightFill />
                                        <span>{item}</span>
                                    </p>
                                )
                            })}
                        </div>
                    </div> */}
                    <div className="text-center">
                        <button
                            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                            onClick={handleShare}
                        >
                            <FaShareSquare size={15} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailsCard