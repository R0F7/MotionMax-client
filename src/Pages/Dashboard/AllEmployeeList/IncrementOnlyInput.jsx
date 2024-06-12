/* eslint-disable react/prop-types */
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const IncrementOnlyInput = ({ info }) => {
    const salary = info?.salary
    const [value, setValue] = useState(salary);
    const axiosSecure = useAxiosSecure();

    const handleSalary = (e) => {
        const newValue = e.target.value;

        if (newValue < value) {
            return toast.error('Salary cannot be decreased')
        } else if (newValue > value) {
            setValue(newValue);

            axiosSecure.patch(`/increasing-salary/${info?.email}`, { value: parseInt(newValue) })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        toast.success('Salary increased')
                    }
                })
        }
    };

    return (
        <div>
            <input
                className='bg-transparen pl-2'
                type="number"
                name="salary"
                defaultValue={salary}
                min={salary}
                onBlur={handleSalary}
            />
        </div>
    );
};

export default IncrementOnlyInput;