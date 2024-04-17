import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { buyProduct } from "../../../../services/operations/paymentAPI"
import IconButton from "../../../common/IconButton"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyProduct = () => {
    const products = cart.map((product) => product._id)
    buyProduct(token, products, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblue-300 bg-richblue-400 p-6">
      <p className="mb-1 text-sm font-medium text-white">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconButton
        text="Buy Now"
        onclick={handleBuyProduct}
        customClasses="w-full justify-center"
      />
    </div>
  )
}