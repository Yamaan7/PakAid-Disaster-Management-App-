import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BlogData, UserBlog } from '@/types/blog';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface DisasterSliderProps {
    blogs: UserBlog[];
}

export function DisasterSlider({ blogs }: DisasterSliderProps) {
    const featuredBlogs = blogs.slice(0, 5); // Get first 5 blogs

    return (
        <div className="relative w-full h-[60vh] mb-12">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full"
            >
                {featuredBlogs.map((blog) => (
                    <SwiperSlide key={blog._id}>
                        <div className="relative w-full h-full">
                            <img
                                src={`http://localhost:8080/${blog.image}`}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <div className="container mx-auto">
                                    <span className="inline-block px-4 py-1 bg-red-500 rounded-full text-sm font-semibold mb-4">
                                        {blog.severity}
                                    </span>
                                    <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>
                                    <p className="text-lg mb-4">📍 {blog.location}</p>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur"
                                    >
                                        <Link href={`/blog/${blog._id}`}>
                                            Learn More
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}