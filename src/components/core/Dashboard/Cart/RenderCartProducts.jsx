import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartProducts = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-1 flex-col">
            {cart.map((product, indx) => (
                <div
                    key={product._id}
                    className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-richblue-300 pb-6"
                        } ${indx !== 0 && "mt-6"} `}
                >
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        <img
                            src={product?.thumbnail}
                            alt={product?.productName}
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-white">
                                {product?.productName}
                            </p>
                            <p className="text-sm text-richblack-200">
                                {product?.category?.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button
                            onClick={() => dispatch(removeFromCart(product._id))}
                            className="flex items-center gap-x-2 rounded-md border-[1px] border-richblue-300 bg-richblue-400 py-2 px-[12px] text-pink-200"
                        >
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>
                        <p className="mb-6 text-2xl font-medium text-yellow-100">
                            ₹ {product?.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RenderCartProducts
