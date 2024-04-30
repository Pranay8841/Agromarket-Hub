import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../services/operations/ProductAPI';
import Error from './Error';
import { BiInfoCircle } from 'react-icons/bi';
import { formatDate } from '../services/formatDate';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import ProductDetailsCard from '../components/core/Product/ProductDetailsCard';
import ReactMarkdown from 'react-markdown'
import ConfirmationModal from '../components/common/ConfirmationModal';
import { buyProduct } from '../services/operations/paymentAPI';
import Footer from '../components/common/Footer';

const ProductDetails = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    ; (async () => {
      try {
        const res = await fetchProductDetails(productId)
        setResponse(res);
      } catch (error) {
        console.log("Could Not Fetch Product Details")
      }
    })()
  }, [productId]);

  console.log("Response", response)

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const {
    _id: product_id,
    productName,
    productDescription,
    thumbnail,
    price,
    benefits,
    dealer,
    quantityAvailable,
    customerEngaged,
    createdAt,
  } = response?.data

  const handleBuyProduct = () => {
    if (token) {
      buyProduct(token, [productId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px] pt-16">
        <div className="flex mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* Courses Card */}
          <div className="mx-auto min-h-[600px] w-full pb-10 translate-y-24 md:translate-y-0 lg:block">
            <ProductDetailsCard
              product={response?.data}
              setConfirmationModal={setConfirmationModal}
              handleBuyProduct={handleBuyProduct}
            />
          </div>
        </div>
      </div>

      <Footer />
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>


  )
}

export default ProductDetails
