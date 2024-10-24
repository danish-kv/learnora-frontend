import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseID = params.get("course_id");
    const userID = params.get("user_id");
    const access_type = params.get("access_type");
    const session_id = params.get("session_id");

    const confirmCoursePurchase = async () => {
      try {
        const res = await api.post("payment_success/", {
          course_id: courseID,
          user_id: userID,
          access_type,
          session_id,
        });
        console.log(res);

        displayToastAlert(200, "Your course purchase success")
        navigate(`/course/${courseID}`, { state: { showConfetti: true } });
      } catch (error) {
        console.error(error);
        displayToastAlert(400, "Payment failed. Please try again.");
      }
    };

    if (courseID && userID && access_type && session_id) {
      confirmCoursePurchase();
    } else {
      displayToastAlert(400, "Invalid payment request");
      navigate("/courses");
    }
  }, [location, navigate]);

  return <></>;
};

export default PaymentSuccess;
