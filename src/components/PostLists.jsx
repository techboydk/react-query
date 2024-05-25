import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";

const PostLists = () => {
  //get all posts
  const {
    data: postData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  //get all tags
  const { data: tagData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const queryClient = useQueryClient();

  //post a new Post
  const { mutate, isError: isPostError, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      })
    }
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


    mutate({id:postData.length + 1, title, tags});

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
            placeholder="Enter the yout post..."
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
