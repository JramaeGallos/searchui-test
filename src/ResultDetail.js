import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import "./CustomElasticSearchStyles.css"; // Ensure this file is imported

const ResultDetail = () => {
  const { state } = useLocation();
  const { result } = state;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page in the history stack
  };

  return (
    <div>
      <button  onClick={handleBackClick} className="back-button"> <FaArrowLeft className="back-icon" /> Return to search page</button>
      <div className="result-box">
     <h2 style={{ color: '#8c1515' }}>
        {result.title.raw}
        
      </h2>
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
      {result.journalname && <p><strong>Journal Name:</strong> {result.journalname.raw}</p>}
      {result.volume && <p><strong>Volume:</strong> {result.volume.raw}</p>}
      {result.issue && <p><strong>Issue:</strong> {result.issue.raw}</p>}
      {result.pages && <p><strong>Pages:</strong> {result.pages.raw}</p>}


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
    </div>
    
  );
};

export default ResultDetail;
