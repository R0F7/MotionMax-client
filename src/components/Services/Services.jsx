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
                <p className="w-[70%] mx-auto mt-2"> Discover a holistic array of automotive services tailored to your needs. From sales and leasing to support, management, and sustainability initiatives, our comprehensive solutions ensure your journey is smooth and sustainable.</p>
            </div>
            <div className="grid grid-cols-3 gap-7 mt-10">
                {
                    services.map((service, idx) => <ServiceCard key={idx} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;