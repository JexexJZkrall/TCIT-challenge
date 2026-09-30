import PostItem from "./PostItem";

function PostList({posts}) {
    if(posts.length === 0) {
        return <p className='empty-message'>No hay posts.</p>;
    }
    return (
        <section className='posts'>
            {posts.map((post) => (
                <PostItem key={post.id} post={post}/>
            ))}
        </section>
    );
}

export default PostList;
