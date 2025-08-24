import React, { useEffect, useState, useRef } from "react";
import "../css/Hero.css";
import { fetchEducations } from "../api/api";
import type { Education } from "../models/Education";
import { useNavigate } from "react-router";

interface EducationApiItem {
  education: {
    identifier: string;
    title?: { lang: string; content: string }[];
  };
}

const Hero: React.FC = () => {
  const title = "Din framtid börjar här";
  const [animateText, setAnimateText] = useState(false);
  const [animateSearch, setAnimateSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Education[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMouseDown = useRef(false);
  const navigate = useNavigate();

  // Start-animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateText(true);
      setAnimateSearch(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Mouse drag-rotation
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const handleMouseDown = () => (isMouseDown.current = true);
    const handleMouseUp = () => {
      isMouseDown.current = false;
      titleEl.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      const rect = titleEl.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const rotateX = (-y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;
      titleEl.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    titleEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      titleEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Debounced live search
  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await fetchEducations(query);
        const mapped: Education[] = (data as EducationApiItem[]).slice(0, 5).map(item => ({
          id: item.education.identifier,
          title: item.education.title?.[0]?.content ?? "Ingen titel",
        }));
        setResults(mapped);
        setShowDropdown(mapped.length > 0);
      } catch (err) {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (edu: Education) => {
    setShowDropdown(false);
    navigate(`/educations?selected=${edu.id}`);
  };

  const handleSearchSubmit = () => {
    if (!query) return;
    navigate(`/educations?query=${encodeURIComponent(query)}`);
  };

  return (
    <section className="hero">
      <div className="blob blob-top-left"></div>
      <div className="blob blob-top-right"></div>
      <div className="blob blob-bottom-left"></div>
      <div className="blob blob-bottom-right"></div>

      <h1 className="hero-title" ref={titleRef}>
        {title.split("").map((char, i) =>
          char === " " ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <span
              key={i}
              className={`hero-char ${animateText ? "animate-char" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {char}
            </span>
          )
        )}
      </h1>

      <div className={`search-container ${animateSearch ? "animate-search" : ""}`}>
        <input
          type="text"
          placeholder="Sök utbildning..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
        />
        <button
          type="button"
          className="search-button"
          onClick={handleSearchSubmit}
        >
          🔍
        </button>

        {showDropdown && results.length > 0 && (
          <ul className="dropdown">
            {results.map((edu) => (
              <li key={edu.id} onMouseDown={() => handleSelect(edu)}>
                <strong>{edu.title}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Hero;
