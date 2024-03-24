const BASE_URL = "http://localhost:4000"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password",
}

// PRODUCT ENDPOINTS
export const productEndpoints = {
  CREATE_PRODUCT_API: BASE_URL + "/api/v1/product/createProduct",
  GET_ALL_PRODUCT_API: BASE_URL + "/api/v1/product/getAllProducts",
  PRODUCT_DETAILS_API: BASE_URL + "/api/v1/product/getProductDetails",
  EDIT_PRODUCT_API: BASE_URL + "/api/v1/product/editProduct",
  DELETE_PRODUCT_API: BASE_URL + "/api/v1/product/deleteProduct",
  PRODUCT_CATEGORIES_API: BASE_URL + "/api/v1/product/showAllCategories",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/api/v1/product/showAllCategories",
}

// CATALOG PAGE DATA
export const categoryPageData = {
  CATEGORYPAGEDATA_API: BASE_URL + "/api/v1/product/getCategoryPageDetails",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/api/v1/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/api/v1/profile/deleteProfile",
}