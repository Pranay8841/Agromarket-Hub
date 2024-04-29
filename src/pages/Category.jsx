import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCategoryPageData } from '../services/operations/categoryPageAPI';
import Error from "./Error"
import ProductCard from '../components/core/Category/ProductCard';
import Footer from '../components/common/Footer';

const Category = () => {
    const { loading } = useSelector((state) => state.profile)
    const { categoryName } = useParams();

    const [active, setActive] = useState(1);
    const [categoryPageData, setCategoryPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    // console.log("Category Page Data", categoryPageData)

    // Fetch all Categories
    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = res?.data?.data?.filter((cat) => cat.name.split(" ").join("-").toLowerCase() === categoryName)[0]._id;

            setCategoryId(category_id);
        }

        getCategories();
    }, [categoryName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCategoryPageData(categoryId);
                console.log("Printing Result: ", res);

                setCategoryPageData(res);
            } catch (error) {
                console.log(error);
            }
        }

        if (categoryId) {
            console.log("Category Id", categoryId)
            getCategoryDetails();
        }
    }, [categoryId]);

    if (loading || !categoryPageData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!loading && !categoryPageData.success) {
        return <Error />
    }

    return (
        <>
            {/* Hero Section */}
            <div className=" box-content bg-richblue-700 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-white">
                        {`Home / Products / `}
                        <span className="text-yellow-25">
                            {
                                categoryPageData?.data?.selectedCategory?.name
                            }
                        </span>
                    </p>
                    <p className="text-3xl text-white">
                        {categoryPageData?.data?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {categoryPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="py-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 sm:grid-cols-2">
            {categoryPageData?.data?.selectedCategory.products
              .map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
        </>
    )
}

export default Category
