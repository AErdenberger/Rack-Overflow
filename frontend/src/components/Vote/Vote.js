import './Vote.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Vote = ({ fetchVotes, createVote, fetchVote, postId, currentUser }) => {
    const voteTotal = useSelector(state => state.votes.voteTotal || 0);
    console.log(voteTotal, "voteTotal");
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchVotes(postId));
    }, [dispatch, fetchVotes, postId]);

    useEffect(() => {
        const fetch = dispatch(fetchVote(postId, currentUser._id));
        console.log(fetch, "fHHHHHHHHHHHHHHHHHHHHHHHHH");
    }, [dispatch, fetchVote, postId, currentUser._id])
    console.log(currentUser._id, "current user id")
    
    const handleClick = (num) => {
        dispatch(createVote(num, postId));
    }

    return(
        <>
            <div className='vote-container'>
                <div onClick={() => handleClick(1)} ><i className="fa-solid fa-caret-up" id='vote-arrow'></i></div>
                <div id='vote-count'>{voteTotal}</div>
                <div onClick={() => handleClick(-1)}><i className="fa-solid fa-caret-down" id='vote-arrow'></i></div>
            </div>
        </>
    )
}

export default Vote;