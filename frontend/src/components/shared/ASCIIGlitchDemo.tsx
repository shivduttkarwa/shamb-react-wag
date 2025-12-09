import React from "react";
import ASCIIGlitchText from "./ASCIIGlitchText";

const ASCIIGlitchDemo: React.FC = () => {
  const demoTexts = [
    "Roadside Picnic — Arkady & Boris Strugatsky",
    "The City & the City — China Miéville",
    "Parable of the Sower — Octavia E. Butler",
    "The Fifth Head of Cerberus — Gene Wolfe",
    "Riddley Walker — Russell Hoban",
    "His Master's Voice — Stanisław Lem",
    "The Left Hand of Darkness — Ursula K. Le Guin",
    "The Three Stigmata of Palmer Eldritch — Philip K. Dick",
    "Stars in My Pocket Like Grains of Sand — Samuel R. Delany",
  ];

  return (
    <div
      style={{
        backgroundColor: "#121211",
        color: "#f9f9f7",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: '"Lucida Console", "Monaco", monospace',
      }}
    >
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          ASCII Glitch Ripple Text Animation
        </h1>
        <small style={{ color: "#bdbdbd", fontSize: "0.9rem" }}>
          Hover over the text below to see the animation effect
        </small>
      </header>

      <main
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "1rem 2rem",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 2rem 0",
          }}
        >
          {demoTexts.map((text, index) => (
            <li
              key={index}
              style={{
                margin: "0.6rem 0",
                position: "relative",
                paddingLeft: "1.2rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "68%",
                  width: "0.6rem",
                  height: "1px",
                  backgroundColor: "#f9f9f7",
                  transform: "scaleX(1)",
                  transformOrigin: "right",
                  transition: "transform 1s ease",
                }}
              ></div>

              <ASCIIGlitchText
                text={text}
                tag="a"
                href="#"
                ariaLabel={text}
                duration={1000}
                spread={1}
                className="demo-link"
              />
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            Usage Examples:
          </h2>

          <div style={{ marginBottom: "1rem" }}>
            <ASCIIGlitchText
              text="Custom Heading"
              tag="h3"
              duration={800}
              className="custom-heading"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <ASCIIGlitchText
              text="Fast Animation"
              duration={400}
              spread={0.5}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <ASCIIGlitchText
              text="Custom Characters ████▓▓░░"
              chars="█▓▒░▄▀▌▐■!?&#$@0123456789*"
              duration={600}
            />
          </div>
        </div>

        <footer
          style={{
            textAlign: "center",
            marginTop: "3rem",
            padding: "1rem 0",
            borderTop: "1px solid #333",
          }}
        >
          <small style={{ color: "#bdbdbd" }}>✺</small>
        </footer>
      </main>
    </div>
  );
};

export default ASCIIGlitchDemo;
