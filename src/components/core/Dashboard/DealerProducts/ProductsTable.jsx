import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProduct, fetchDealerProducts } from '../../../../services/operations/ProductAPI'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from '../../../../services/formatDate'
import { PRODUCT_STATUS } from '../../../../utils/constants'
import { HiClock } from 'react-icons/hi'
import { FaCheck } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ConfirmationModal from '../../../common/ConfirmationModal'

const ProductsTable = ({products, setProducts}) => {
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)

    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)

    const TRUNCATE_LENGTH = 30

    const handleProductDelete = async (productId) => {
        setLoading(true)
        await deleteProduct({ productId: productId }, token)
        const result = await fetchDealerProducts(token)
        if (result) {
            setProducts(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    // console.log("All Course ", courses)

    return (
        <>
            <Table className="rounded-xl border-[1px] border-richblue-300 bg-richblue-400">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblue-300 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-white">
                            Products
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-white">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-white">
                            Quantity
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-white">
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {products?.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-white">
                                No Products found
                                {/* TODO: Need to change this state */}
                            </Td>
                        </Tr>
                    ) : (
                        products?.map((product) => (
                            <Tr
                                key={product._id}
                                className="flex gap-x-16 border-b border-richblue-300 px-6 py-8"
                            >
                                <Td className="flex flex-1 gap-x-4">
                                    <img
                                        src={product?.thumbnail}
                                        alt={product?.productName}
                                        className="h-[148px] w-[220px] rounded-lg object-cover"
                                    />

                                    <div className="flex flex-col justify-between">
                                        <p className="text-lg font-semibold text-white">
                                            {product.productName}
                                        </p>

                                        <p className="text-xs text-richblack-200">
                                            {product.productDescription.split(" ").length >
                                                TRUNCATE_LENGTH
                                                ? product.productDescription
                                                    .split(" ")
                                                    .slice(0, TRUNCATE_LENGTH)
                                                    .join(" ") + "..."
                                                : product.productDescription}
                                        </p>

                                        <p className="text-[12px] text-white">
                                            Created: {formatDate(product.createdAt)}
                                        </p>

                                        {product.status === PRODUCT_STATUS.DRAFT ? (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblue-400 border-[1px] border-richblue-200 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                <HiClock size={14} />
                                                Drafted
                                            </p>
                                        ) : (
                                            <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblue-400 border-[1px] border-richblue-200 px-2 py-[2px] text-[12px] font-bold text-yellow-50">
                                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-50 text-richblack-700">
                                                    <FaCheck size={8} />
                                                </div>
                                                Available
                                            </div>
                                        )}
                                    </div>
                                </Td>

                                <Td className="text-sm font-medium text-white">
                                    ₹{product.price}
                                </Td>
                                
                                <Td className="text-sm font-medium text-white">
                                    {product.quantityAvailable}
                                </Td>

                                <Td className="text-sm font-medium text-white ">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            navigate(`/dashboard/edit-product/${product._id}`)
                                        }}
                                        title="Edit"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2:
                                                    "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => handleProductDelete(product._id)
                                                    : () => { },
                                                btn2Handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : () => { },
                                            })
                                        }}
                                        title="Delete"
                                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default ProductsTable
