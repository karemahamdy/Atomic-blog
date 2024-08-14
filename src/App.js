import { useState } from 'react';
import './App.css';
import { faker } from '@faker-js/faker';
;

function createRandomPosts() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase()
  }
}

function App() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPosts())
  )

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function clearPosts() {
    setPosts([])
  }

  return (
    <section>

      <Header onclearPosts={clearPosts}/>

      <main>
        <Form onAddPost={handleAddPost} />
        <List posts={posts} />
        <Archive onAddPost={handleAddPost}  />
      </main>

      <Footer />

    </section>
  );
}

function Header({onclearPosts}) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <p>🚀 30 atomic posts found</p>
      <input placeholder="Search posts here"></input>
      <button onClick={onclearPosts}>Clear posts</button>
    </header>
  )
}

function Form({ onAddPost }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body })
    setTitle("")
    setBody("")
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
  )
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
  )
}

function Archive({onAddPost}) {
  const [showArchive , setShowArchive] = useState(false)
  const [posts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPosts())
  );
  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={()=> (setShowArchive((s) => !s))}>
      { showArchive ?  "Hide archive posts" : "Show archive posts" }
      </button>
    { showArchive && <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
}
    </aside>

  )
}
function Footer() {
  return (
    <footer>&copy; by The Atomic Blog ✌️</footer>
  )
}
export default App;
