import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomElasticSearchStyles.css"; // Ensure this file is imported

const ResultDetail = () => {
  const { state } = useLocation();
  const { result } = state;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page in the history stack
  };

  return (
    <div className="result-box">
      <button onClick={handleBackClick} className="back-button">Back</button>
      <h1 style={{ color: '#8c1515' }}>
        {result.title.raw}
      </h1>
      <h2>Authors: {result.authors.raw.join(', ')}</h2>
      <h2>Category: {result.publicationcategory.raw}</h2>
      {result.publicationyear.raw != null ? (
        <h2>Year: {result.publicationyear.raw}</h2>
      ) : (<div></div>)}
      <h2>Keywords: {Array.isArray(result.keywords.raw) ? result.keywords.raw.join(', ') : result.keywords.raw}</h2>
      {result.doi && result.doi.raw && result.doi.raw.trim() !== '' && (
        <h2>DOI: <a href={`https://doi.org/${result.doi.raw}`}>{result.doi.raw}</a></h2>
      )}
      {result.booktitle && <h2>Book Title: {result.booktitle.raw}</h2>}
      {result.conferencename && <h2>Conference Name: {result.conferencename.raw}</h2>}
      {result.conferencedate && <h2>Conference Date: {result.conferencedate.raw}</h2>}
      {result.url != null ? (result.url.raw != null ? (
        <div className="view-ecopy-button">
          <a href={result.url.raw}>
            <button>
              View e-copy
            </button>
          </a>
        </div>
      ) : (<div></div>)) : (<div></div>)}
    </div>
  );
};

export default ResultDetail;
