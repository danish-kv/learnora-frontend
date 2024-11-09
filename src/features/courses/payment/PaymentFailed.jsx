import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";

const PaymentFailed = () => {
  const location = useLocation(); // Use useLocation to get current location
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseID = params.get("course_id");
    const userID = params.get("user_id");
    

    const CoursePurchaseFailed = async () => {
      try {
        await Swal.fire("Payment Failed", "Your course purchase failed. Please try again.", "error");
        navigate(`/course/${courseID}`)
        
      } catch (error) {
        console.log(error);
        navigate(`/course/${courseID}`);
        
        
      }
    };

    if (courseID && userID) {
      CoursePurchaseFailed();
    }
  },[location]); 

  return <div>Payment failed</div>;
};

export default PaymentFailed;
