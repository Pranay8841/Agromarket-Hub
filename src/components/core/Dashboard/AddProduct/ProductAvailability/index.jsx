import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_STATUS } from '../../../../../utils/constants'
import { resetProductState, setStep } from '../../../../../slices/productSlice'
import { editProductDetails } from '../../../../../services/operations/ProductAPI'
import IconButton from '../../../../common/IconButton'
import { useForm } from 'react-hook-form'

const ProductAvailability = () => {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)
  const { product } = useSelector((state) => state.product)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product?.status === PRODUCT_STATUS.AVAILABLE) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToProducts = () => {
    dispatch(resetProductState())
    navigate("/dashboard/my-products")
  }

  const handleProductAvailability = async () => {
    // check if form has been updated or not
    if (
      (product?.status === PRODUCT_STATUS.AVAILABLE &&
        getValues("public") === true) ||
      (product?.status === PRODUCT_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToProducts()
      return
    }

    const formData = new FormData()
    formData.append("productId", product._id)
    const productStatus = getValues("public")
      ? PRODUCT_STATUS.AVAILABLE
      : PRODUCT_STATUS.DRAFT
    formData.append("status", productStatus)

    setLoading(true)
    const result = await editProductDetails(formData, token)
    if (result) {
      goToProducts()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleProductAvailability()
  }

  return (
    <div className="rounded-md border-[1px] border-richblue-300 bg-richblue-400 p-6">
      <p className="text-2xl font-semibold text-white">
        Product Availability Settings
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />

            <span className="ml-2 text-richblack-400">
              Make this Product Available to Public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>

          <IconButton disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}

export default ProductAvailability
