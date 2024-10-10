import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { googleSignin } from "../../../redux/slices/authSlice";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const handleSignInWithGoogle = async (res, role, from) => {
    console.log(res);
    const payload = res.credential;

    try {
      const response = await api.post("google/", {
        access_token: payload,
        role,
      });
      console.log("server res", response);
      console.log("res data", response.data);

      if (response.status === 200) {
        localStorage.setItem("access", response.data.access_token);
        localStorage.setItem("refresh", response.data.refresh_token);
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("role", role);

        console.log("res data", response.data);

        await swal("Success", "Logged in successfully", "success");

        const payload = {
          user: response.data.user,
          role: response.data.role,
        };
        dispath(googleSignin(payload));

        if (from === "register") {
          navigate("/login");
        } else if (from === "login") {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      await swal("Error", "Failed to log in with Google", "error");
    }
  };

  return { handleSignInWithGoogle };
};
