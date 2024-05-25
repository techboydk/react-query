# My Posts Application (react query)

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

## Devtools

The application includes `ReactQueryDevtools` for debugging React Query. The devtools can be toggled open using the `<ReactQueryDevtools initialIsOpen={false} />` component.

```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Inside the QueryClientProvider
<ReactQueryDevtools initialIsOpen={false} />
```

To use the devtools, ensure that your development environment is set up to support them. The devtools provide insight into the queries and mutations, helping you debug and optimize your data fetching and caching.