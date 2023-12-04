import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const Feature = () => {


    return (
        <div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://i.ibb.co/NSbbL5z/feat-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/z53h2Qr/feat-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/gjxFB1x/feat-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/Rv5dnt3/feat-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/qF8vxG9/feat-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/P5PHd6Z/feat-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/sKZL2pj/feat-2.jpg" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Feature;