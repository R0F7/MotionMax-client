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
        // console.log(info.email);
        // console.log(newValue);
        if (newValue < value) {
            console.log();
            return toast.error('Salary cannot be decreased')
        } else if (newValue > value) {
            setValue(newValue);
            toast.success('Salary increased')

            axiosSecure.patch(`/increasing-salary/${info?.email}`, { value: parseInt(newValue) })
                .then(data => console.log(data.data))
        }
    };

    return (
        <div>
            <input
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