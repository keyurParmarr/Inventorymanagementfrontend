import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN } from "../../REDUX/AUTH/Auth";
import { getLoginStatus } from "../../SERVICES/authServices";
export const RedirectLoggedOut = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectUser = async () => {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
      if (!status) {
        toast.info("Session Expired,Please login to Proceed");
        navigate(path);
        return;
      }
    };
    redirectUser();
  }, []);
};
// navigate, path, dispatch
