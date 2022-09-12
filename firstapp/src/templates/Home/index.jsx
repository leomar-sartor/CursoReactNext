import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.lengt;

  const filteresPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsperPage) => {

    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() =>{
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);


  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  }

  return (
    <section className='container'>

      <div className="search-container">
        {!!searchValue && (
          <h1> Search value: {searchValue} </h1> 
          )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteresPosts.length > 0 && (
        <Posts posts={filteresPosts} />
      )}

      {filteresPosts.length === 0 && (
        <p>No exist POST =(</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button 
            text="Load more Posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}