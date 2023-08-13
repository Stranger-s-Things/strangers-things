export default function SearchBar({ query, onSetQuery, posts }) {
  function handleChange(e) {
    const results = posts.filter((post) => {
      if (e.target.value === "") return posts;
      return post.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    onSetQuery({
      search: e.target.value,
      results: results,
    });
  }

  return (
    <div id="search-bar">
      <form>
        <input
          type="search"
          value={query.search}
          onChange={handleChange}
          placeholder="Search..."
        />
      </form>
    </div>
  );
}
