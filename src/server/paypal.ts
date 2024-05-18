import checkoutNodeJssdk from "@paypal/checkout-server-sdk/";
import { env } from "@/env";
const configureEnvironment = function () {
  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = env;

  return process.env.NODE_ENV === "production"
    ? new checkoutNodeJssdk.core.SandboxEnvironment(
        PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET,
      )
    : new checkoutNodeJssdk.core.SandboxEnvironment(
        PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET,
      );
};

const paypalClient = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

export default paypalClient;
