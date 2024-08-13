import logo from './logo.svg';
import './App.css';

function App() {
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

        <form>
          <input
            placeholder="Post title"
          />
          <textarea
            placeholder="Post body"
          />
          <button>Add post</button>
        </form>

        <section>
          <ul>
            <li>
              <h3>name</h3>
              <p>body</p>
            </li>
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

export default App;
