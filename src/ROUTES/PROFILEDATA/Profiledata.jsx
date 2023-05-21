import React, { useEffect, useState } from "react";
import "./Profiledata.style.scss";
import { RedirectLoggedOut } from "../../COMPONENTS/REDIRECTHOOK/RedirectLoggedOut";
import { useDispatch } from "react-redux";
import { getUserData } from "../../SERVICES/authServices";
import { SET_NAME, SET_USER } from "../../REDUX/AUTH/Auth";
import { SpinnerImg } from "../../COMPONENTS/LOADER/Loader";
import Card from "../../COMPONENTS/CARD/Card";
import { Link } from "react-router-dom";
export const Profiledata = () => {
  RedirectLoggedOut("/login");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    async function getUser() {
      const data = await getUserData();
      setProfile(data);
      setIsloading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUser();
  }, []);

  return (
    <div className="profile --my2">
      {isloading && <SpinnerImg />}
      <>
        {isloading && profile === null ? (
          <p>Something went Wrong, Please Reload the Page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name:</b>&nbsp;
                {profile?.name}
              </p>
              <p>
                <b>Email:</b>&nbsp;
                {profile?.email}
              </p>
              <p>
                <b>Phone:</b>&nbsp;
                {profile?.phone}
              </p>
              <p>
                <b>Bio:</b>&nbsp;
                {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};
