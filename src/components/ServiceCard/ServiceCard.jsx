import PropTypes from 'prop-types';

const ServiceCard = ({ service }) => {
    const { title, image, features } = service;

    return (
        <div className="">
            <div className="break-words bg-[#00b4d8] w-full shadow-lg rounded-lg h-[570px] md:h-[530px]">
                <div className="relative">
                    <img alt="..." src={ image } className="w-full rounded-t-lg h-[250px]" />
                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-[120px] bottom-0">
                        <polygon points="-30,95 583,95 583,65" className="text-[#00b4d8] fill-current"></polygon>
                    </svg>
                </div>
                <blockquote className="relative p-8 mb-4">
                    <h4 className="text-xl font-bold text-white">{title}</h4>
                  <div className='mt-1.5'>
                    {
                        features.map((feature,idx) => (
                            <div key={idx} className='text-white mb-2'>
                                <li className='list-disc font-semibold'>{feature.sub_title}</li>
                                <p className='mt-0.5 ml-6 text-sm'>{feature.short_description}</p>
                            </div>
                        ))
                    }
                  </div>
                </blockquote>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.object
};

export default ServiceCard;