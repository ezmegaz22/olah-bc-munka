// pages/index.js
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Example of a simple Home component that fetches data and displays links to posts
export default function Home() {
  const [posts, setPosts] = useState([]);

  // Simulate fetching posts data
  useEffect(() => {
    // This is where you would fetch your posts data from an API
    // For demonstration, we're using static data
    setPosts([
      { id: 1, title: 'First Post', date: '2024-04-14' },
      { id: 2, title: 'Second Post', date: '2024-04-15' }
    ]);
  }, []);

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <ul>
        {posts.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}