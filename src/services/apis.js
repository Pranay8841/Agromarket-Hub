const BASE_URL = "https://agromarket-hub.onrender.com"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/api/v1/profile/getUserDetails",
  GET_USER_ORDERS_API: BASE_URL + "/api/v1/profile/getMyOrders",
  GET_DEALER_DATA_API: BASE_URL + "/api/v1/profile/dealerDashboard",
}


// FARMERS ENDPOINTS
export const farmerEndpoints = {
  PRODUCT_PAYMENT_API: BASE_URL + "/api/v1/payment/capturePayment",
  PRODUCT_VERIFY_API: BASE_URL + "/api/v1/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/api/v1/payment/sendPaymentSuccessEmail",
}

// PRODUCT ENDPOINTS
export const productEndpoints = {
  CREATE_PRODUCT_API: BASE_URL + "/api/v1/product/createProduct",
  GET_ALL_PRODUCT_API: BASE_URL + "/api/v1/product/getAllProducts",
  PRODUCT_DETAILS_API: BASE_URL + "/api/v1/product/getProductDetails",
  EDIT_PRODUCT_API: BASE_URL + "/api/v1/product/editProduct",
  DELETE_PRODUCT_API: BASE_URL + "/api/v1/product/deleteProduct",
  PRODUCT_CATEGORIES_API: BASE_URL + "/api/v1/product/showAllCategories",
  GET_ALL_DEALER_PRODUCTS_API: BASE_URL + "/api/v1/product/getDealerProducts",
  GET_FULL_PRODUCT_DETAILS_AUTHENTICATED: BASE_URL + "/api/v1/product/getFullProductDetails",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/api/v1/product/showAllCategories",
}

// CATALOG PAGE DATA
export const categoryPageData = {
  CATEGORYPAGEDATA_API: BASE_URL + "/api/v1/product/getCategoryPageDetails",
}

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/api/v1/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/api/v1/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/api/v1/profile/deleteProfile",
}