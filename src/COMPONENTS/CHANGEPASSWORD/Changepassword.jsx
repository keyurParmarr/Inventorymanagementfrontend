import React from "react";
import "./Changepassword.style.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../SERVICES/authServices";
import Card from "../CARD/Card";
import { useNavigate } from "react-router-dom";
export const Changepassword = () => {
  const navigate = useNavigate();
  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [formdata, setFormdata] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formdata;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  const Changepassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not Match");
    }
    const formdata = { oldPassword, newPassword };
    const resp = await changePassword(formdata);
    toast.success(resp);
    navigate("/profile");
  };
  return (
    <div className="change-password">
      <Card cardClass={"password-card"}>
        <h3>Change password</h3>
        <form onSubmit={Changepassword} className="--form-control --m">
          <input
            type="password"
            value={oldPassword}
            required
            name="oldpassword"
            placeholder="Old Password"
            onChange={handleInputChange}
          />
          <input
            type="password"
            value={newPassword}
            required
            name="newpassword"
            placeholder="New Password"
            onChange={handleInputChange}
          />
          <input
            type="password"
            value={confirmPassword}
            required
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};
