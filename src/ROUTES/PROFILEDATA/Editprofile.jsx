import React from "react";
import "./Profiledata.style.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUser } from "../../REDUX/AUTH/Auth";
import { useNavigate } from "react-router-dom";
import Card from "../../COMPONENTS/CARD/Card";
import { Loader } from "../../COMPONENTS/LOADER/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "../../SERVICES/authServices";
import { Changepassword } from "../../COMPONENTS/CHANGEPASSWORD/Changepassword";
export const Editprofile = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const initialState = {
    name: user?.name,
    email: user?.email,
    bio: user?.bio,
    phone: user?.phone,
    photo: user?.photo,
  };
  const { email } = user;
  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, []);
  const [profile, setProfile] = useState(initialState);
  const [profileimg, setProfileimg] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleImageChange = (e) => {
    setProfileimg(e.target.files[0]);
  };
  const saveProfile = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      let imageURL;
      if (
        profileimg &&
        (profileimg.type === "image/jpeg" ||
          profileimg.type === "image/jpg" ||
          profileimg.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileimg);
        image.append("cloud_name", "dsdzlqpdx");
        image.append("upload_preset", "x9mntzws");
        const resp = await fetch(
          "https://api.cloudinary.com/v1_1/dsdzlqpdx/image/upload",
          { method: "post", body: image }
        );
        const data = await resp.json();
        imageURL = data.url.toString();
        const formData = {
          name: profile.name,
          email: profile.email,
          bio: profile.bio,
          phone: profile.phone,
          photo: profileimg ? imageURL : profile.photo,
        };
        await updateProfile(formData);
        toast.success("User Updated");
        navigate("/profile");
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      toast.error(error);
    }
  };
  return (
    <div className="profile --my2">
      {isloading && <Loader />}
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profile pic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>&nbsp;
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>&nbsp;
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email Cannot be Changed</code>
            </p>
            <p>
              <label>Phone:</label>&nbsp;
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                cols="30"
                rows="10"
                onChange={handleInputChange}
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>&nbsp;
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <Changepassword />
    </div>
  );
};
