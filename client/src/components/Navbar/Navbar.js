import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login'
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import animeList from '../../data/animeList'; // adjust path if needed
import { FaMicrophone } from 'react-icons/fa';



export default function Navbar() {
    const [username, setUsername] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [message, setMessage] = useState('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const navigate = useNavigate();


    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUsername(parsedUser.username); // adjust field name if needed
        }
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filtered = animeList.filter(anime =>
            anime.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filtered);
    }, [searchTerm]);

    const handleVoiceSearch = () => {
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const voiceInput = event.results[0][0].transcript;
            setSearchTerm(voiceInput);

            const found = animeList.find(anime =>
                anime.title.toLowerCase().includes(voiceInput.toLowerCase())
            );

            if (found) {
                navigate(`/anime/${found.id}`);
            } else {
                setMessage(`Anime "${voiceInput}" not found.`);
                setTimeout(() => setMessage(''), 3000); // Clear after 3 sec
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    };



    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUsername('');
        navigate('/');
        window.location.reload();
    };

    const handleLoginSuccess = (user) => {
        setUsername(user.username);
        window.location.reload(); // Refresh the whole page to reflect changes in Home.js
    };


    const buttonStyle = {
        padding: isMobile ? '6px 12px' : '8px 16px',
        margin: isMobile ? '10px 0px' : '0px 0px',
        backgroundColor: '#ffdd95',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: isMobile ? '14px' : '16px',
        marginTop: isMobile ? '0px 0px' : '10px 10px'
    };


    const arrowStyle = {
        display: 'inline-block',
        marginLeft: '5px',
        transition: 'transform 0.3s ease',
        transform: dropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)',
        cursor: 'pointer',
    };

    const dropdownStyle = {
        position: 'absolute',
        top: '100%',
        right: '0',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '5px',
        minWidth: '100px',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
        zIndex: 10,
    };

    const dropdownItemStyle = {
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: 'white',
        borderBottom: '1px solid #eee',
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary-update">
                <div className="container-fluid">
                    <a className="navbar-brand-update" href="#"><img src={logo} className='logoImg' /><span className='navbar-brand-update-A'>A</span>NIME</a>
                    <button className="navbar-toggler-update" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link-update active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link-update" href="/about">About</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link-update dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Blog</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>

                        <form className="d-flex position-relative" role="search" autoComplete="off" style={{ width: '300px' }}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search anime..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            />

                            {/* Microphone Icon */}
                            <FaMicrophone
                                onClick={handleVoiceSearch}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: '#888'
                                }}
                            />

                            {showDropdown && searchResults.length > 0 && (
                                <ul className="search-dropdown">
                                    {searchResults.map((anime) => (
                                        <li key={anime.id} className="search-result-item">
                                            <Link to={`/anime/${anime.id}`} className="search-link">
                                                <img src={anime.image} alt={anime.title} className="search-thumb" />
                                                <div>
                                                    <div className="search-title">{anime.title}</div>
                                                    <div className="search-subtext">
                                                        {anime.releaseDate} • {anime.type} • {anime.duration}
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {message && (
                                <div style={{ position: 'absolute', top: '105%', left: 0, background: '#ffcaca', padding: '8px', color: '#700', fontSize: '13px', borderRadius: '4px', zIndex: 1000 }}>
                                    {message}
                                </div>
                            )}
                        </form>



                        <div className="d-flex align-items-center ms-3">
                            {username ? (
                                <>
                                    <div
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'white' }}
                                    >
                                        <span style={{ marginRight: '5px' }}>Hi, {username}</span>
                                        <span style={arrowStyle}>▶</span>
                                    </div>
                                    {dropdownOpen && (
                                        <div style={dropdownStyle}>
                                            <div
                                                onClick={handleLogout}
                                                style={dropdownItemStyle}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                                            >
                                                Logout
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button style={buttonStyle} onClick={() => setShowLogin(true)}>Login</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {showLogin && (
                <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    )
}



