import React from 'react';

//css
import './SearchBar.scss';

// react icons
import { BsSearch } from 'react-icons/bs';

function SearchBar({ hide }) {
  return (
    <form className={`SearchBar__form ${hide ? 'Hide' : ''}`} action='/search'>
      <input className={`SearchBar__input `} placeholder='Search project' />
      <button type='submit' className='SearchBar__button'>
        <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;
