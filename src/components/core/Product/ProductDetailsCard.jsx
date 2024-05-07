import copy from 'copy-to-clipboard'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'
import { FaShareSquare } from 'react-icons/fa'
import { BsFillCaretRightFill } from "react-icons/bs"

const ProductDetailsCard = ({ product, setConfirmationModal, handleBuyProduct }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        _id: productId,
        productName: productName,
        productDescription: prodDes,
        dealer: dealer,
        tag: tags,
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
                className={`flex space-x-10 rounded-md bg-richblue-400 border-[1px] border-richblue-300 p-4 text-richblack-5 w-full h-full`}
            >
                <div className='pt-4 w-[60%]'>
                    {/* Course Image */}
                    <img
                        src={ThumbnailImage}
                        alt={product?.productName}
                        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden flex mx-auto rounded-2xl object-cover md:max-w-full"
                    />

                    <div className='px-4 pt-4'>
                        <div className="space-x-3 text-2xl">
                            {productName}
                        </div>

                        <div className="space-x-3 pt-2 text-richblack-200">
                            {prodDes}
                        </div>

                        <div className="space-x-3 pb-4 pt-4 text-xl font-medium text-yellow-100">
                            Produced By {dealer.firstName} {dealer.lastName}
                        </div>
                        <div className="space-x-3 pb-4 text-3xl font-semibold">
                            Rs. {CurrentPrice}
                        </div>
                    </div>

                </div>
                <div className="w-[60%] pt-10">
                    <div className="flex flex-col gap-4">
                        <button
                            className='cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblue-900'
                            onClick={handleBuyProduct}
                        >
                            Buy Now
                        </button>

                        {(!user || !product.customerEngaged.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5">
                                Add to Cart
                            </button>
                        )}
                    </div>
                    <div>
                        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                            7 Days Replacement policy
                        </p>
                    </div>

                    <div className="text-center">
                        <button
                            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                            onClick={handleShare}
                        >
                            <FaShareSquare size={15} /> Share
                        </button>
                    </div>

                    <div className="border-[1px] border-richblue-300 bg-richblue-400 p-4">
                        <p className={`my-2 text-xl font-semibold `}>
                            The Benefits of Product:
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                            {tags.map((tag, i) => {
                                return (
                                    <p className={`flex gap-2`} key={i}>
                                        <BsFillCaretRightFill />
                                        <span>{tag}</span>
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailsCard
