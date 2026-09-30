import * as postsService from '../services/postsService.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await postsService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Fallo al obtener posts',
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const {name, description} = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({
                error: 'El nombre es obligatorio',
            });
        }
        if (!description || !description.trim()) {
            return res.status(400).json({
                error: 'La descripción es obligatoria',
            });
        }
        const post = await postsService.createPost(
            name.trim(),
            description.trim()
        );
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Fallo al crear post',
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postsService.deletePost(id);
        if (!post) {
            return res.status(404).json({
                error: 'No se encontró el post',
            });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Fallo al eliminar post',
        });
    }
};
