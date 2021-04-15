import axios from "axios";
import {loadStripe} from '@stripe/stripe-js'

// GET
export const getProducts = () => {
  return new Promise((onSuccess, onFail) => {
    axios
      .get("/api/products")
      .then((response, error) => {
        if (!response || error) {
          return onFail(`Response failure : ${error}`);
        }
        onSuccess(response);
      })
      .catch((err) => onFail(err));
  });
};

export const getUser = (body) => {
  return new Promise((onSuccess, onFail) => {
    console.log(body.profile)
    axios
      .get(`/api/user/${body.profile.email}`,  {
        params: {
          email: body.profile.email
        }
      }) 
      .then((response, error) => {
        if (!response || error) {
          return onFail(`Response failure : ${error}`);
        }
        onSuccess(response.data);
      })
      .catch((err) => onFail(err));
  });
};

// POST

export const addUser = (body) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .post("/api/users/add", body)
      .then((response, error) => {
        if (!response || error) {
          return onFail(`Response failure : ${error}`);
        }
        onSuccess(`user profile successfully created`);
      })
      .catch((err) => onFail(err));
  });
};

// Stripe

export const processPayment = async (order) => {
  debugger;
  var stripePromise = loadStripe("pk_test_51Ig7X1HoFREscj39cocpLby78kAIGaZCMSg87LseWP7JyeqvOQ19CG4oC7pYQbNm0uvRFQU811Rel104QQQZtJzn00wppsy5Kg");
  const stripe = await stripePromise;
  axios.post('api/create-checkout-session', order)
  .then (response => {
    const sessionID = response.data.id
    return stripe.redirectToCheckout({ sessionId: sessionID });
  })
}