import { toast } from "react-hot-toast"

// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { productEndpoints } from "../apis"

const {
    CREATE_PRODUCT_API,
    GET_ALL_PRODUCT_API,
    PRODUCT_DETAILS_API,
    EDIT_PRODUCT_API,
    DELETE_PRODUCT_API,
    PRODUCT_CATEGORIES_API,
    GET_ALL_DEALER_PRODUCTS_API,
    GET_FULL_PRODUCT_DETAILS_AUTHENTICATED,
} = productEndpoints;


export const getAllProducts = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_PRODUCT_API)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Products")
        }
        result = response?.data?.data
    } catch (error) {
        // console.log("GET_ALL_PRODUCT_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchProductDetails = async (productId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector("POST", PRODUCT_DETAILS_API, {
            productId,
        })
        // console.log("PRODUCT_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        // console.log("PRODUCT_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}

// fetching the available Product categories
export const fetchProductCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", PRODUCT_CATEGORIES_API)
        // console.log("PRODUCT_CATEGORIES_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Product Categories")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("PRODUCT_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

// add the Product details
export const addProductDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        // console.log("CREATE PRODUCT API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Product Details")
        }
        toast.success("Product Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE PRODUCT API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

// edit the Product details
export const editProductDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_PRODUCT_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        // console.log("EDIT PRODUCT API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Product Details")
        }
        toast.success("Product Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        // console.log("EDIT Product API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// fetching all products under a specific dealer
export const fetchDealerProducts = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_DEALER_PRODUCTS_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        // console.log("DEALER PRODUCTS API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Dealer Products")
        }
        result = response?.data?.data
    } catch (error) {
        // console.log("DEALER PRODUCTS API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// get full details of a Product
export const getFullDetailsOfProduct = async (productId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_PRODUCT_DETAILS_AUTHENTICATED,
        {
          productId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    //   console.log("PRODUCT_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
    //   console.log("PRODUCT_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }

// delete a product
export const deleteProduct = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
            Authorization: `Bearer ${token}`,
        })
        // console.log("DELETE PRODUCT API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Product")
        }
        toast.success("Product Deleted Successfully")
    } catch (error) {
        // console.log("DELETE PRODUCT API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}