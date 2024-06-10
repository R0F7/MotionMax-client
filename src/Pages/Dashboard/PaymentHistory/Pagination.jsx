import PropsTypes from 'prop-types';

const Pagination = ({ table }) => {
    return (
        <div>
            <div className="flex items-center justify-end text-black mt-2 gap-2">
                <button
                    onClick={() => {
                        table.previousPage()
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30">
                    {"<"}
                </button>
                <button
                    onClick={() => {
                        table.nextPage()
                    }}
                    disabled={!table.getCanNextPage()}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30">
                    {">"}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>{table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16 bg-transparent"
                    />
                </span>

                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="h-9 text-xs bg-transparent"
                >
                    {
                        [5, 10, 20, 30, 50].map((pageSize) => (

                            <option key={pageSize} value={pageSize}>{pageSize}</option>

                        ))
                    }
                </select>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    table: PropsTypes.object
}

export default Pagination;