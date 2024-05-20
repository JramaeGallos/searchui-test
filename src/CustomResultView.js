import './CustomResultView.css';
import { FaEye } from "react-icons/fa";


const CustomResultView = ({ result }) => (
  <div className="result-box">
    <h3 style={{ color: '#8c1515' }}>
      {result.title.raw}
    </h3>
    <p><strong>Authors:</strong> {result.authors.raw.join(', ')}</p>
    <p><strong>Category:</strong> {result.publicationcategory.raw}</p>
    <p><strong>Year:</strong> {result.publicationyear.raw}</p>
    <p><strong>Keywords:</strong> {Array.isArray(result.keywords.raw) ? result.keywords.raw.join(', ') : result.keywords.raw}</p>
    {/* <p><strong>E Copy Available:</strong> {result.isecopyavailable.raw ? 'Yes' : 'No'}</p> */}
    {result.doi && result.doi.raw && result.doi.raw.trim() !== '' && (
      <p><strong>DOI:</strong> <a href={`https://doi.org/${result.doi.raw}`}>{result.doi.raw}</a></p>
    )}
    {result.booktitle && <p><strong>Book Title:</strong> {result.booktitle.raw}</p>}
    {result.conferencename && <p><strong>Conference Name:</strong> {result.conferencename.raw}</p>}
    {result.conferencedate && <p><strong>Conference Date:</strong> {result.conferencedate.raw}</p>}

    {result.url && (
      <div className="view-ecopy-button">
        <a href={result.url.raw}>
          <button>
            <FaEye className="eye-icon" />
            View e-copy
          </button>
        </a>
      </div>
    )}
    <div class="clear"></div>

  </div>
);

export default CustomResultView;


