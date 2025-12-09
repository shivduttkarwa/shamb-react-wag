import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import "./ArchScrollReveal.css";

const publicUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

const ArchScrollReveal: React.FC = () => {
  useEffect(() => {
    // Set z-index for images
    document
      .querySelectorAll(".arch__right .arch-img-wrapper")
      .forEach((element) => {
        const order = element.getAttribute("data-index");
        if (order !== null) {
          (element as HTMLElement).style.zIndex = order;
        }
      });

    // Mobile layout handler (only handle order)
    function handleMobileLayout() {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const leftItems = gsap.utils.toArray(
        ".arch__left .arch__info"
      ) as Element[];
      const rightItems = gsap.utils.toArray(
        ".arch__right .arch-img-wrapper"
      ) as Element[];

      if (isMobile) {
        // Interleave items using order
        leftItems.forEach((item, i) => {
          (item as HTMLElement).style.order = (i * 2).toString();
        });
        rightItems.forEach((item, i) => {
          (item as HTMLElement).style.order = (i * 2 + 1).toString();
        });
      } else {
        // Clear order for desktop
        leftItems.forEach((item) => {
          (item as HTMLElement).style.order = "";
        });
        rightItems.forEach((item) => {
          (item as HTMLElement).style.order = "";
        });
      }
    }

    // Debounce resize for performance
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileLayout, 100);
    };

    window.addEventListener("resize", handleResize);

    // Run on initial load
    handleMobileLayout();

    const imgs = gsap.utils.toArray(".arch-img-wrapper img") as Element[];
    // FORMA footer letter hover colors made lighter for backgrounds
    const bgColors = [
      "#ffe9e9", // Light coral red (#ff6b6b made lighter)
      "#e8faf9", // Light turquoise (#4ecdc4 made lighter) 
      "#fffae6", // Light sunny yellow (#ffe66d made lighter)
      "#f0faf6"  // Light mint green (#a8e6cf made lighter)
    ];

    // GSAP Animation with Media Query - EXACT COPY FROM ORIGINAL
    ScrollTrigger.matchMedia({
      "(min-width: 769px)": function () {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".arch",
            start: "top top",
            end: "bottom bottom",
            pin: ".arch__right",
            scrub: true,
          },
        });

        gsap.set(imgs, {
          clipPath: "inset(0)",
          objectPosition: "0px 0%",
        });

        imgs.forEach((_, index) => {
          const currentImage = imgs[index];
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

          const sectionTimeline = gsap.timeline();

          if (nextImage) {
            sectionTimeline
              .to(
                ".arch-scroll-section",
                {
                  backgroundColor: bgColors[index],
                  duration: 1.5,
                  ease: "power2.inOut",
                },
                0
              )
              .to(
                currentImage,
                {
                  clipPath: "inset(0px 0px 100%)",
                  objectPosition: "0px 60%",
                  duration: 1.5,
                  ease: "none",
                },
                0
              )
              .to(
                nextImage,
                {
                  objectPosition: "0px 40%",
                  duration: 1.5,
                  ease: "none",
                },
                0
              );
          }

          mainTimeline.add(sectionTimeline);
        });
      },

      "(max-width: 768px)": function () {
        const mbTimeline = gsap.timeline();
        gsap.set(imgs, {
          objectPosition: "0px 60%",
        });

        imgs.forEach((image, index) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top-=70% top+=50%",
              end: "bottom+=200% bottom",
              scrub: true,
            },
          });

          innerTimeline
            .to(image, {
              objectPosition: "0px 30%",
              duration: 5,
              ease: "none",
            })
            .to(".arch-scroll-section", {
              backgroundColor: bgColors[index],
              duration: 1.5,
              ease: "power2.inOut",
            });

          mbTimeline.add(innerTimeline);
        });
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="arch-scroll-section">
      <div className="arch-journey-heading">
        <h2 className="arch-journey-title">
          Our Journey
        </h2>
      </div>
      <div className="arch-container">
        <div className="arch-spacer"></div>

        <div className="arch">
          <div className="arch__left">
            <div className="arch__info" id="sustainable-arch">
              <div className="arch-content">
                <h2 className="arch-header" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  The Early Sketches
                </h2>
                <div className="arch-desc-expanded">
                  <p className="arch-desc">
                    From a small studio and a single drafting table, we launched with a promise to design mindful, human-centered spaces rooted in craft. Our founding principles were simple: every line drawn should serve both beauty and purpose.
                  </p>
                  <p className="arch-desc">
                    Our first award-winning project, the Hillside Retreat, established our reputation for seamlessly blending indoor and outdoor living spaces while honoring the natural landscape.
                  </p>
                </div>
                <Link
                  className="arch-link"
                  to="/projects"
                  style={{ backgroundColor: "#5b7c4f" }}
                >
                  <span style={{ color: "#faf8f3" }}>See 2005 Highlights</span>
                </Link>
              </div>
            </div>

            <div className="arch__info" id="modern-arch">
              <div className="arch-content">
                <h2 className="arch-header" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Modern Living Stories
                </h2>
                <div className="arch-desc-expanded">
                  <p className="arch-desc">
                    Our portfolio expanded to city residences and hospitality, refining clean lines, layered light, and elegant material palettes. This era marked our transition from rural retreats to urban sophistication.
                  </p>
                  <p className="arch-desc">
                    We developed our signature approach to light management and sustainable materials, creating the acclaimed Metropolis Loft series that maximized natural illumination in dense urban environments.
                  </p>
                </div>
                <Link
                  className="arch-link"
                  to="/projects"
                  style={{ backgroundColor: "#4a6b3e" }}
                >
                  <span style={{ color: "#faf8f3" }}>Explore 2010 Work</span>
                </Link>
              </div>
            </div>

            <div className="arch__info" id="luxury-arch">
              <div className="arch-content">
                <h2 className="arch-header" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Signature Interiors
                </h2>
                <div className="arch-desc-expanded">
                  <p className="arch-desc">
                    Bespoke joinery, tactile fabrics, and art-forward moments defined a new era of interiors designed to feel quietly luxurious. We partnered with master craftspeople to create custom furniture integral to each space's identity.
                  </p>
                  <p className="arch-desc">
                    Our signature philosophy emerged: spaces should feel collected over time, not decorated all at once. Custom textiles from our in-house studio became hallmarks, adding warmth to our clean architectural lines.
                  </p>
                </div>
                <Link
                  className="arch-link"
                  to="/projects"
                  style={{ backgroundColor: "#d4462a" }}
                >
                  <span style={{ color: "#faf8f3" }}>View 2016 Craft</span>
                </Link>
              </div>
            </div>

            <div className="arch__info" id="smart-arch">
              <div className="arch-content">
                <h2 className="arch-header" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Forward Momentum
                </h2>
                <div className="arch-desc-expanded">
                  <p className="arch-desc">
                    We now weave sustainability, wellness technology, and immersive storytelling into every project—designing for the decades ahead. Our current work represents 25 years of learning and innovation.
                  </p>
                  <p className="arch-desc">
                    Smart home integration enhances rather than dominates the living experience, while our commitment to carbon-neutral construction creates a blueprint for responsible architecture's future.
                  </p>
                </div>
                <Link
                  className="arch-link"
                  to="/services"
                  style={{ backgroundColor: "#f4a845" }}
                >
                  <span style={{ color: "#2c2c2c" }}>Preview the Future</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="arch__right">
            <div className="arch-img-wrapper" data-index="4">
              <img
                src={`${publicUrl}images/l3.jpg`}
                alt="Sustainable Living"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/l2.jpg`;
                }}
              />
            </div>

            <div className="arch-img-wrapper" data-index="3">
              <img
                src={`${publicUrl}images/l4.jpg`}
                alt="Modern Architecture"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/l5.jpg`;
                }}
              />
            </div>

            <div className="arch-img-wrapper" data-index="2">
              <img
                src={`${publicUrl}images/l6.jpg`}
                alt="Luxury Interiors"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/sm1.jpg`;
                }}
              />
            </div>

            <div className="arch-img-wrapper" data-index="1">
              <img
                src={`${publicUrl}images/l7.jpg`}
                alt="Smart Home Technology"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/l8.jpg`;
                }}
              />
            </div>
          </div>
        </div>

        <div className="arch-spacer"></div>
      </div>
    </section>
  );
};

export default ArchScrollReveal;
