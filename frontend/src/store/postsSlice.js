import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, deletePost } from "../services/postsApi";
import { act } from "react";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        return await getPosts();
    }
);

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (post) => {
        return await createPost(post);
    }
);

export const removePost = createAsyncThunk(
    'posts/removePost',
    async (id) => {
        return await deletePost(id);
    }
);

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeded';
            state.items = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.items.unshift(action.payload);
        })
        .addCase(removePost.fulfilled, (state, action) => {
            state.items = state.items.filter(
                (post) => post.id !== action.payload.id
            );
        });
    },
});

export default postsSlice.reducer;
