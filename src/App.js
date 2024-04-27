import React from "react";
import "./App.css"
import Navbar from "./components/common/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddProduct from "./components/core/Dashboard/AddProduct";
import MyProducts from './components/core/Dashboard/MyProducts'
import AboutUs from './components/common/AboutUs'
import EditProduct from './components/core/Dashboard/EditProduct'
import Category from './pages/Category'
import Blog from "./components/common/Blog";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./components/core/Dashboard/MyOrders";
import Cart from "./components/core/Dashboard/Cart";
import Contact from "./pages/ContactUs";
import Dealer from "./components/core/Dashboard/DealerDashboard/Dealer";

const App = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblue-700 flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path='category/:categoryName' element={<Category />} />

        <Route path="products/:productId" element={<ProductDetails />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route path="about" element={<AboutUs />} />
        <Route path="blog" element={<Blog />} />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />

          <Route path="dashboard/Settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.FARMER && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/my-orders" element={<MyOrders />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.DEALER && (
              <>
                <Route path="dashboard/dealer" element={<Dealer />} />
                <Route path='dashboard/add-product' element={<AddProduct />} />
                <Route path='dashboard/my-products' element={<MyProducts />} />
                <Route path='dashboard/edit-product/:productId' element={<EditProduct />} />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
