import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/postsSlice';

function PostForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name.trim() || !description.trim()) {
            return;
        }
        await dispatch(
            addPost({
                name,
                description,
            })
        );
        setName('');
        setDescription('');
    };

    return (
        <>
            <h2>Agregar Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input id='name' value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor='description'>Descripción</label>
                    <textarea id='description' value={description} onChange={(event) => setDescription(event.target.value)}/>
                </div>
                <button type='submit'>
                    Crear post
                </button>
            </form>
        </>
    );
}

export default PostForm;
