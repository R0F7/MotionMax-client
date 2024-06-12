import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import Pagination from "./Pagination";

const PaymentHistory = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const email = user?.email;

    const { data: PaymentHistories = [] } = useQuery({
        queryKey: [email, 'PaymentHistories'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${email}`);
            return res.data
        }
    })
    // console.log(email);
    // console.log(PaymentHistories);

    const columnHelper = createColumnHelper();

    const columns = [

        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "S.No",
        }),

        columnHelper.accessor("month", {
            // cell: (info) => <span>{info.getValue().split('-')[1]}</span>,
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Mount',
        }),

        columnHelper.accessor("salary", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Amount',
        }),

        columnHelper.accessor("transactionId", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: ' Transaction Id',
        }),

    ]

    const table = useReactTable({
        data: PaymentHistories,
        columns,
        initialState: {
            pagination: {
                pageSize: 5 ,
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full overflow-x-auto">
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
            <Pagination table={table}></Pagination>
        </div>
    );
};

export default PaymentHistory;