import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import ServiceCard from "../ServiceCard/ServiceCard";

const Services = () => {
    const axiosCommon = useAxiosCommon();

    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await axiosCommon.get('/services');
            return res.data
        }
    })
    // console.log(services);

    return (
        <div>
            <div className="text-center">
                <h2 className="text-3xl font-semibold">All-Inclusive Services Hub</h2>
                <p className="w-[95%] lg:w-[70%] mx-auto mt-2"> Discover a holistic array of automotive services tailored to your needs. From sales and leasing to support, management, and sustainability initiatives, our comprehensive solutions ensure your journey is smooth and sustainable.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-5 md:gap-7 mt-10 mx-4 md:mx-0">
                {
                    services.map((service, idx) => <ServiceCard key={idx} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;