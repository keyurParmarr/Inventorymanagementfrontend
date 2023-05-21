import React, { useState } from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../COMPONENTS/CARD/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../REDUX/AUTH/Auth";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../SERVICES/authServices";
import { Loader } from "../../COMPONENTS/LOADER/Loader";
export const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const handleClick = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill up all Details");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter valid email");
    }
    const userData = { email, password };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <form>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={email}
              onChange={handleClick}
            />
            <input
              type="password"
              name="password"
              required
              value={password}
              placeholder="Password"
              onChange={handleClick}
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              onClick={login}
            >
              Login
            </button>
          </form>
          <Link to="/forgotpassword">Forgot Password?</Link>
          <span className={styles.register}>
            <Link to="/">Home &nbsp;</Link>
            <p>&nbsp; Don't Have an Account?</p>
            <Link to="/register">&nbsp;Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
