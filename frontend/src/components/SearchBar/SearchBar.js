import './SearchBar.css';




const SearchBar = ({handleSearchChange, handleSearchClick, searchValue}) => {


    return (
        <>
        <div>
         
        <label id='container-search'> 
        <i className="fa-solid fa-magnifying-glass" id="icon-search" ></i>
              <input 
              type='text' 
              placeholder='Search By Tag' 
              id='search-bar'
              onClick={handleSearchClick}
                onChange={handleSearchChange}
                value={searchValue}
              />
            </label>
            
    
        </div>
        
        </>
    )
}

export default SearchBar;