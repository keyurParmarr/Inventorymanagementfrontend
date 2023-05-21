import React, { useState } from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../COMPONENTS/CARD/Card";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../SERVICES/authServices";
import { toast } from "react-toastify";
const initialState = {
  password: "",
  confirmpassword: "",
};
export const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, confirmpassword } = formData;
  const { resetToken } = useParams();
  const handleClick = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be greater than 6 Characters");
    }
    if (password !== confirmpassword) {
      toast.error("Unmatched Password");
    }
    const userData = { password, confirmpassword };
    try {
      const resp = await resetPassword(userData, resetToken);
      toast.success(resp.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type="password"
              name="password"
              required
              value={password}
              placeholder="New Password"
              onChange={handleClick}
            />
            <input
              type="password"
              name="confirmpassword"
              required
              value={confirmpassword}
              onChange={handleClick}
              placeholder="Confirm New Password"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home &nbsp;</Link>
              </p>
              <p>
                <Link to="/Login">&nbsp;- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
