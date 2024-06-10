import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import { ImCross } from "react-icons/im";
import { IoIosCheckbox } from "react-icons/io";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Link } from "react-router-dom";

const EmployeeList = () => {
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();
    const [modalValue, setModalValue] = useState({});
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

    const { data: users = [], isError, isPending, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosCommon.get('/users')
            return res.data
        }
    })
    // console.log(users);

    const handleVerified = async (user) => {
        try {
            const res = await axiosSecure.patch(`/verify/${user._id}`, user);
            // console.log(res);
            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Verify employee successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handlePayment = async (user) => {
        setModalValue(user)
        document.getElementById('my_modal_1').showModal()
    }
    // console.log(modalValue.salary);

    const columnHelper = createColumnHelper();

    const columns = [

        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.No",
        }),

        columnHelper.accessor("name", {
            cell: (info) => (
                <span>{info.getValue()}</span>
            ),
            header: "Name"
        }),

        columnHelper.accessor("email", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Email',
        }),

        columnHelper.accessor("isVerified", {
            cell: (info) => (info.getValue() ? <span className="text-green-700 text-2xl"><IoIosCheckbox /></span>
                :
                <span onClick={() => handleVerified(info.row.original)} className="text-red-600"><ImCross /></span>),
            header: 'Verified',
        }),

        columnHelper.accessor("bank_account_no", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Bank Account',
        }),

        columnHelper.accessor("salary", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Salary',
        }),

        columnHelper.accessor("isVerified", {
            id: "Verified",
            cell: (info) => <button
                onClick={() => handlePayment(info.row.original)}
                disabled={!info.getValue()}
                className={`px-2.5 py-1 rounded-md shadow-md text-sm ${info.getValue() ? 'bg-[#00B4D8] text-white' : 'bg-gray-500 text-white'
                    }`}
            >Pay</button>,
            header: '',
        }),

        columnHelper.accessor("name", {
            id:'Details',
            cell: (info) => <Link to={`/dashboard/details/${info.row.original.email}`} className="border border-[#00B4D8] text-[#00B4D8] font-bold px-2.5 py-1 rounded-md shadow-md text-sm">Details</Link>,
            header: '',
        }),
    ]

    const table = useReactTable(
        {
            data: users,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
        }
    );

    if (isPending) {
        return <span>Pending...</span>
    }

    if (isError) {
        return <span>{error.message}</span>
    }

    return (
        <div>
            <table className=" w-full text-left">
                <thead className="bg-indigo-60 bg-[#14456A]">
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="capitalize px-3.5 py-2 lg:py-2.5 cursor-pointer bg-[#E5E7EB]"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`${i % 2 === 0 ? 'text-gray-900 bg-[#F3F4F6]' : 'bg-gray-700 text-white'}`}
                                >
                                    {
                                        row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-3.5 py-2">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        ) : null
                    }
                </tbody>
            </table>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                <Elements stripe={stripePromise}>
                    <CheckoutForm info={modalValue}></CheckoutForm>
                </Elements>
                </div>
            </dialog>
        </div>
    );
};

export default EmployeeList;