import "./Footer.css"

function FooterBar() {

    return (
        <div className="BottomBar">
        <div>
            <p>This site was created by for educational purposes only.</p>
            <p>Please do not put any sensitive information.</p>
        </div>
        <h1 className="MeetHeader">Meet The Devs</h1>
        <div className="MeetTheDevs">
            <div id="DevBox">
                <h2>Alex Erdenberger</h2>
                <h3>Team Lead</h3>
                <a href="https://www.linkedin.com/in/alex-erdenberger-36274b88/" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/LinkedIn_logo_initials.png" id="linkedin" />
                </a>
                <a href="https://github.com/AErdenberger" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/GitHub-Mark.png" id="github" />
                </a>
            </div>
            <div id="DevBox">
                <h2>David Gudeman</h2>
                <h3>Backend Developer</h3>
                <a href="https://www.linkedin.com/in/davidmgudeman/" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/LinkedIn_logo_initials.png" id="linkedin" />
                </a>
                <a href="https://github.com/dmgudeman" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/GitHub-Mark.png" id="github" />
                </a>
            </div>
            <div id="DevBox">
                <h2>David Lai</h2>
                <h3>Backend Developer</h3>
                <a href="https://www.linkedin.com/in/david-lai-506779206/" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/LinkedIn_logo_initials.png" id="linkedin" />
                </a>
                <a href="https://github.com/Dali-ilaD" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/GitHub-Mark.png" id="github" />
                </a>
            </div>
            <div id="DevBox">
                <h2>Josh van Eyken</h2>
                <h3>Frontend Developer</h3>
                <a href="https://www.linkedin.com/in/josh-van-eyken-0a427888/" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/LinkedIn_logo_initials.png" id="linkedin" />
                </a>
                <a href="https://github.com/jvaneyken" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/GitHub-Mark.png" id="github" />
                </a>
            </div>
            <div id="DevBox">
                <h2>Steven Zabala</h2>
                <h3>Frontend Developer</h3>
                <a href="https://www.linkedin.com/in/steven-zabala-4b149b267/" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/LinkedIn_logo_initials.png" id="linkedin" />
                </a>
                <a href="https://github.com/Zabala9" target="blank">
                    <img src="https://rack-overflow.s3.us-west-1.amazonaws.com/GitHub-Mark.png" id="github" />
                </a>
            </div>
        </div>
        <div className="ImageCredits">
            <p>Images provided by Vecteezy</p>
            <a href="https://www.vecteezy.com/free-vector/exercise">Exercise Vectors by Vecteezy</a>
        </div>
    </div>
    )
}

export default FooterBar