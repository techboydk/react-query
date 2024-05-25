# react-query
# React + Vite

# My Posts Application

This is a simple React application that demonstrates how to use the `@tanstack/react-query` library to manage server state in a React application. The application allows users to view posts and tags, and add new posts with associated tags.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Components](#components)
- [API](#api)
- [Styling](#styling)
- [Devtools](#devtools)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

The application has two main functionalities:
1. **Viewing Posts**: The main page displays a list of posts.
2. **Adding Posts**: Users can add new posts by filling out a form with a title and selecting tags.

## Folder Structure

```
├── public
│   └── index.html
├── src
│   ├── api
│   │   └── api.js
│   ├── components
│   │   └── PostLists.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
└── package.json
```

## Components

### App.jsx

This is the main component of the application. It renders the header and the `PostLists` component.

```jsx
import React from "react";
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
```

### PostLists.jsx

This component handles fetching and displaying posts and tags, as well as adding new posts.

```jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";

const PostLists = () => {
  // Fetch all posts
  const { data: postData, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Fetch all tags
  const { data: tagData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const queryClient = useQueryClient();

  // Mutation to add a new post
  const { mutate, isError: isPostError, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
  });

  const handlePost = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
    console.log(tags, postData.length);
    if (!title || tags.length === 0) return;

    mutate({ id: postData.length + 1, title, tags });

    e.target.reset();
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handlePost}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter your post..."
          />
          <div className="tags">
            {tagData?.map((tag) => {
              return (
                <div className="tag" key={tag}>
                  <input type="checkbox" name={tag} id={tag} />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              );
            })}
          </div>
          <button>Post</button>
        </form>
      </div>
      {isLoading && isPending && <div>Loading...</div>}
      {isError && <div>{error?.message}</div>}
      {postData?.map((post, index) => {
        return (
          <div key={post.id} className="post">
            <div>{post.title}</div>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PostLists;
```

## API

The API functions are located in `src/api/api.js`. These functions handle the fetching and posting of data.

```js
export const fetchPosts = async () => {
  const response = await fetch('/api/posts');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const fetchTags = async () => {
  const response = await fetch('/api/tags');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const addPost = async (newPost) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
```

## Styling

The styling for the application is located in `src/index.css` and `src/App.css`.

```css
/* src/index.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

h1 {
  text-align: center;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.form {
  margin-bottom: 20px;
}

.post {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
```

## Devtools

The application includes `ReactQueryDevtools` for debugging React Query. The devtools can be toggled open using the `<ReactQueryDevtools initialIsOpen={false} />` component.

```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Inside the QueryClientProvider
<ReactQueryDevtools initialIsOpen={false} />
```

To use the devtools, ensure that your development environment is set up to support them. The devtools provide insight into the queries and mutations, helping you debug and optimize your data fetching and caching.