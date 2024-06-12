import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import Swal from "sweetalert2";
import { useState } from "react";
import IncrementOnlyInput from "./IncrementOnlyInput";

const AllEmployeeList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allEmployee = [], refetch } = useQuery({
        queryKey: ['allEmployee'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-employee');
            return res.data;
        }
    })
    // console.log(allEmployee);

    const handleMakeHR = async (info) => {
        const res = await axiosSecure.patch(`/all-employee/${info._id}`)
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Upgrade HR successful",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleFired = async (info) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, fire them!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/all-employee-fired/${info._id}`)
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Fired!",
                        text: "The employee has been fired.",
                        icon: "success"
                    });
                }
            }
        });
    }

    const columnHelper = createColumnHelper();

    const columns = [

        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.No",
        }),

        columnHelper.accessor("name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Name',
        }),

        columnHelper.accessor("email", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'email',
        }),

        columnHelper.accessor("designation", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Designation',
        }),

        columnHelper.accessor("salary", {
            cell: (info) => <IncrementOnlyInput info={info.row.original}></IncrementOnlyInput>,
            header: 'Salary',
        }),

        columnHelper.accessor("role", {
            id: 'Make HR',
            cell: (info) => (info.getValue() === 'HR' ? <span>HR</span>
                :
                <button
                    onClick={() => handleMakeHR(info.row.original)}
                    className="btn btn-xs bg-green-500 text-white text-xs"
                >Make HR</button>
            ),
            header: 'Make HR',
        }),

        columnHelper.accessor("isFired", {
            id: 'Fire',
            cell: (info) => (info.getValue() ? <span>Fired</span>
                :
                <button
                    onClick={() => handleFired(info.row.original)}
                    className="btn btn-xs bg-red-500 text-white text-xs"
                >Fire</button>
            ),
            header: 'Fire',
        })

    ]

    const table = useReactTable({
        data: allEmployee,
        columns,
        initialState: {
            pagination: {
                pageSize: 5,
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

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
                                    className={`${i % 2 === 0 ? 'text-gray-900 bg-[#F3F4F6]' : 'bg-gray-200'}`}
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
        </div>
    );
};

export default AllEmployeeList;