import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const CheckoutForm = ({ info }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth()
    const salary = parseFloat(info.salary);
    // console.log(salary);

    useEffect(() => {
        if (salary > 0) {
            axiosSecure.post('/create-payment-intent', { salary: salary })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, salary])

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')
            return res.data
        }
    })
    // console.log(payments);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const month = event.target.month.value;
        const email = info.email;

        const existingPayment = payments.filter(payment => payment.email === email && payment.month === month)
        // console.log('existingPayment',existingPayment.length);
        if (existingPayment.length > 0 ) {
            document.getElementById('my_modal_1').close()
            return toast.error('Payment for this month already made. Duplicate payments are not allowed')
        }

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setMessage(error.message)
        } else {
            // console.log('payment method', paymentMethod);
            setMessage('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        } else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                //now save the payment in the database
                const payment = {
                    email: info.email,
                    salary: salary,
                    month: month,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                }
                // console.table(payment);

                const res = await axiosSecure.post('/payments', payment)
                // console.log('payment saved', res.data);

                if (res.data?.insertedId) {
                    document.getElementById('my_modal_1').close()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Payment Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } 

            }
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
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <label className="flex flex-col" htmlFor="salary"><span className="font-semibold mb-1"> Salary <span className="text-red-500">*</span></span>
                        <input className="border p-1.5" type="text" name="salary" id="salary" defaultValue={info?.salary} readOnly />
                    </label>

                    <label className="flex flex-col" htmlFor="month"><span className="font-semibold mb-1"> Date <span className="text-red-500">*</span></span>
                        <input className="border p-1.5" type="month" name="month" id="month" required />
                    </label>
                </div>
                <p className="text-red-400">{message}</p>
                {
                    transactionId && <p className="text-green-600 text-sm mt-1">Your transaction id: {transactionId}</p>
                }
                <div className="flex justify-center gap-3 mt-4">
                    <button type="button" className="py-2 bg-red-500 w-20 rounded-lg shadow-lg text-white" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
                    <button type="submit" className="py-2 bg-[#00B4D8] text-white w-20 rounded-lg shadow-lg" disabled={!stripe || !clientSecret}>Pay</button>
                </div>
            </form>
        </div>
    );
};

CheckoutForm.propTypes = {
    info: PropTypes.object,
}

export default CheckoutForm;