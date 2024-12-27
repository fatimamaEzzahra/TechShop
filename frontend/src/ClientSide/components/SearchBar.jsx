import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './SearchBar.css';
import { axiosClient } from '../../../axios';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [visibilityClass, setVisibilityclass] = useState('unactive-search');
  const [borderClass, setBorderclass] = useState('unactive-border');
  const [resultVisibility, setResultVisibility] = useState('unactive-results');
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  const [focusInput, setFocusInput] = useState(false);

  const handleSearchShow = () => {
    visibilityClass === 'unactive-search' ? setVisibilityclass('active-search') : setVisibilityclass('unactive-search');
    borderClass === 'unactive-border' ? setBorderclass('active-border') : setBorderclass('unactive-border');
    resultVisibility === 'unactive-results' ? setResultVisibility('active-results') : setResultVisibility('unactive-results');
    
    setFocusInput(true);
  };

  const handleSearchHide = () => {
    setVisibilityclass('unactive-search');
    setBorderclass('unactive-border');
    setResultVisibility('unactive-results');
    setFocusInput(false);
  };
  const FilterSearch = (value) => {
    if (value !== '') {
      setResult(
        data.filter(
          (p) =>
            value &&
            p &&
            (p.nom_pr.toLowerCase().includes(value.toLowerCase()) ||
              p.marque_pr.toLowerCase().includes(value.toLowerCase()) ||
              p.category_pr.toLowerCase().includes(value.toLowerCase()))
        )
      );
    }
    else {
      setResult([])
    }
  }
  const fetchData = async (value) => {
    const response = await axiosClient.get('/api/produits');
    setData(response.data)
  };

  const handleChange = (value) => {
    setInput(value);
    FilterSearch(value);
  };

  useEffect(() => {
    fetchData();
    if (focusInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusInput]);

  return (
    <div >
      <div className={`caretForm ${borderClass}`}>
        <BsSearch id="searchIcon" onClick={handleSearchShow}  className='pointer'/>
        <form className={` ${visibilityClass}`}>
          <input
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => handleChange(e.target.value)}
            pattern=".*\S.*"
            required
            ref={inputRef}
            className={`search-bar-input`}
          />
          <span className="reset-icon"></span>
        </form>
      </div>
      {result.length ? (
        <div className={`results ${resultVisibility}`} onBlur={handleSearchHide}>
          {result.map((p) => (
            <Link to={`/displayproduct/${p.id}`} key={p.id} className="product-search">
              <img src={`http://127.0.0.1:8000/storage/product/image/${p.image_pr}`} className="product-image-search" alt="" />
              <p>{p.nom_pr}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchBar;
