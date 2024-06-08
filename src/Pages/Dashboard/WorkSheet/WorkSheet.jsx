import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkSheet = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();
    const user_email = user?.email;

    const { data:work_sheet = [], refetch } = useQuery({
        queryKey: ['work-sheet',user_email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/work-sheet?email=${user_email}`);
            return res.data
        }
    })
    // console.log(work_sheet);

    const handleWorkForm = async (e) => {
        e.preventDefault()
        const form = e.target;
        const task = form.task.value;
        const hours = form.hours.value;
        const createAt = new Date();

        const workInfo = {
            task,
            user_email,
            hours: parseFloat(hours),
            startDate: startDate.toLocaleDateString(),
            createAt,
        }

        try {
            const work_sheet = await axiosCommon.post('/work-sheet', workInfo,)
            if (work_sheet.data.insertedId) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <form onSubmit={handleWorkForm} className="grid grid-cols-10 items-end gap-6 g-red-500 bg-[#FDFDFD] border p-6 shadow-sm">
                <div className="col-span-3">
                    <label className="flex flex-col" htmlFor="task"><span className="font-semibold mb-1">Task <span className="text-red-500">*</span></span>
                        <select className="border p-1.5" id="task" name="task" defaultValue=''>
                            <option value="" disabled>Task</option>
                            <option value="Sales">Sales</option>
                            <option value="Support">Support</option>
                            <option value="Content">Content</option>
                            <option value="Paper-work">Paper-work</option>
                        </select>
                    </label>
                </div>

                <div className="col-span-3">
                    <label className="flex flex-col" htmlFor="hours"><span className="font-semibold mb-1"> Hours Worked <span className="text-red-500">*</span></span>
                        <input className="border p-1.5" type="number" name="hours" id="hours" placeholder="Hours" />
                    </label>
                </div>

                <div className="col-span-3">
                    <label className="flex flex-col" htmlFor="date"><span className="font-semibold mb-1">Date <span className="text-red-500">*</span></span>

                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            id="date"
                            className="border w-full p-1.5"
                        />
                    </label>
                </div>

                <div className="col-span-1">
                    <button type="submit" className="bg-[#00b4d8] text-white h-10 w-full">Submit</button>
                </div>

            </form>

            <div>
                <p className="text-lg text-center font-bold m-5">Classic Table Design</p>
                <table className="rounded-t-lg m-5 w-full mx-auto bg-gray-200 text-gray-800">
                    <thead>
                        <tr className="text-left border-b-2 border-gray-300">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Tasks</th>
                            <th className="px-4 py-3">Hours</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            work_sheet.map((work,idx)=><tr key={work._id} className="bg-gray-100 border-b border-gray-200">
                            <td className="px-4 py-3">{idx + 1}</td>
                            <td className="px-4 py-3">{work.task}</td>
                            <td className="px-4 py-3">{work.hours}</td>
                            <td className="px-4 py-3">{work.startDate}</td>
                        </tr>)
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default WorkSheet;