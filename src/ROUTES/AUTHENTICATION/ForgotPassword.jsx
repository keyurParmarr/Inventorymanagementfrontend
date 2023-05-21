import React, { useState } from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../COMPONENTS/CARD/Card";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../SERVICES/authServices";
import { toast } from "react-toastify";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) toast.error("Please enter an email");
    const userData = { email };
    await forgotPassword(userData);
    setEmail("");
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              onClick={forgot}
            >
              Get Reset Email
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
