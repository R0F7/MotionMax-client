import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const axiosCommon = useAxiosCommon();

    const { data: testimonials = [] } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosCommon.get('/testimonials');
            return res.data
        }
    })
    // console.log(testimonials);

    const slidesPerView = 1;
    const slidesPerGroup = 1;
    const loop = testimonials.length >= (slidesPerView + slidesPerGroup);

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold">Testimonials</h2>
                <p className="w-[95%] lg:w-[70%] mx-auto mt-2">Hear from our satisfied customers! Discover how Motor Corporation's exceptional services and dedicated support have made a difference in their automotive experiences. Read real stories and reviews from our clients</p>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={loop}
                // pagination={{
                //     clickable: true,
                // }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    testimonials.map((testimonial, idx) => <SwiperSlide key={idx}>
                        <div className='w-full h-[380px] relative'>
                            <img className='w-full h-full border border-red-600' src="https://i.ibb.co/Wv1RCVH/customer-satisfaction-rating-1-jpg.webp" alt="" />
                            <div className='w-full h-full bg-black absolute top-0 left-0 bg-opacity-50 flex items-center justify-center'>
                                <div className='text-white text-center'>
                                    <div className='flex justify-center rounded-full'>
                                        <img className='w-14 h-14 rounded-full mb-4' src={testimonial.image} alt={testimonial.client_name} />
                                    </div>
                                    <h2 className='text-2xl font-semibold'>{testimonial.client_name}</h2>
                                    <p className='w-[70%] mx-auto mt-2'>{testimonial.review}</p>
                                    <div className='flex justify-center mt-1'>
                                        <Rating ItemStyles={{ color:'red'}} style={{ maxWidth: 180 }} value={testimonial.rating} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;