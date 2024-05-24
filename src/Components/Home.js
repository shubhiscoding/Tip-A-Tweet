import "../Styles/Home.css";
import way from "../Assets/way.jpg";
const Home = () => {
    const claimtip = () => {
    document
        .getElementById("claim-tips")
        .scrollIntoView({ behavior: "smooth" });
    };
    const tipatweet = () => {
    document
        .getElementById("Tip-A-Tweet")
        .scrollIntoView({ behavior: "smooth" });
    };
    
    return (
        <div className="home">
            <div className="texts">
                <h1 className="tittle">Tip-A-Tweet</h1>
                <div className="home-content">
                    <h1>Empower Creators!</h1>{" "}
                    {/* Clear and concise introduction */}
                    <p>
                        Welcome to the platform that revolutionizes tipping for the digital
                        age. Here, you can seamlessly reward creators you admire on Twitter
                        with cryptocurrency.
                    </p>
                    <div className="buttons">
                        <button onClick={claimtip}>Claim-Tips</button>
                        <button onClick={tipatweet}>Tip-A-Tweet</button>
                    </div>
                </div>
            </div>
            <div className="home-image">
                <img src={way} alt="placeholder" />
            </div>
        </div>
    );
}

export default Home;