import FeaturedVehicles from "../../components/FeaturedVehicles/FeaturedVehicles";
import OurPartners from "../../components/OurPartners/OurPartners";
import Services from "../../components/Services/Services";
import Slider from "../../components/Slider/Slider";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <div className="mt-2.5">
                <Slider></Slider>
            </div>
            <div className="my-16">
                <Services></Services>
            </div>
            <div className="my-16">
                <FeaturedVehicles></FeaturedVehicles>
            </div>
            <div className="my-16">
                <OurPartners></OurPartners>
            </div>
            <div className="my-16">
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;