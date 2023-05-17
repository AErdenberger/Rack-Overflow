import './Vote.css';

const Vote = () => {
    return(
        <>
        <div className='vote-container'>
            <div><i className="fa-solid fa-caret-up" id='vote-arrow'></i></div>
            <div id='vote-count'>10</div>
            <div><i className="fa-solid fa-caret-down" id='vote-arrow'></i></div>
        </div>
        </>
    )
}

export default Vote;