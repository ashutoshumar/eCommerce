import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Payment from './Payment';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const PaymentRedirect=  ({stripeApiKey}) => {
    
    console.log(stripeApiKey)
  return (

    <Elements stripe={loadStripe(stripeApiKey)}>
     <Payment /> 
    </Elements>
  );
};
export default PaymentRedirect;