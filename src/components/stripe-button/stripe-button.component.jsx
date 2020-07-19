import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51H6S2OCq4gCL6ixNvpZqSUsHfeXjbzd6XfUf5cQvX2okoRXq1IgRkEBOQbWjsJyriih1HkbPM4V1yC4R4aJ5wdWE00kvJ21AT4";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful! Laka da maar");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Voodoo Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/Cuz.svg"
      description={`Your total is $${price}`}
      amout={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
