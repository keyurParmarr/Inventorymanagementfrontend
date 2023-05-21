import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./COMPONENTS/LAYOUT/Layout";
import { Sidebar } from "./COMPONENTS/SIDEBAR/Sidebar";
import { ForgotPassword } from "./ROUTES/AUTHENTICATION/ForgotPassword";
import { Login } from "./ROUTES/AUTHENTICATION/Login";
import { Register } from "./ROUTES/AUTHENTICATION/Register";
import { ResetPassword } from "./ROUTES/AUTHENTICATION/ResetPassword";
import { Dashboard } from "./ROUTES/DASHBOARD/Dashboard";
import { Home } from "./ROUTES/HOME/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "./REDUX/AUTH/Auth";
import { getLoginStatus } from "./SERVICES/authServices";
import { AddProduct } from "./ROUTES/ADDPRODUCT/Addproduct";
import { ProductDetail } from "./COMPONENTS/PRODUCTDETAIL/ProductDetail";
import { Editproduct } from "./ROUTES/EDITPRODUCT/Editproduct";
import { Profiledata } from "./ROUTES/PROFILEDATA/Profiledata";
import { Editprofile } from "./ROUTES/PROFILEDATA/Editprofile";
import { Contact } from "./ROUTES/CONTACTUS/Contact";
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          theme="colored"
          bodyStyle={{ fontSize: "large" }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/resetpassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route
            path="/dashboard"
            element={
              <Sidebar>
                <Layout>
                  <Dashboard />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/add-product"
            element={
              <Sidebar>
                <Layout>
                  <AddProduct />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <Sidebar>
                <Layout>
                  <ProductDetail />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <Sidebar>
                <Layout>
                  <Editproduct />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/profile"
            element={
              <Sidebar>
                <Layout>
                  <Profiledata />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <Sidebar>
                <Layout>
                  <Editprofile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Sidebar>
                <Layout>
                  <Contact />
                </Layout>
              </Sidebar>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
