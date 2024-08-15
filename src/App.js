import { useState, createContext, useContext } from 'react';
import './App.css';
import { faker } from '@faker-js/faker';

const PostContext = createContext();

function createRandomPosts() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPosts())
  );

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function clearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        searchedPosts,
        searchQuery,
        setSearchQuery,
        handleAddPost,
        clearPosts,
      }}
    >
      <section>
        <Header />
        <main>
          <Form />
          <List />
          <Archive />
        </main>
        <Footer />
      </section>
    </PostContext.Provider>
  );
}

function Header() {
  const { posts, searchQuery, setSearchQuery, clearPosts } = useContext(PostContext);

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <p>🚀 {posts.length} atomic posts found</p>
      <input
        placeholder="Search posts here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={clearPosts}>Clear posts</button>
    </header>
  );
}

function Form() {
  const { handleAddPost } = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!body || !title) return;
    handleAddPost({ title, body });
    setTitle('');
    setBody('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  const { searchedPosts } = useContext(PostContext);

  return (
    <section>
      <ul>
        {searchedPosts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Archive() {
  const { handleAddPost } = useContext(PostContext);
  const [showArchive, setShowArchive] = useState(false);
  const [posts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPosts())
  );

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? 'Hide archive posts' : 'Show archive posts'}
      </button>
      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => handleAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
