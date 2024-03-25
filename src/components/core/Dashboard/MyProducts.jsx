// import React, { useEffect, useState } from 'react'
// import IconButton from '../../common/IconButton'
// import { VscAdd } from 'react-icons/vsc'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const MyProducts = () => {
//     const { token } = useSelector((state) => state.auth)
//     const navigate = useNavigate()
//     const [products, setProducts] = useState([])
  
//     useEffect(() => {
//       const fetchProducts = async () => {
//         const result = await fetchInstructorCourses(token)
//         if (result) {
//           setProducts(result)
//         }
//       }
//       fetchProducts()
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
  
//     return (
//       <div>
//         <div className="mb-14 flex items-center justify-between">
//           <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
           
//           <IconButton
//             text="Add Course"
//             onclick={() => navigate("/dashboard/add-course")}
//           >
//             <VscAdd />
//           </IconButton>
//         </div>
//         {products && <CoursesTable products={products} setProducts={setProducts} />}
//       </div>
//     )
// }

// export default MyProducts
