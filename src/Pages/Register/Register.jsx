import { useForm } from "react-hook-form"

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const name = data.name;
        const role = data.role;
        const email = data.email;
        const salary = data.salary;
        const photo = data.photo;
        const designation = data.designation;
        const bank_account_no = data.bank_account_no;
        console.table(name, role, email, salary, photo, designation, bank_account_no)
    }

    return (
        <div>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
            <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
                style={{ backgroundImage: "url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)" }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                    <div className="grid  gap-8 grid-cols-1">
                        <div className="flex flex-col ">
                            {/* <div className="flex flex-col sm:flex-row items-center">
                                <h2 className="font-semibold text-lg mr-auto">Shop Info</h2>
                                <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                            </div> */}
                            <div className="mt-5">
                                <form onSubmit={handleSubmit(onSubmit)} className="form">
                                    {/* <div className="md:space-y-2 mb-3">
                                        <label className="text-xs font-semibold text-gray-600 py-2">Company Logo<abbr className="hidden" title="required">*</abbr></label>
                                        <div className="flex items-center py-6">
                                            <div className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                                                <img className="w-12 h-12 mr-4 object-cover" src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80" alt="Avatar Upload" />
                                            </div>
                                            <label className="cursor-pointer ">
                                                <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">Browse</span>
                                                <input type="file" className="hidden" />
                                            </label>
                                        </div>
                                    </div> */}
                                    <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                                        <div className="mb-3 space-y-2 w-full text-xs">
                                            <label className="font-semibold text-gray-600 py-2">Name <abbr title="required">*</abbr></label>
                                            <input placeholder="Name" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" required="required" type="text" {...register("name", { required: true })} id="integration_shop_name" />
                                            {errors.name && <span>This field is required</span>}
                                        </div>

                                        <div className="w-full space-y-2">
                                            <label className="font-semibold text-gray-600 py-2">Role <abbr title="required">*</abbr></label>
                                            <select defaultValue='' className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="roles" {...register("role", { required: true })} id="integration_city_id">
                                                <option value="" disabled>Select Role</option>
                                                <option value="HR">HR</option>
                                                <option value="">Employee</option>
                                            </select>
                                            {errors.role && <span>This field is required</span>}
                                        </div>

                                        {/* <div className="mb-3 space-y-2 w-full text-xs">
                                            <label className="font-semibold text-gray-600 py-2">Company  Mail <abbr title="required">*</abbr></label>
                                            <input placeholder="Email ID" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" required="required" type="text" name="integration[shop_name]" id="integration_shop_name" />
                                            <p className="text-red text-xs hidden">Please fill out this field.</p>
                                        </div> */}
                                    </div>

                                    <div className="mb-3 space-y-2 w-full text-xs">
                                        <label className="font-semibold text-gray-600 py-2">Email <abbr title="required">*</abbr></label>
                                        <input placeholder="Email" {...register("email", { required: true })} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" required="required" type="email" name="email" id="integration_shop_name" />
                                        {errors.email && <span>This field is required</span>}
                                    </div>

                                    <div className="mb-1 space-y-2 w-full text-xs">
                                        <label className=" font-semibold text-gray-600 py-2">Photo <abbr title="required">*</abbr></label>
                                        <div className="flex flex-wrap items-center w-full mb-4 relative">
                                            {/* <div className="flex ">
                                                <span className="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </span>
                                            </div> */}
                                            <div className="w-12 h-10 mr-4 flex-none rounded-xl border overflow-hidden">
                                                <img className="w-12 h-12 mr-4 object-cover" src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80" alt="Avatar Upload" />
                                            </div>
                                            <input type="file" {...register("photo", { required: true })} className="flex-shrink flex-grow leading-normal flex-1 border border-dashed py-2 border-grey-light rounded-lg px-3  relative focus:border-none focus:border-blue focus:shadow" name="photo" placeholder="" accept='image/*' required="required" />
                                            {errors.photo && <span>This field is required</span>}
                                        </div>
                                    </div>

                                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                        <div className="w-full flex flex-col mb-1">
                                            <label className="font-semibold text-gray-600 py-2">Salary <abbr title="required">*</abbr></label>
                                            <input placeholder="Salary" {...register("salary", { required: true })} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="number" name="salary" id="integration_street_address" required="required" />
                                            {errors.salary && <span>This field is required</span>}
                                        </div>
                                        <div className="w-full flex flex-col mb-1">
                                            <label className="font-semibold text-gray-600 py-2">Designation <abbr title="required">*</abbr></label>
                                            <select defaultValue='' {...register("designation", { required: true })} className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="designation" id="integration_city_id">
                                                <option value="" disabled>Select Designation</option>
                                                <option value="Sales Assistant">Sales Assistant</option>
                                                <option value="Social Media executive">Social Media executive</option>
                                                <option value="Digital Marketer">Digital Marketer</option>
                                                {/* <option value="">Bangalore,KA</option> */}
                                            </select>
                                            {errors.designation && <span>This field is required</span>}
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col mb-3 text-xs">
                                        <label className="font-semibold text-gray-600 py-2">Bank Account No <abbr title="required">*</abbr></label>
                                        <input placeholder="Bank Account No" {...register("bank_account_no", { required: true })} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" type="text" name="bank_account_no" id="integration_street_address" required="required" />
                                        {errors.bank_account_no && <span>This field is required</span>}
                                    </div>

                                    <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                        <button type="submit" className="mb-2 md:mb-0 bg-green-400 md:w-1/2 py-2.5 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;