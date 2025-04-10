import { useEffect, useState } from "react";
import gsap from "gsap";

const states = {
  total: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  fromLeft: "polygon(0 0, 0 0, 0 100%, 0 100%)",
  fromRight: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
};

export const GallerySlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const gotoSection = (index, direction) => {
    if (!images || images.length === 0) return; // Evitar errores si no hay imágenes
    if (isAnimating) return; // Evitar animaciones simultáneas
    setIsAnimating(true);
    const totalImages = images.length;
    const wrappedIndex = (index + totalImages) % totalImages;

    if (wrappedIndex === currentIndex) return; // Evitar animar la misma imagen
    console.log(currentIndex, wrappedIndex);

    if (direction === "next") {
      gsap.set(`.image-${currentIndex}`, {
        clipPath: states.fromLeft,
      });
      gsap.from(`.image-${currentIndex}`, {
        clipPath: states.total,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.set(`.image-${wrappedIndex}`, {
        clipPath: states.total,
      });
      gsap.from(`.image-${wrappedIndex}`, {
        clipPath: states.fromRight,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      gsap.to(
        `.image-${currentIndex}`,

        {
          clipPath: states.fromRight,
          duration: 0.5,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        `.image-${wrappedIndex}`,
        {
          clipPath: states.fromLeft,
        },
        {
          clipPath: states.total,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            setIsAnimating(false);
          },
        },
      );
    }

    setCurrentIndex(wrappedIndex);
  };

  const handleNext = () => {
    gotoSection(currentIndex + 1, "next");
  };

  const handlePrev = () => {
    gotoSection(currentIndex - 1, "prev");
  };

  useEffect(() => {
    if (!images || images.length === 0) return;
    setIsAnimating(true);
    gsap.set(`.image-${currentIndex}`, {
      clipPath: states.fromLeft,
    });
    gsap.fromTo(
      `.image-${0}`,
      {
        clipPath: states.fromLeft,
      },
      {
        clipPath: states.total,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          setIsAnimating(false);
          setCurrentIndex(0);
        },
      },
    );
  }, [images]);

  const handleDotClick = (index) => {
    if (index === currentIndex) return; // Evitar animar la misma imagen
    const direction = index > currentIndex ? "next" : "prev";
    gotoSection(index, direction);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative h-64 w-full md:h-96">
      {/* Slider container */}
      <div className="relative h-full w-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 h-full w-full image-${index}`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              willChange: "clip-path",
              clipPath: index === 0 ? states.total : states.fromLeft,
            }}
          ></div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        style={{ display: images.length > 1 ? "block" : "none" }}
        className="absolute top-1/2 -left-8 z-10 size-16 -translate-y-1/2 rounded-full bg-[#150A35] pr-3.5 outline-0"
      >
        <svg
          className="ml-auto rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="24"
          viewBox="0 0 12 24"
        >
          <path
            fill="#f3e8ff"
            fillRule="evenodd"
            d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
          />
        </svg>
      </button>
      <button
        style={{ display: images.length > 1 ? "block" : "none" }}
        onClick={handleNext}
        className="absolute top-1/2 -right-8 z-10 size-16 -translate-y-1/2 rounded-full bg-[#150A35] pl-3.5 outline-0"
      >
        <svg
          className="mr-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="24"
          viewBox="0 0 12 24"
        >
          <path
            fill="#f3e8ff"
            fillRule="evenodd"
            d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
          />
        </svg>
      </button>

      {/* Dots navigation */}
      <div
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
        style={{ display: images.length > 1 ? "flex" : "none" }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#9E64F9]/70" : "bg-purple-100/70"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};
