"use client";
import Drift from "drift-zoom";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SliderZoomOuterProps {
  thumbImage: string[];
  images: string[];
}

export default function SliderZoomOuter({
  thumbImage,
  images,
}: SliderZoomOuterProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const swiperSlides = images.map((image) => {
    return {
      imgSrc: image,
      width: 713,
      height: 1070,
      alt: "",
      dataZoom: image,
    };
  });

  const swiperSlidesThumbs = thumbImage.map((image) => {
    return {
      imgSrc: image,
      width: 713,
      height: 1070,
      alt: "",
      dataZoom: image,
    };
  });

  useEffect(() => {
    const imageZoom = () => {
      const driftAll = document.querySelectorAll(
        ".tf-image-zoom"
      ) as NodeListOf<HTMLElement>;
      const pane = document.querySelector(".tf-zoom-main") as HTMLElement;

      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: 0,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");

    const handleMouseOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const parent = target?.closest(".section-image-zoom");
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const parent = target?.closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <Swiper
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        className="tf-product-media-thumbs other-image-zoom"
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        breakpoints={{
          0: {
            direction: "horizontal",
          },
          1150: {
            direction: "vertical",
          },
        }}
      >
        {swiperSlidesThumbs.map((slide, index) => (
          <SwiperSlide key={index} className="stagger-item">
            <div className="item">
              <Image
                className="lazyload"
                data-src={slide.imgSrc}
                alt={slide.alt}
                src={slide.imgSrc} // Optional fallback for non-lazy loading
                width={slide.width}
                height={slide.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Gallery>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="tf-product-media-main"
          id="gallery-swiper-started"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Navigation]}
        >
          {swiperSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Item
                original={slide.imgSrc}
                thumbnail={slide.imgSrc}
                width={slide.width}
                height={slide.height}
              >
                {({ ref, open }) => (
                  <a
                    className="item"
                    data-pswp-width={slide.width}
                    data-pswp-height={slide.height}
                    onClick={open}
                  >
                    <Image
                      className="tf-image-zoom lazyload"
                      data-zoom={slide.dataZoom}
                      data-src={slide.imgSrc}
                      ref={ref}
                      alt=""
                      width={slide.width}
                      height={slide.height}
                      src={slide.imgSrc}
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}

          {/* Navigation buttons */}
          <div className="swiper-button-next button-style-arrow thumbs-next"></div>
          <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
        </Swiper>{" "}
      </Gallery>
    </>
  );
}
