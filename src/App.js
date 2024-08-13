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
  const [ posts , setPosts] =  useState(() => 
  Array.from ({length: 30} , () => createRandomPosts())
  )

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  return (
    <section>
      
      <header>
        <h1>
          <span>⚛️</span>The Atomic Blog
        </h1>
        <p>🚀 30 atomic posts found</p>
        <input placeholder="Search posts here"></input>
        <button>Clear posts</button>
      </header>

      <main>

      <Form onAddPost={handleAddPost}/>

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

        <aside>
          <h2>Post archive</h2>
          <button>
            Show archive posts
          </button>
          <ul>
            <li>
              <p>
                <strong>title:</strong> body
              </p>
              <button>Add as new post</button>
            </li>
          </ul>
        </aside>

      </main>
      
      <footer>&copy; by The Atomic Blog ✌️</footer>

    </section>
  );
}


function Form({ onAddPost }) {
const [title, setTitle] = useState("")
const [body, setBody] = useState("")

function handleSubmit (e) {
  e.preventDefault();
  if (!body || !title) return;
  onAddPost({title, body})
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
export default App;
