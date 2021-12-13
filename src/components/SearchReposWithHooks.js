import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './Results';
import '../style.css';

const SearchReposWithHooks = () => {
   const [searchInput, setSearchInput] = useState('');
   const [searchQuery, setSearchQuery] = useState('markerikson');
   const [repos, setRepos] = useState([]);

   const handleChangeSearchInput = (e) => {
     setSearchInput(e.target.value);
   }

   const handleSearchClick = () => {
     setSearchQuery(searchInput);
     setSearchInput('');
   }

   useEffect(() => {
     const fetchRepos = async () => {
       const result = await axios(`https://api.github.com/users/${searchQuery}/repos`);
       setRepos(result);
     };
     fetchRepos();
   }, [searchQuery]);

   return (
     <>
       <div className="container">
           <h2>Search for repos</h2>
           <input
               type="text"
               placeholder="search..."
               value={searchInput}
               onChange={handleChangeSearchInput}
             />
           <button
             className="search"
             onClick={handleSearchClick}
           >
             Search
           </button>
       </div>
       <Results repos={repos} />
     </>
   )
}

export default SearchReposWithHooks;
