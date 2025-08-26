import React, { useEffect, useState, useRef, useCallback } from "react";
import "../css/Hero.css";
import { fetchEducations } from "../api/api";
import type { Education } from "../models/Education";
import { useNavigate } from "react-router";
import { DigiFormInputSearch } from "@digi/arbetsformedlingen-react";

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMouseDown = useRef(false);
  const navigate = useNavigate();

  const showDropdown = results.length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateText(true);
      setAnimateSearch(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Mouse drag 3D effect
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const handleMouseDown = () => (isMouseDown.current = true);
    const handleMouseUp = () => {
      isMouseDown.current = false;
<<<<<<< HEAD
      titleEl.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
      titleEl.style.textShadow = "";
=======
      titleEl.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg)";
>>>>>>> origin/develop
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      const rect = titleEl.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const rotateX = (-y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;

      titleEl.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const shadowX = rotateY * 2;
      const shadowY = rotateX * 2;
      titleEl.style.textShadow = `${shadowX}px ${shadowY}px 10px rgba(0,0,0,0.25)`;
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
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
<<<<<<< HEAD
    try {
      const data = await fetchEducations(searchQuery);
      const mapped: Education[] = (data as EducationApiItem[])
        .slice(0, 5)
        .map(item => ({
          id: item.education.identifier,
          title: item.education.title?.[0]?.content ?? "Ingen titel",
        }));
      setResults(mapped);
    } catch {
      setResults([]);
    }
  }, []);
=======

    const timer = setTimeout(async () => {
      try {
        const data = await fetchEducations(query); // data: Education[]
        const mapped = data.slice(0, 5); // Visa bara de första 5
        setResults(mapped);
        setShowDropdown(mapped.length > 0);
      } catch (err) {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
>>>>>>> origin/develop

  useEffect(() => {
    const handler = setTimeout(() => performSearch(query), 300);
    return () => clearTimeout(handler);
  }, [query, performSearch]);

  const handleSelect = (edu: Education) => {
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

<<<<<<< HEAD
      <div className={`search-container ${animateSearch ? "animate-search" : ""}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit();
          }}
=======
      <div
        className={`search-container ${animateSearch ? "animate-search" : ""}`}
      >
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
>>>>>>> origin/develop
        >
          <DigiFormInputSearch
            value={query}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Sök utbildning eller jobb..."
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <button type="submit" style={{ display: "none" }} />
        </form>

        {showDropdown && (
          <ul className="dropdown">
<<<<<<< HEAD
            {results.map((edu, index) => (
              <li
                key={edu.id}
                onMouseDown={() => handleSelect(edu)}
                style={{ animationDelay: `${0.05 + index * 0.05}s` }}
              >
                <strong>{edu.title}</strong>
=======
            {results.map((edu) => (
              <li key={edu.id} onMouseDown={() => handleSelect(edu)}>
                <strong>{edu.education?.title?.[0]?.content}</strong>
>>>>>>> origin/develop
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Hero;