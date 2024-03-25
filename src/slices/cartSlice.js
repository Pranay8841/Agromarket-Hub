import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const product = action.payload
        const index = state.cart.findIndex((item) => item._id === product._id)
  
        if (index >= 0) {
          // If the product is already in the cart, do not modify the quantity
          toast.error("Product already in cart")
          return
        }

        // If the Product is not in the cart, add it to the cart
        state.cart.push(product)

        // Update the total quantity and price
        state.totalItems++
        state.total += product.price

        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        
        // show toast
        toast.success("Product added to cart")
      },
      removeFromCart: (state, action) => {
        const productId = action.payload
        const index = state.cart.findIndex((item) => item._id === productId)
  
        if (index >= 0) {
          // If the product is found in the cart, remove it
          state.totalItems--
          state.total -= state.cart[index].price
          state.cart.splice(index, 1)

          // Update to localstorage
          localStorage.setItem("cart", JSON.stringify(state.cart))
          localStorage.setItem("total", JSON.stringify(state.total))
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
          
          // show toast
          toast.success("Product removed from cart")
        }
      },
      resetCart: (state) => {
        state.cart = []
        state.total = 0
        state.totalItems = 0
        
        // Update to localstorage
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")
      },
    },
  })
  
  export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
  
  export default cartSlice.reducer