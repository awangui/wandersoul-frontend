import './Home.css';
function Hero(){
    return (
        <div className="hero">
            <h1>WanderWith</h1>
            <h2>The ultimate solo travel guide</h2>
            <div className="search">
                <input type="text" placeholder="Search for destinations" className='search-box'></input>
                <button className='search-btn'>Search</button>
            </div>
        </div>
    )
}
export default Hero;