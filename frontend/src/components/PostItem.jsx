import { useDispatch } from "react-redux";
import { removePost } from "../store/postsSlice";

function PostItem({post}) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(removePost(post.id));
    };
    return (
        <article className='post'>
            <h3>{post.name}</h3>
            <p>{post.description}</p>
            <button className='delete-button' onClick={handleDelete}>
                Eliminar
            </button>
        </article>
    );
}

export default PostItem;
