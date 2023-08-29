import React from 'react';
import './Search.css';

type Props = {
  searchHandler: (event: React.SyntheticEvent) => void;
  showModal: boolean;
};

const Search: React.FC<Props> = (props) => {
  return (
    <div className="search-wrapper">
      {props.showModal && <div className="search-message">Enter more than 3 symbols</div>}
      <input
        className="search"
        placeholder="Search"
        type="search"
        onChange={props.searchHandler}
      ></input>
    </div>
  );
};

export default Search;
