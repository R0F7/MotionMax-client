import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const OurPartners = () => {
    const axiosCommon = useAxiosCommon();

    const { data: partners = [] } = useQuery({
        queryKey: ['partners'],
        queryFn: async () => {
            const res = await axiosCommon.get('/partners');
            return res.data
        }
    })
    // console.log(partners);

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold">Collaborating with Industry Leaders</h2>
                <p className="w-[95%] lg:w-[70%] mx-auto mt-2">We partner with top companies to enhance our offerings and deliver exceptional value. These collaborations drive excellence, sustainability, and innovation in the automotive industry</p>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6 my-10 md:my-20 mx-4 md:mx-0">
                {
                    partners.map((partner, idx) =>
                        <div key={idx} className="md:h-32">
                            <img className="h-full w-full rounded-md shadow-lg" src={partner.image} alt={partner.name} />
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default OurPartners;