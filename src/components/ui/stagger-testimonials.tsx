"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Living Home didn't just design our house — they understood our family's internal routines. Flawless luxury execution.",
    by: "Priya & Rahul Mehta, Villa Architecture",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "The Vastu auditing team worked hand-in-hand with the designers. Our sea-facing duplex feels incredibly tranquil.",
    by: "Anita Sharma, Penthouse Interiors",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "Managing a construction in sloped Lonavala hills while residing in Dubai — Living Home handled everything flawlessly.",
    by: "Vikram Joshi, Biophilic Farmhouse",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "The Vastu report details regarding soil densities, air-flow coves, and water apertures saved us from costly mistakes.",
    by: "Kunal Singhal, Plot Audit",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "A detail-oriented design team with strict budget boundaries. They shipped physical material samples to our office!",
    by: "Rohan & Sonal Bansal, Luxury Duplex",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "Absolute masters of natural daylight. The exposed wood ceilings and raw stone claddings are jaw-dropping.",
    by: "Dr. Sameer Deshpande, Weekend Farm House",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're with Living Home, we're never going back. 100% recommended.",
    by: "Pam R., Marketing Director",
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    tempId: 7,
    testimonial: "The in-depth project analytics and daily logs gave us complete visibility. The ROI is incredible for us.",
    by: "Daniel M., Entrepreneur",
    imgSrc: "https://i.pravatar.cc/150?img=8"
  },
  {
    tempId: 8,
    testimonial: "It's just the best. Period. The living space they created for us exceeds every expectation.",
    by: "Fernando L., UX Designer",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 9,
    testimonial: "I switched 5 years ago and never looked back. Living Home is the gold standard for luxury interiors.",
    by: "Andy K., DevOps Engineer",
    imgSrc: "https://i.pravatar.cc/150?img=10"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a design firm like Living Home for YEARS. So glad I finally found one!",
    by: "Pete A., Sales Director",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 11,
    testimonial: "So simple and collaborative — they got our whole family's vision aligned in just a couple of meetings.",
    by: "Marina J., HR Manager",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 12,
    testimonial: "Living Home's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia W., Business Owner",
    imgSrc: "https://i.pravatar.cc/150?img=13"
  },
  {
    tempId: 13,
    testimonial: "The efficiency and quality of execution we've seen is off the charts. On budget, on time.",
    by: "Raj V., Operations Manager",
    imgSrc: "https://i.pravatar.cc/150?img=14"
  },
  {
    tempId: 14,
    testimonial: "Living Home revolutionized how we think about our living space. It's a complete game-changer!",
    by: "Lila P., Workflow Specialist",
    imgSrc: "https://i.pravatar.cc/150?img=15"
  },
  {
    tempId: 15,
    testimonial: "The scalability of their phased construction is impressive. They grew the project seamlessly with our budget.",
    by: "Trevor G., Growth Consultant",
    imgSrc: "https://i.pravatar.cc/150?img=16"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how Living Home continually innovates. Their Vastu-modern fusion is one step ahead.",
    by: "Naomi F., Innovation Lead",
    imgSrc: "https://i.pravatar.cc/150?img=17"
  },
  {
    tempId: 17,
    testimonial: "The ROI on our vacation home renovation was incredible. It's paid for itself many times over in rentals.",
    by: "Victor B., Finance Analyst",
    imgSrc: "https://i.pravatar.cc/150?img=18"
  },
  {
    tempId: 18,
    testimonial: "Their platform and process is so robust yet easy to follow. The perfect balance of art and execution.",
    by: "Yuki S., Tech Lead",
    imgSrc: "https://i.pravatar.cc/150?img=19"
  },
  {
    tempId: 19,
    testimonial: "We've tried many firms, but Living Home stands out in terms of reliability, taste, and performance.",
    by: "Zoe M., Performance Manager",
    imgSrc: "https://i.pravatar.cc/150?img=20"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-navy text-ivory border-navy"
          : "z-0 bg-white text-charcoal border-gold/20 hover:border-navy/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #C6A46A" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-gold/40"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-beige/20 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px #F8F6F2"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-serif italic font-light",
        isCenter ? "text-ivory" : "text-charcoal"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-xs font-sans font-semibold uppercase tracking-wider",
        isCenter ? "text-ivory/70" : "text-gold"
      )}>
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-beige/10"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-ivory border-2 border-gold/30 text-navy hover:bg-navy hover:text-ivory hover:border-navy",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-ivory border-2 border-gold/30 text-navy hover:bg-navy hover:text-ivory hover:border-navy",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
