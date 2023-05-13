import './SearchBar.css';

const SearchBar = ({handleSearchChange, handleSearchClick, searchValue}) => {





    return (
        <>
        <div>
        <label id='container-search'> <i className="fa-solid fa-magnifying-glass" id="icon-search"></i>
              <input 
              type='text' 
              placeholder='Search Rack Overflow' 
              id='search-bar'
                onChange={handleSearchChange}
                onClick={handleSearchClick}
                value={searchValue}
              />
            </label>
            
    
        </div>
        
        </>
    )
}

export default SearchBar;