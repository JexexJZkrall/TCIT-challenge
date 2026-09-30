import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from './components/PostForm';
import PostFilter from './components/postFilter';
import PostList from './components/PostList';
import { fetchPosts } from './store/postsSlice';

import './App.css'

function App() {
    const dispatch = useDispatch();
    const {items: posts, status, error} = useSelector(
        (state) => state.posts
    );
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const filteredPosts = posts.filter((post) => 
        post.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main>
            <h1>Gestor de Posts</h1>
            <PostForm />
            <PostFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {status === 'loading' && <p>Cargando...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeded' && <PostList posts={filteredPosts}/>}
        </main>
    )
}

export default App
