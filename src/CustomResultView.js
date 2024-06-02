import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "./CustomResultView.css";

const CustomResultView = ({ result }) => {
  const navigate = useNavigate();

  const handleResultClick = () => {
    navigate(`/detail/${result.id.raw}`, { state: { result } });
  };
  const handleTitleHover = (event) => {
    event.currentTarget.style.cursor = "pointer";
  };
  return (
    <div className="result-box" onClick={handleResultClick}>
      <h3 style={{ color: '#8c1515' }} onMouseEnter={handleTitleHover}>
        {result.title.raw}
        
      </h3>
      <p><strong>Authors:</strong> {result.authors.raw.join(', ')}</p>
      <p><strong>Category:</strong> {result.publicationcategory.raw}</p>
      {result.publicationyear.raw != null ? (
        <p><strong>Year:</strong> {result.publicationyear.raw}</p>
      ) : (<div></div>)}
      <p><strong>Keywords:</strong> {Array.isArray(result.keywords.raw) ? result.keywords.raw.join(', ') : result.keywords.raw}</p>
      {result.doi && result.doi.raw && result.doi.raw.trim() !== '' && (
        <p><strong>DOI:</strong> <a href={`https://doi.org/${result.doi.raw}`}>{result.doi.raw}</a></p>
      )}
      {result.booktitle && <p><strong>Book Title:</strong> {result.booktitle.raw}</p>}
      {result.conferencename && <p><strong>Conference Name:</strong> {result.conferencename.raw}</p>}
      {result.conferencedate && <p><strong>Conference Date:</strong> {result.conferencedate.raw}</p>}
      {result.url != null ? (result.url.raw != null ? (
        <div className="view-ecopy-button">
          <a href={result.url.raw} onClick={(e) => e.stopPropagation()}>
            <button>
              <FaEye className="eye-icon" />
              View e-copy
            </button>
          </a>
        </div>
      ) : (<div></div>)) : (<div></div>)}
      <div className="clear"></div>
    </div>
  );
};

export default CustomResultView;
