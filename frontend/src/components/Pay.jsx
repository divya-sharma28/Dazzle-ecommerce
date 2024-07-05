import {useState, useEffect} from 'react';
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';

const PUB_KEY = "pk_test_51NbIXJSF4dyGTHVlVUpJrB5aoLZQywfCITVwWLRGGMuAwS7lljhshCtOd3EBrDpWQeVwkLysJQIQgB9NKEHewUHx003Ce2sHMf"
const Pay = () => {

  const [stripeToken, setStripeToken] = useState(null);

  const tokenHandler = (token)=>{
    setStripeToken(token)
  };

  useEffect(()=>{
    const makeRequest = async () =>{
      try {
        const res = await axios.post('http://localhost:4000/dazzle/checkout/payment', {
          tokenId: stripeToken.id,
          amount: 2000
        },  {
          headers: {
            'Stripe-Token': PUB_KEY,
            'Content-Type': 'application/json',
          },
        });

        console.log(res.data,"res.data")
      } catch (error) {
        console.error(error)
      }
    }
    stripeToken && makeRequest()
  },[stripeToken])
  return (

    <StripeCheckout
      name='Dazzle'
      image='https://i.ibb.co/vjW9cb6/apple-touch-icon.png'
      billingAddress={true}
      shippingAddress={true}
      description=''
      currency='INR'
      amount={2000}
      token={tokenHandler}
      stripeKey={PUB_KEY}
    >
    <button>Pay Now</button>
    </StripeCheckout>
  )
}

export default Pay