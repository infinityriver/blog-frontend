import React from "react";
import Post from "../Post/Post";
import Tags from '../Tags/Tags/'
import Comments from '../Comments/Comments'

import styles from './Home.module.css'

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsReducer";


const Home = () => {
    const dispatch = useDispatch()
    const {posts, tags} = useSelector(state => state.posts)

    const isPostLoading = posts.status === 'loading'

    React.useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    console.log(posts.items)


    return (
        <div className={styles.Block}>
        {isPostLoading ? (
            <div>Loading...</div>
        ) : (
            <div className={styles.BlockDiv}>
                {posts.items.map((obj, index) => (
                    <div key={index} className={styles.block}>
                        <Post 
                        id = {obj._id}
                        title = {obj.title}
                        viewsCount = {obj.viewsCount}
                        user = {{...obj.user}}
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
    )
}
export default Home