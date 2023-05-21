import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../COMPONENTS/CARD/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../SERVICES/authServices";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../REDUX/AUTH/Auth";
import { Loader } from "../../COMPONENTS/LOADER/Loader";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassword } = formData;
  const handleClick = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const register = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all Details");
    }
    if (password !== confirmPassword) {
      toast.error("Unmatched Password");
    }
    if (password.length < 6) {
      toast.error("Password must be greater than 6 Characters");
    }
    if (!validateEmail(email)) {
      toast.error("Please enter valid email");
    }
    const userData = { name, email, password };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      setIsLoading(false);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form>
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              value={name}
              onChange={handleClick}
              autoComplete="off"
            />
            <input
              type="email"
              name="email"
              required
              value={email}
              placeholder="Email"
              onChange={handleClick}
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              required
              value={password}
              placeholder="Password"
              onChange={handleClick}
              autoComplete="off"
            />
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleClick}
              autoComplete="off"
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              onClick={register}
            >
              Login
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home &nbsp;</Link>
            <p>&nbsp; Already Have an Account?</p>
            <Link to="/login">&nbsp;Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
