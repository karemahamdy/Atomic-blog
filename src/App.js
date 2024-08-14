import { useState } from 'react';
import './App.css';
import { faker } from '@faker-js/faker';

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
    <section>
      <Header
        onclearPosts={clearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        <Form onAddPost={handleAddPost} />
        <List posts={searchedPosts} />
        <Archive onAddPost={handleAddPost} />
      </main>

      <Footer />
    </section>
  );
}

function Header({ onclearPosts, searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <p>🚀 {searchQuery ? 'Filtered' : '30'} atomic posts found</p>
      <input
        placeholder="Search posts here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={onclearPosts}>Clear posts</button>
    </header>
  );
}

function Form({ onAddPost }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
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

function List({ posts }) {
  return (
    <section>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Archive({ onAddPost }) {
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
              <button onClick={() => onAddPost(post)}>Add as new post</button>
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
