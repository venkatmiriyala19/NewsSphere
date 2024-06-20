import React from "react";

const SectionsComponent = ({ onSectionClick }) => {
  const sections = [
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
  ]; // Example sections

  return (
    <div className="sections">
      {sections.map((section) => (
        <button key={section} onClick={() => onSectionClick(section)}>
          {section}
        </button>
      ))}
    </div>
  );
};

export default SectionsComponent;
