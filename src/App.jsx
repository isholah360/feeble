// App.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const App = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef([]);
  const birdLeftRef = useRef(null);
  const birdRightRef = useRef(null);

  const heroCloud = useRef(null);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Bottom-left → Top-right → Bottom-left
    gsap.to(birdLeftRef.current, {
      x: vw + 200, // move full width to the right
      y: -vh - 200, // move full height up
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    // Bottom-right → Top-left → Bottom-right
    gsap.to(birdRightRef.current, {
      x: -vw - 200, // move full width to the left
      y: -vh - 200, // move full height up
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }, []);

 useEffect(() => {
  gsap.fromTo(
    heroCloud.current,
    { 
      y: -200,       // start lower
      opacity: 0    // invisible
    },
    { 
      y: 0,         // final position
      opacity: 1,   // fully visible
      duration: 8,  // slower so effect is clear
      ease: "power3.out",
      scrollTrigger: {
        trigger: heroCloud.current,
        start: "top 70%",  // start animation later
        end: "top 60%",    // animation ends further down
        scrub: 1,          // smooth over scroll
        toggleActions: "play none none none",
      },
    }
  );
}, []);




  // Utility to add refs
  const setButtonRef = (el, index) => {
    buttonsRef.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance animation
      gsap.from([taglineRef.current, headlineRef.current, subtextRef.current], {
        duration: 0.8,
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.fromTo(
        buttonsRef.current,
        {
          y: -10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Optional: Floating bird/cloud animation (infinitely repeating)
      const birds = document.querySelectorAll(".floating-bird");
      birds.forEach((bird, i) => {
        gsap.to(bird, {
          y: 8,
          duration: 2 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }, heroRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div
      className="min-h-screen bg-[#e6f1ff] relative overflow-hidden"
      ref={heroRef}
    >
      {/* Navbar */}
      <nav className="bg-white rounded-full text-sm shadow-md px-6 py-3 max-w-4xl mx-auto flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2">
          <img src="./logoz.png" alt="" className="h-10 w-max-[10rem]" />
        </div>
        <div className="hidden md:flex space-x-8 text-gray-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition">
            How it Works
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition">
            Pricing
          </a>
          <a href="#use-case" className="hover:text-blue-600 transition">
            Use Case
          </a>
          <a href="#faq" className="hover:text-blue-600 transition">
            FAQ
          </a>
        </div>
        <button className="relative overflow-hidden px-3 py-2 rounded-full bg-[#007bff] border border-[#007bff] group">
          <span className="relative z-10 text-white group-hover:text-[#007bff] transition-colors duration-300">
            Contact Sales
          </span>

          <span
            className="
      absolute inset-0 bg-white
      translate-x-full group-hover:translate-x-0
      transition-transform duration-500 ease-out
    "
          ></span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center relative">
        {/* Tagline */}
        <div
          ref={taglineRef}
          className="bg-white text-[#007bff] px-4 py-1 rounded-full text-xm font-medium mb-6 flex items-center space-x-2 "
        >
          <span className="flex w-7 h-4 pb-2 justify-center items-center bg-[#007bff] rounded-xl text-white font-bold mr-1">
            ...
          </span>
          #1 iMessage Automation Tool
        </div>

        {/* Main Headline */}
        <div className="w-full max-w-3xl">
          <h1
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
          >
            <span className="text-[#007bff]">iMessage</span> Automation <br />
            for Teams and AI Workflows.
          </h1>
        </div>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-sm text-gray-800 max-w-[27rem] mb-8"
        >
          Coup lets you, your team, or AI workflows send iMessages directly from
          your phone number, running securely on your Mac or Mac Mini.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            ref={(el) => setButtonRef(el, 0)}
            className="bg-[#007bff] hover:bg-blue-700 text-white h-9 px-4 flex items-center justify-center rounded-full transition"
          >
            Get Started
          </button>
          <button
            ref={(el) => setButtonRef(el, 1)}
            className="border border-gray-500 hover:border-gray-400 h-9 px-4 rounded-full font-medium transition flex items-center justify-center"
          >
            <img src="./apple-logo.png" alt="" className="w-4 h-4 mr-2" />
            <hr className="border-gray-500 w-4 bg-white rotate-90 mr-1" />
            Download the Mac app
          </button>
        </div>
      </section>

      {/* Decorative Birds (floating) */}
      <div className="absolute top-40 left-45 floating-bird hidden md:block">
        <img src="./he.png" alt="" />
      </div>

      <div className="absolute top-48 left-85 floating-bird hidden md:block">
        <img src="./he.png" alt="" />
      </div>

      <div className="absolute top-50 right-35 floating-bird hidden md:block">
        <img src="./he.png" alt="" />
      </div>
      <div className="absolute top-75 right-55 floating-bird hidden md:block">
        <img src="./he.png" alt="" />
      </div>

      {/* Floating cloud-like shapes */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="floating-bird absolute bottom-10 opacity-70"
          style={{
            left: `${20 + i * 20}%`,
            width: "120px",
            height: "60px",
            background: "#dbeafe",
            borderRadius: "9999px",
            filter: "blur(10px)",
          }}
        />
      ))}

      <div
        ref={heroCloud}
        class="relative w-full h-[50vh] overflow-hidden bg-[#e6f1ff]"
      >
        <div className="absolute top-[65%] left-[10%] z-30 floating-bird hidden md:block">
          <img src="./hc.png" alt="" />
        </div>

        <div className="absolute top-[45%] left-[30%] z-30 floating-bird hidden md:block">
          <img src="./hd.png" alt="" />
        </div>

        <div className="absolute top-[45%] right-[15%] z-30 floating-bird hidden md:block">
          <img src="./hb.png" alt="" />
        </div>

        <div className="absolute top-[60%] right-[30%] z-30 floating-bird hidden md:block">
          <img src="./ha.png" alt="" />
        </div>


        <div className="absolute top-[60%] w-full text-center z-30 floating-bird md:block">
          Scroll to learn more
          <br />
          <span className="text-2xl flex items-center justify-center font-extrabold"> &#8595; </span>
        </div>



        <div class="absolute z-10 bottom-0 left-0 w-full h-2/3">
          <div class="absolute top-[-5rem] left-[-20%] w-[25rem] h-[25rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-0 left-[-2%] w-[25rem] h-[25rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[-2rem] left-[3%] w-[15rem] h-[15rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[2.5rem] left-[15%] w-[22rem] h-[22rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[-3rem] left-[30%] w-[15rem] h-[15rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[3rem] left-[35%] w-[30rem] h-[30rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[4rem] left-[45%] w-[30rem] h-[30rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[1rem] left-[55%] w-[15rem] h-[15rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[4.5rem] left-[65%] w-[25rem] h-[25rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[4.5rem] left-[80%] w-[25rem] h-[25rem] bg-[#d4e8ff] rounded-[100%]"></div>
          <div class="absolute top-[-2rem] left-[87%] w-[25rem] h-[25rem] bg-[#d4e8ff] rounded-[100%]"></div>

          {/* <div class="absolute bottom-[20%] left-[5%] w-[35%] h-[35%] bg-sky-200 rounded-full"></div>
          <div class="absolute bottom-[25%] left-[25%] w-[45%] h-[45%] bg-sky-200 rounded-full"></div>
          <div class="absolute bottom-[22%] left-[55%] w-[40%] h-[40%] bg-sky-200 rounded-full"></div>
          <div class="absolute bottom-[18%] left-[75%] w-[30%] h-[30%] bg-sky-200 rounded-full"></div> */}
        </div>
      </div>
      <div ref={birdLeftRef} className="absolute left-[-10%] bottom-[-10%]">
        <img src="./hc.png" alt="bird" />
      </div>

      {/* Bottom-right bird */}
      <div ref={birdRightRef} className="absolute right-[-10%] bottom-[-10%]">
        <img src="./hc.png" alt="bird" />
      </div>
    </div>
  );
};

export default App;
