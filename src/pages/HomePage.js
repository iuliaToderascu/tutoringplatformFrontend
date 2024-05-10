import React from 'react'
import '../assets/FrontPage.css'

function HomePage() {
    return (
        <div className="front-page">
            <div className="overlay"></div> {/* Overlay for image */}
            <div className="content">
                <h1>Welcome to Mundus!</h1>
                <button>Explore</button>
            </div>
        </div>
    )
}

export default HomePage;