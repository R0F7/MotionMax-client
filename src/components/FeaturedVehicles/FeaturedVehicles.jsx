import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const FeaturedVehicles = () => {
    const axiosCommon = useAxiosCommon();

    const { data: featuredVehicles = [] } = useQuery({
        queryKey: ['featuredVehicles'],
        queryFn: async () => {
            const res = await axiosCommon.get('/featuredVehicles');
            return res.data
        }
    })
    // console.log(featuredVehicles);

    return (
        <div>
            <div className="text-center mb-10 md:mb-14 lg:mb-10">
                <h2 className="text-3xl font-semibold">Our Latest and Best-Selling Models</h2>
                <p className="w-[95%] lg:w-[70%] mx-auto mt-2">Explore our latest and best-selling vehicles, each engineered for excellence. Find your perfect match with advanced features, stylish design, and unbeatable performance. Drive the future today with our featured selection</p>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 lg:bg-gray-100 lg:p-20 ">

                <div className="grid md:grid-cols-3 md:-space-x-10 gap-12 md:gap-0">
                    {
                        featuredVehicles.map((featuredVehicle, idx) =>
                            <div key={idx} className={featuredVehicle.position === 2 ? "flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg scale-x-95 scale-y-110 z-20" : "flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg scale-x-90"}>
                                <div className="h-[250px]">
                                    <img className="w-full h-full" src={featuredVehicle.image} alt="" />
                                </div>
                                <div className="p-10">
                                    <h2 className="text-xl font-semibold mb-2">{featuredVehicle.model}</h2>
                                    <ul>
                                        {
                                            featuredVehicle.features.map((feature,idx)=>
                                                <li key={idx} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="ml-2">{feature}</span>
                                        </li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="flex px-10 pb-10 justfy-center">
                                    <p className="capitalize "><span className="text-lg font-semibold">price:</span> {featuredVehicle.price}</p>
                                </div>
                            </div>)
                    }

                </div>


            </div>
        </div>
    );
};

export default FeaturedVehicles;