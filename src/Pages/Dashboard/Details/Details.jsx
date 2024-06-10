import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Details = () => {
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: allInfo, isLoading, isError, error } = useQuery({
        queryKey: [email, 'allInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-info/${email}`);
            return res.data
        }
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{error}</div>;
    }

    const { user, payments } = allInfo;
    console.log(user, payments);

    return (
        <div>
            {email}
            <div className="py-8 w-[400px] mx-auto shadow-xl rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-400  transition-colors duration-1000">
                {/* <div className="border-x border py-2 -mx-6 bg-gradient-to-r from-indigo-400 to-cyan-400"> */}
                <div>
                    <div className="h-20 w-20 mx-auto mb-6">
                        <img className="h-full w-full rounded-full" src={user?.image_url} alt="" />
                    </div>
                    <div className="text-center">
                        <h4 className="text-slate-100 font-medium"><span className="font-bold ">Name : </span><span>{user?.name}</span></h4>
                        <h4 className="text-slate-100 font-medium"><span className="font-bold ">Designation :</span> {user?.designation}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;