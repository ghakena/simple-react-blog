const Nav = ({ search, setSearch }) => {
    return (
      <nav className="Nav">
          <form className="searchForm" onSubmit={(e) => {e.preventDefault()}}>
            <label htmlFor="search">Search Posts</label>
            <input 
              type="text" 
              id="search"
              placeholder="Search Posts"  
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
          </form>
      </nav>
    )
}
  
export default Nav;
