import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addProductDetails, editProductDetails, fetchProductCategories } from '../../../../../services/operations/ProductAPI';
import { setProduct, setStep } from '../../../../../slices/productSlice';
import toast from 'react-hot-toast';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import ChipInput from './ChipInput';
import Upload from '../Upload';
import IconButton from "../../../../common/IconButton"

const ProductDetailsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { product, editProduct } = useSelector((state) => state.product)
  // console.log("Product apna", product)

  const [loading, setLoading] = useState(false);
  const [productCategories, setProductCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchProductCategories();
      if (categories.length > 0) {
        setProductCategories(categories);
      }

      setLoading(false);
    };

    // If form is in edit mode
    if (editProduct) {
      setValue("productTitle", product.productName);
      setValue("productShortDesc", product.productDescription);
      setValue("productPrice", product.price);
      setValue("productTags", product.tag);
      setValue("productBenefits", product.benefits);
      setValue("productCategory", product.category);
      setValue("productImage", product.thumbnail);
      setValue("productQuantity", product.quantityAvailable);
    };

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (currentValues.productTitle !== product.productName ||
      currentValues.productShortDesc !== product.productDescription ||
      currentValues.productPrice !== product.price ||
      currentValues.productTags.toString() !== product.tag.toString() ||
      currentValues.productBenefits !== product.benefits ||
      currentValues.productCategory._id !== product.category._id ||
      currentValues.productImage !== product.thumbnail ||
      currentValues.productQuantity !== product.quantityAvailable
    ) {
      return true;
    }
    return false;
  }

  // Handle Submit Button Click
  const onSubmit = async (data) => {
    if (editProduct) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("productId", product._id)

        if (currentValues.productTitle !== product.productName) {
          formData.append("productName", data.courseTitle)
        }
        if (currentValues.productShortDesc !== product.productDescription) {
          formData.append("productDescription", data.productShortDesc)
        }
        if (currentValues.productPrice !== product.price) {
          formData.append("price", data.productPrice)
        }
        if (currentValues.productTags.toString() !== product.tag.toString()) {
          formData.append("tag", JSON.stringify(data.productTags))
        }
        if (currentValues.productBenefits !== product.benefits) {
          formData.append("benefits", data.productBenefits)
        }
        if (currentValues.productCategory._id !== product.category._id) {
          formData.append("category", data.productCategory)
        }
        if (currentValues.productImage !== product.thumbnail) {
          formData.append("thumbnailImage", data.productImage)
        }
        if (currentValues.productQuantity !== product.quantityAvailable) {
          formData.append("quantityAvailable", data.productQuantity)
        }

        setLoading(true);

        const result = await editProductDetails(formData, token)

        setLoading(false);

        if (result) {
          dispatch(setStep(2));
          dispatch(setProduct(result));
        }
        else {
          toast.error("No Changes Made to the Form");
        }
        return
      }
    }

    const formData = new FormData();

    formData.append("productName", data.productTitle);
    formData.append("productDescription", data.productShortDesc);
    formData.append("price", data.productPrice);
    formData.append("tag", JSON.stringify(data.productTags));
    formData.append("benefits", data.productBenefits);
    formData.append("category", data.productCategory);
    formData.append("thumbnailImage", data.productImage);
    formData.append("quantityAvailable", data.productQuantity);

    setLoading(true);

    const result = await addProductDetails(formData, token);
    console.log("Product Result", result)

    if (result) {
      dispatch(setStep(2));
      dispatch(setProduct(result));
    }

    setLoading(false);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblue-300 bg-richblue-400 p-6"
    >
      {/* Product Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="productTitle">
          Product Name <sup className="text-pink-200">*</sup>
        </label>

        <input
          id="productTitle"
          placeholder="Enter Product Name"
          {...register("productTitle", { required: true })}
          className="w-full rounded-[0.5rem] bg-white p-[10px] text-richblack-700 border border-richblue-400"
        />
        {
          errors.productTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Product Name is required
            </span>
          )
        }
      </div>

      {/* Product Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="productShortDesc">
          Product Description <sup className="text-pink-200">*</sup>
        </label>

        <textarea
          id="productShortDesc"
          placeholder="Enter Product Description"
          {...register("productShortDesc", { required: true })}
          className="resize-x-none min-h-[130px] w-full rounded-[0.5rem] bg-white p-[10px] text-richblack-700 border border-richblue-400"
        />

        {errors.productShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Description is required
          </span>
        )}

      </div>

      {/* Product Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="productPrice">
          Product Price <sup className="text-pink-200">*</sup>
        </label>

        <div className="relative">
          <input
            id="productPrice"
            placeholder="Enter Product Price"
            {...register("productPrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="!pl-12 w-full rounded-[0.5rem] bg-white p-[10px] text-richblack-700 border border-richblue-400"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-700" />
        </div>

        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Price is required
          </span>
        )}
      </div>

      {/* Product Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="productCategory">
          Product Category <sup className="text-pink-200">*</sup>
        </label>

        <select
          {...register("productCategory", { required: true })}
          defaultValue=""
          id="productCategory"
          className="w-full rounded-[0.5rem] bg-white p-[10px] text-richblack-700 border border-richblue-400"
        >
          <option value="" disabled>
            Choose a Product Category
          </option>

          {!loading &&
            productCategories?.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.productCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Category is required
          </span>
        )}
      </div>

      {/* Product Tags */}
      <ChipInput
        label="Benefits/Advantages"
        name="productTags"
        placeholder="Enter Benefits and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="productImage"
        label="Product Image"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editProduct ? product?.thumbnail : null}
      />

       {/* Benefits of the Product
       <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the Product <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="productBenefits"
          placeholder="Enter benefits of the course"
          {...register("productBenefits", { required: true })}
          className="resize-x-none min-h-[130px] w-full rounded-[0.5rem] bg-white p-[10px] text-richblack-700 border border-richblue-400"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the Product is required
          </span>
        )}
      </div> */}

      {/* Product Quantity */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-white" htmlFor="productQuantity">
          Product Quantity <sup className="text-pink-200">*</sup>
        </label>

        <input
          type='number'
          id="productQuantity"
          placeholder="Enter Product Quantity"
          {...register("productQuantity", { required: true })}
          className="w-full rounded-[0.5rem] bg-white p-[10px] text-richblack-700 border border-richblue-400"
        />
        {
          errors.productQuantity && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Product Quantity is required
            </span>
          )
        }
      </div>

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editProduct && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}

        <IconButton
          disabled={loading}
          text={!editProduct ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconButton>
      </div>
    </form>
  )
}

export default ProductDetailsForm
