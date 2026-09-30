function PostFilter({searchTerm, onSearchChange}) {
    return (
        <div className='filter'>
            <label htmlFor='search'>
                Filtrar por nombre
            </label>
            <input 
                id='search' 
                type='text' 
                value={searchTerm} 
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder='Buscar...'
            />
        </div>
    );
}

export default PostFilter;
