import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useMap } from "../hooks/useMap";
import { userGroups } from "../constants/userGroups";
import { GallerySlider } from "./GallerySlider";
import { Logo3d } from "./Logo3d";

export const InfoModal = () => {
  const modalRef = useRef(null);
  const mainRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { isModalOpen, setIsModalOpen, groupData, setGroupData } = useMap();
  const [data, setData] = useState(groupData);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isModalOpen) {
      // Animación de apertura
      gsap.to(modalRef.current, {
        y: 0,
        x: 0,
        duration: 0.3,
        ease: "power3.out",
        display: "block", // Asegurarse de que el modal sea visible
      });
    } else {
      // Animación de cierre
      gsap.to(modalRef.current, {
        y: window.innerWidth <= 768 ? "100%" : 0,
        x: window.innerWidth <= 768 ? 0 : "100%",
        duration: 0.5,
        ease: "power3.out",
      });
      if (window.innerWidth <= 768) {
        gsap.to(modalRef.current, {
          height: "70%",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }, [isModalOpen, expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);

    if (window.innerWidth <= 768) {
      gsap.to(modalRef.current, {
        height: !expanded ? "100%" : "65%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleChaneGroup = (direction) => {
    if (direction === "next") {
      setGroupData((prev) => (prev + 1) % userGroups.length);
    } else {
      setGroupData(
        (prev) => (prev - 1 + userGroups.length) % userGroups.length,
      );
    }
  };

  useEffect(() => {
    // console.log(data);

    setData(userGroups[groupData]);
    // if (groupData !== data) {
    // }
  }, [groupData, data]);

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setExpanded(false);
  };

  return (
    <article
      ref={modalRef}
      className={`fixed ${window.innerWidth <= 768 ? "right-0 bottom-0 left-0 h-[70%]" : "top-0 right-0 bottom-0 w-1/2"} z-[99999999] transform overflow-hidden bg-[#150A35] text-white shadow-lg transition-opacity duration-500`}
      // Inicialmente oculto
    >
      {/* Header with close button */}
      <header className="relative flex items-center justify-between border-b border-[#9E64F9] p-5">
        <div className="flex items-center gap-2">
          <div
            onClick={() => handleChaneGroup("prev")}
            className="flex size-8 items-center justify-center rounded-full border border-[#9E64F9]"
          >
            <svg
              className="rotate-270"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill="#9E64F9"
                d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"
              />
            </svg>
          </div>
          <div
            onClick={() => handleChaneGroup("next")}
            className="flex size-8 items-center justify-center rounded-full border border-[#9E64F9]"
          >
            <svg
              className="rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill="#9E64F9"
                d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"
              />
            </svg>
          </div>
        </div>

        <div
          className="absolute top-5 left-1/2 flex -translate-x-1/2 justify-center md:pointer-events-none md:opacity-0"
          onClick={toggleExpand}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={`size-5 cursor-pointer transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            <path
              fill="#9E64F9"
              d="m2.931 10.843l4.685-4.611a.546.546 0 0 1 .768 0l4.685 4.61a.55.55 0 0 0 .771 0a.53.53 0 0 0 0-.759l-4.684-4.61a1.65 1.65 0 0 0-2.312 0l-4.684 4.61a.53.53 0 0 0 0 .76a.55.55 0 0 0 .771 0"
            />
          </svg>
        </div>
        <button
          onClick={handleClose}
          className="group transform rounded-full border border-[#9E64F9] p-1 transition-all duration-300 hover:scale-105 hover:rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              color="#9E64F9"
              className="transition-all duration-300 group-hover:scale-95"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      {/* Content with scroll */}
      <main
        className="overflow-x h-[calc(100%-4rem)] overflow-x-hidden overflow-y-auto scroll-smooth p-4 md:px-10"
        ref={mainRef}
      >
        <h1 className="my-6 flex items-center gap-2">
          <span className="text-2xl font-bold text-balance text-[#9E64F9]">
            AWS User Group {data.name}
          </span>
        </h1>

        <GallerySlider images={data.images} />

        {/* Description */}
        <div className="my-6">
          <p className="md:tex-base text-sm leading-5.5 text-pretty whitespace-pre-line text-purple-100">
            {data.description}
          </p>
        </div>

        {/* Social Media */}
        <footer className="mb-6">
          <div className="flex flex-wrap gap-4 text-[#9E64F9]">
            {data.meetup && (
              <a
                href={data.meetup}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full max-w-sm items-center justify-center gap-2 rounded-md border border-[#9E64F9] px-4 py-2 text-[#9E64F9] transition-all duration-300 hover:gap-4 md:w-auto"
              >
                <span className="text-md inline-block text-center">
                  Unirse al meetup
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 29 24"
                >
                  <path
                    fill="currentColor"
                    d="M28.595 23.062c-.38.374-.86.649-1.395.781l-.021.004a7 7 0 0 1-1.358.126a7.3 7.3 0 0 1-3.264-.762l.043.019c-4.365-1.92-3.401-6.785-1.486-10.139c.575-1.007 1.142-2.022 1.713-3.04c.449-.8 1.421-2.155 1.04-3.136c-.4-1.029-1.467-1.035-2.168-.168a15.8 15.8 0 0 0-1.669 2.901l-.04.102c-.507 1.058-3.04 6.618-3.04 6.618a10.4 10.4 0 0 1-2.107 2.925l-.002.002a2.2 2.2 0 0 1-1.381.484c-.441 0-.851-.129-1.196-.351l.009.005a1.51 1.51 0 0 1-.58-1.65l-.003.011c.527-3.022 5.111-10.054 1.95-10.55c-1.212-.19-1.541 1.158-1.914 2.019c-.618 1.422-1.089 2.902-1.749 4.307a24 24 0 0 0-1.706 4.858l-.034.169c-.32 1.386-.731 3.151-2.308 3.573c-4.32 1.154-5.63-1.696-5.63-1.697c-.705-2.24-.037-4.26.64-6.417c.525-1.666.838-3.385 1.502-5.006C3.626 6.16 4.807.128 9.081.514a8.5 8.5 0 0 1 3.287 1.221l-.035-.021c.856.499 1.508.766 2.505.228c.97-.522 1.414-1.495 2.57-1.829c1.238-.358 2.053.171 2.979.917c1.298 1.04 1.44.572 2.511.298a7 7 0 0 1 1.846-.244q.555 0 1.087.083l-.04-.005c5.01.858 1.819 7.254.624 9.824c-.778 1.672-4.49 8.396-1.2 9.299c.992.272 2.271.148 3.098.86c.838.722.755 1.404.282 1.915z"
                  ></path>
                </svg>
              </a>
            )}
            {data.socialMedia?.facebook && (
              <a
                href={data.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10"
              >
                Facebook
              </a>
            )}
            {data.socialMedia?.twitter && (
              <a
                href={data.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10"
              >
                Twitter
              </a>
            )}
            {data.socialMedia?.instagram && (
              <a
                href={data.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.437 20.937H5.563a2.5 2.5 0 0 1-2.5-2.5V5.563a2.5 2.5 0 0 1 2.5-2.5h12.874a2.5 2.5 0 0 1 2.5 2.5v12.874a2.5 2.5 0 0 1-2.5 2.5M5.563 4.063a1.5 1.5 0 0 0-1.5 1.5v12.874a1.5 1.5 0 0 0 1.5 1.5h12.874a1.5 1.5 0 0 0 1.5-1.5V5.563a1.5 1.5 0 0 0-1.5-1.5Z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 16.594A4.595 4.595 0 1 1 16.6 12a4.6 4.6 0 0 1-4.6 4.594M12 8.4a3.595 3.595 0 1 0 3.6 3.6A3.6 3.6 0 0 0 12 8.4"
                  />
                  <circle cx="17.2" cy="6.83" r="1.075" fill="currentColor" />
                </svg>
              </a>
            )}
            {data.socialMedia?.linkedin && (
              <a
                href={data.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 p-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <g fill="currentColor">
                    <path d="M19.515 11.952c-.678 0-1.18.171-1.573.387c-.063-.224-.27-.388-.514-.339h-2.984c-.295-.049-.534.19-.443.5v11c-.091.28.148.52.443.5h2.984c.295.02.534-.22.534-.515l-.001-6.648c-.001-.003-.012-.321.189-.54c.161-.174.438-.263.821-.263c.638 0 .922.261 1.028.845v6.606c-.105.295.134.535.429.515h3.145c.295.02.534-.22.428-.515v-6.828c.105-3.472-2.368-4.705-4.486-4.705M23.038 23h-2.076v-6.121c0-1.181-.763-1.913-1.99-1.913c-.694 0-1.234.204-1.606.606c-.517.56-.477 1.27-.366 1.428v6h-2.022v-9.98h1.916v.336a.532.532 0 0 0 .86.423l.14-.108c.405-.319.824-.65 1.622-.65c.826 0 3.523.263 3.523 3.637zM11 6.966c-1.122 0-2.034.912-2.034 2.034s.912 2.034 2.034 2.034s2.034-.912 2.034-2.034S12.122 6.966 11 6.966m0 3c-.532 0-.966-.434-.966-.966s.434-.966.966-.966s.966.434.966.966s-.434.966-.966.966m1.428 1.985H9.46c-.295 0-.534.239-.46.549v11c-.074.28.165.52.46.5h2.968c.295.02.534-.22.534-.515v-11a.534.534 0 0 0-.534-.534M12 23H9.994v-9.98H12z" />
                    <path d="M16-.034C7.158-.034-.034 7.158-.034 16S7.158 32.034 16 32.034S32.034 24.842 32.034 16S24.842-.034 16-.034m0 31C7.748 30.966 1.034 24.252 1.034 16S7.748 1.034 16 1.034S30.966 7.748 30.966 16S24.252 30.966 16 30.966" />
                  </g>
                </svg>
              </a>
            )}
            {data.socialMedia?.github && (
              <a
                href={data.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M24 2.5a21.5 21.5 0 0 0-6.8 41.9c1.08.2 1.47-.46 1.47-1v-3.65c-6 1.3-7.24-2.88-7.24-2.88A5.7 5.7 0 0 0 9 33.68c-1.95-1.33.15-1.31.15-1.31a4.52 4.52 0 0 1 3.29 2.22c1.92 3.29 5 2.34 6.26 1.79a4.6 4.6 0 0 1 1.37-2.88c-4.78-.54-9.8-2.38-9.8-10.62a8.3 8.3 0 0 1 2.22-5.77a7.68 7.68 0 0 1 .21-5.69s1.8-.58 5.91 2.2a20.46 20.46 0 0 1 10.76 0c4.11-2.78 5.91-2.2 5.91-2.2a7.74 7.74 0 0 1 .21 5.69a8.28 8.28 0 0 1 2.21 5.77c0 8.26-5 10.07-9.81 10.61a5.12 5.12 0 0 1 1.46 4v5.9c0 .71.39 1.24 1.48 1A21.5 21.5 0 0 0 24 2.5"
                    strokeWidth="1"
                  />
                </svg>
              </a>
            )}
            {data.socialMedia?.youtube && (
              <a
                href={data.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M43.112 14.394a5 5 0 0 0-3.533-3.533c-2.314-.894-24.732-1.332-31.236.025A5 5 0 0 0 4.81 14.42c-1.045 4.583-1.124 14.491.026 19.177a5 5 0 0 0 3.533 3.533c4.583 1.055 26.371 1.203 31.236 0a5 5 0 0 0 3.533-3.533c1.114-4.993 1.193-14.287-.026-19.203"
                    strokeWidth="1"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M30.567 23.995L20.12 18.004v11.982Z"
                    strokeWidth="1"
                  />
                </svg>
              </a>
            )}
            {data.socialMedia?.whatsapp && (
              <a
                href={data.socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="m185.79 148.42l-32-16a4 4 0 0 0-4 .25l-16.64 11.1a44.56 44.56 0 0 1-20.91-20.91l11.1-16.64a4 4 0 0 0 .25-4l-16-32A4 4 0 0 0 104 68a36 36 0 0 0-36 36a84.09 84.09 0 0 0 84 84a36 36 0 0 0 36-36a4 4 0 0 0-2.21-3.58M152 180a76.08 76.08 0 0 1-76-76a28 28 0 0 1 25.58-27.9l13.8 27.61l-11 16.54A4 4 0 0 0 104 124a52.43 52.43 0 0 0 28 28a4 4 0 0 0 3.76-.37l16.54-11l27.61 13.8A28 28 0 0 1 152 180M128 28a100 100 0 0 0-87.47 148.5l-11.9 35.69a12 12 0 0 0 15.18 15.18l35.69-11.9A100 100 0 1 0 128 28m0 192a92 92 0 0 1-46.07-12.35a4.05 4.05 0 0 0-2-.54a4 4 0 0 0-1.27.21l-37.38 12.46a4 4 0 0 1-5.06-5.06l12.46-37.38a4 4 0 0 0-.33-3.27A92 92 0 1 1 128 220"
                  />
                </svg>
              </a>
            )}
          </div>
        </footer>

        <Logo3d image={data.logo} />

        {/* scrrol to top */}
        <div
          className="absolute right-4 bottom-4 size-9 cursor-pointer rounded-full border border-[#9E64F9] p-2 transition-transform duration-300 hover:scale-105"
          onClick={scrollToTop}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              fill="#9E64F9"
              fillRule="evenodd"
              d="M10 2a2 2 0 1 0-4 0a2 2 0 0 0 4 0m1.78 8.841a.75.75 0 0 1-1.06 0l-1.97-1.97v6.379a.75.75 0 0 1-1.5 0V8.871l-1.97 1.97a.75.75 0 1 1-1.06-1.06l3.25-3.25L8 6l.53.53l3.25 3.25a.75.75 0 0 1 0 1.061"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </main>
    </article>
  );
};
