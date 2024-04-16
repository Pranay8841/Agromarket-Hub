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
      <div className="flex flex-col w-full bg-richblue-700 pt-10">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] relative">
          <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[1fr,2fr] py-8 lg:py-0 xl:max-w-[810px]">
            <div className="relative max-h-[30rem] lg:max-h-full">
              {/* <div className="absolute bottom-0 left-0 h-[200px] w-[200px] bg-gradient-to-br from-transparent to-richblue-700"></div> */}
              <img
                src={thumbnail}
                alt="Product thumbnail"
                className="aspect-auto w-full"
              />
            </div>

            <div className="z-30 flex flex-col justify-center gap-4 text-lg text-richblack-5">
              <div>
                <p className="text-4xl font-bold sm:text-[42px]">
                  {productName}
                </p>
              </div>
              <p className="text-richblack-200">{productDescription}</p>
              <div>
                <p>Produced By {`${dealer.firstName} ${dealer.lastName}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="flex mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* Benefits of Product */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What are the Benefits</p>
            <div className="mt-5">
              <ReactMarkdown>{benefits}</ReactMarkdown>
            </div>
          </div>

          {/* Courses Card */}
          <div className="mx-auto hidden min-h-[600px] max-w-[410px] translate-y-24 md:translate-y-0 lg:block">
            <ProductDetailsCard
              product={response?.data}
              setConfirmationModal={setConfirmationModal}
              handleBuyProduct={handleBuyProduct}
            />
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>


  )
}

export default ProductDetails
