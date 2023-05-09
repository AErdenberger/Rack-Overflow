import "./PostBox.css"

function PostBox ({ post: { text, author }}) {
  const { username } = author;
  return (
    <div className="post">
      <div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
      </div>
      <div>
        <p className="post-box-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </div>
      <div>
        <div className="post-box-tags-div">
          <span>tag 1</span><span>tag 2</span><span>tag 3</span><span>tag 4</span><span>tag 5</span><span>tag 6</span>
        </div>
        <div className="post-box-ratings-comments-username">
          <div className="post-box-ratings-comments">
            <button>
              Comments
            </button>
            <button>
              Ratings
            </button>
          </div>
          <div className="post-box-username">
            <div><span>{String.fromCodePoint(0x2B24)}</span> {username}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostBox;