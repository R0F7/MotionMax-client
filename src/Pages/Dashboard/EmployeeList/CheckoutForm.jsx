import { CardElement, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CheckoutForm = ({ payment }) => {
    const stripe = useState();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }
    }

    return (
        <div className="w-4/5 mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146'
                            },
                        },
                    }}
                >
                </CardElement>
               
            </form>
        </div>
    );
};

CheckoutForm.propTypes = {
    payment: PropTypes.number,
}

export default CheckoutForm;