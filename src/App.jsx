import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./api/api";
import PostLists from "./components/PostLists";

function App() {
  return (
    <div>
      <h1>My posts</h1>
      <PostLists />
    </div>
  );
}

export default App;
