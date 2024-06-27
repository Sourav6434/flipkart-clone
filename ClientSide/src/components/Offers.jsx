import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "../css/Offer.css";

export default function Offers() {
  let token = localStorage.getItem("token");
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  // Decode the token to access its payload
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  useEffect(() => {
    if (!token) {
      toast.info("To see Latest Offers Please Login to you account", {
        toastId: "khandu",
      });
      navigate("/login");
    } else {
      const fetchOffers = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/offer");
          setOffers(response.data);
        } catch (error) {
          console.error(`Error fetching Offers: ${error}`);
        }
      };
      fetchOffers();
    }
  }, [navigate, token]);

  const sendEmail = (data) => {
    try {
      axios
        .post("http://localhost:4000/api/mail/send/sendmail", {
          name: decodedToken.name,
          email: decodedToken.email,
          data,
        })
        .then((test) => {
          toast.success("Offers sent to you Gmail");
        });
    } catch (err) {
      console.error(`Error in Sending mail: ${err}`);
      toast.error("Error in Sending Mail");
    }
  };

  return (
    <>
      <div className="offer-container">
        {offers.map((offer, index) => (
          <div className="offer-box" key={index}>
            <h3>{offer.OfferTitle}</h3>
            <p>
              <strong>Description:</strong> {offer.OfferDescription}
            </p>
            <p>
              <strong>Discount:</strong> {offer.Discount}%
            </p>
            <p>
              <strong>Start Date:</strong> {offer.StartDate}
            </p>
            <p>
              <strong>End Date:</strong> {offer.EndDate}
            </p>
            <p>
              <strong>Coupon Code:</strong> {offer.CouponCode}
            </p>
            <p>
              <strong>Availability:</strong> {offer.Availability}
            </p>
            <p>
              <strong>Redemption Method:</strong> {offer.RedemptionMethod}
            </p>
            <button className="offer-button" onClick={() => sendEmail(offer)}>
              Send offer to you
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
