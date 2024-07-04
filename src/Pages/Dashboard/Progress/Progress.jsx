import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useState } from "react";

const Progress = () => {
    const axiosCommon = useAxiosCommon();
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const { data: employees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const res = await axiosCommon.get('/users');
            return res.data
        }
    })

    const { data: workSheets = [] } = useQuery({
        queryKey: [selectedEmployee, selectedMonth, 'workSheets'],
        queryFn: async () => {
            const res = await axiosCommon.get('/work-sheets', {
                params: {
                    employeeName: selectedEmployee,
                    month: selectedMonth,
                },
            });
            return res.data
        }
    })
    // console.log(workSheets);

    return (
        <div>
            <div className="flex gap-4 ">
                <div className="flex flex-col gap-1 border p-4 rounded shadow">
                    <label htmlFor="employee-select">Employee:</label>
                    <select
                        className="border md:w-[220px] py-1 px-2"
                        id="employee-select"
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                        <option value="">All Employees</option>
                        {
                            employees.map(employee => <option
                                key={employee._id}
                                value={employee.name}
                            >{employee.name}</option>)
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-1 border p-4 rounded shadow">
                    <label htmlFor="month-select">Select Month:</label>
                    <select
                        id="month-select"
                        className="border md:w-[220px] py-1 px-2"
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <div>
            <div className="w-full overflow-x-auto">
            <table className="rounded-t-lg m-5 w-full mx-auto bg-gray-200 text-gray-800 ">
                    <thead>
                        <tr className="text-left border-b-2 border-gray-300">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Tasks</th>
                            <th className="px-4 py-3">Hours</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            workSheets.map((work,idx)=><tr key={work._id} className="bg-gray-100 border-b border-gray-200">
                            <td className="px-4 py-3">{idx + 1}</td>
                            <td className="px-4 py-3"><img className="w-10 h-10 rounded-lg" src={work.user_image} alt={work.user_name} /></td>
                            <td className="px-4 py-3">{work.user_name}</td>
                            <td className="px-4 py-3">{work.user_email}</td>
                            <td className="px-4 py-3">{work.task}</td>
                            <td className="px-4 py-3">{work.hours}</td>
                            <td className="px-4 py-3">{work.date}</td>
                        </tr>)
                        }

                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default Progress;