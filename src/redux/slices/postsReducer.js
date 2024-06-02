import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`)
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }

}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Получение статей
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.posts.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.status = 'loaded'
            state.posts.items = action.payload
        })
        .addCase(fetchPosts.rejected, (state) => {
            state.posts.status = 'error'
            state.posts.items = []
        })
        //Получение тегов
        .addCase(fetchTags.pending, (state) => {
            state.tags.status = 'loading'
        })
        .addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.status = 'loaded'
            state.tags.items = action.payload
        })
        .addCase(fetchTags.rejected, (state) => {
            state.tags.status = 'error'
            state.tags.items = []
        })
        //Удаление статьи
        .addCase(fetchRemovePost.pending, (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id  !== action.payload)
        })
    }
})

export const postsReducer = postsSlice.reducer