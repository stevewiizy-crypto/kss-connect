import React from "react";

export default function App() {
  return (
    <main className="app">
      <section className="welcome-card">

        <div className="logo">
          <span>K</span>
        </div>

        <p className="eyebrow">
          KINGSTON SENIOR SECONDARY SCHOOL
        </p>

        <h1>
          KSS <span>Connect</span>
        </h1>

        <p className="subtitle">
          One school. One community. One connection.
        </p>

        <div className="mode-card">
          <div className="status-dot"></div>

          <div>
            <strong>Connection Ready</strong>
            <p>
              Preparing your school communication hub
            </p>
          </div>
        </div>

        <div className="actions">
          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            About KSS Connect
          </button>
        </div>

        <p className="footer-text">
          Kingston Senior Secondary School · Buikwe District
        </p>

      </section>
    </main>
  );
          }
