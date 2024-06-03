import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const Slider = () => {
    const axiosCommon = useAxiosCommon();

    const { data: sliders = [] } = useQuery({
        queryKey: ['slider'],
        queryFn: async () => {
            const res = await axiosCommon.get('/slider');
            return res.data
        }
    })
    // console.log(sliders);

    const slidesPerView = 1;
    const slidesPerGroup = 1;
    const loop = sliders.length >= (slidesPerView + slidesPerGroup);

    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={loop}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    sliders.map((slider, idx) => <SwiperSlide key={idx}>
                        <div className='w-full h-[650px] relative'>
                            <img className='w-full h-full border border-red-600' src={slider.image} alt="" />
                            <div className='w-full h-full bg-black absolute top-0 left-0 bg-opacity-50 flex items-center justify-center'>
                                <div className='text-white text-center'>
                                    <h2 className='text-4xl font-semibold'>{slider.title}</h2>
                                    <p className='w-[70%] mx-auto mt-2.5'>{slider.content}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Slider;