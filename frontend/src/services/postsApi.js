const API_URL = 'http://localhost:3000/api/posts';

export const getPosts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Fallo al recuperar posts');
    }
    return response.json();
};

export const createPost = async (post) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error('Fallo al crear post');
    }
    return response.json();
};

export const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Fallo al eliminar post');
    }
    return response.json();
};
