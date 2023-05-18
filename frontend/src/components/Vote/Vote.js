import './Vote.css';
import { useDispatch, useSelector } from 'react-redux';


const Vote = ({ createVote, fetchVote, postId, currentUser, vote }) => {
    const voteTotal = useSelector(state => state.votes.voteTotal || 0).voteTotal;
    const dispatch = useDispatch();
    
    const handleClick = async (num) => {
        await dispatch(createVote(num, postId));
        await dispatch(fetchVote(postId, currentUser._id))
    }

    return(
        <>
            <div className='vote-container'>
                {vote?.vote === 1 ? <div><i className="fa-solid fa-caret-up" id='upvote-arrow-clicked'></i></div> : <div onClick={() => handleClick(1)} ><i className="fa-solid fa-caret-up" id='upvote-arrow'></i></div> }
                
                <div id='vote-count'>{voteTotal}</div>
                {vote?.vote === -1 ? <div><i className="fa-solid fa-caret-down" id='downvote-arrow-clicked'></i></div> : <div onClick={() => handleClick(-1)} ><i className="fa-solid fa-caret-down" id='downvote-arrow'></i></div> }
            </div>
        </>
    )
}

export default Vote;