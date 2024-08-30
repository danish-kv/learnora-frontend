import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";

const PaymentSuccess = () => {
  const location = useLocation(); // Use useLocation to get current location
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseID = params.get("course_id");
    const userID = params.get("user_id");
    const access_type = params.get("access_type");
    const session_id = params.get("session_id");
    console.log("course id:", courseID, "user id:", userID, 'access_type ' ,access_type, 'session_id' , session_id);
    console.log(session_id);
    

    const confirmCoursePurchase = async () => {
      try {
        const res = await api.post("payment_success/", {
          course_id: courseID,
          user_id: userID,
          access_type : access_type,
          session_id : session_id
        });
        console.log(res);
        await swal("Payment Success", "Your course purchase success.", "success");
        navigate(`/course/${courseID}`);
      } catch (error) {
        console.log(error);
        displayToastAlert(400, 'Payment failed. Please try again.');
      }
    };

    if (courseID && userID && access_type && session_id) {
      confirmCoursePurchase();
    }else{
      displayToastAlert(400, "Invalid payment request")
      navigate('/courses')
    }
  },[]); 

  return <div>Payment Success</div>;
};

export default PaymentSuccess;
