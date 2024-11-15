import React from "react";
import "./SectionsComponent.css";

const SectionsComponent = ({ onSectionClick, currentSection }) => {
  const sections = [
    "all",
    "business",
    "sport",
    "music",
    "technology",
    "media",
    "us-news",
    "world",
    "society",
    "tv-and-radio",
    "australia-news",
    "uk-news",
    "science",
    "lifeandstyle",
    "commentisfree",
    
  ];

  return (
    <div className="sections">
      {sections.map((section) => (
        <button
          className={`btn-23 ${
            currentSection === section ||
            (currentSection === "" && section === "all")
              ? "btn-23-active"
              : ""
          }`}
          key={section}
          onClick={() => onSectionClick(section)}
        >
          <span aria-hidden="" className="marquee">
            {section}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SectionsComponent;
