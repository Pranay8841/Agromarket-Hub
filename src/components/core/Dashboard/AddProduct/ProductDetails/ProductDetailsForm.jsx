import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addProductDetails, editProductDetails, fetchProductCategories } from '../../../../../services/operations/ProductAPI';
import { setProduct, setStep } from '../../../../../slices/productSlice';
import toast from 'react-hot-toast';

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

    if (result) {
      dispatch(setStep(2));
      dispatch(setProduct(result));
    }

    setLoading(false);
  }
  return (

    <div>

    </div>
  )
}

export default ProductDetailsForm
