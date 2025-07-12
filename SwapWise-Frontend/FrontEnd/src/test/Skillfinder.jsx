import React, { useState } from 'react';

// 🔹 Reusable Navbar
const Navbar = () => (
    <nav style={navStyle}>
        <h2 style={{ margin: 0 }}>🔁 SwapWise</h2>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/dashboard" style={navLink}>Dashboard</a>
            <a href="/skillfinder" style={navLink}>Skill Finder</a>
            <a href="/inbox" style={navLink}>Inbox</a>
            <a href="/profile" style={navLink}>Profile</a>
        </div>
    </nav>
);

// 🔹 Reusable Footer
const Footer = () => (
    <footer style={footerStyle}>
        <p>© 2025 SwapWise • Find & Collaborate</p>
    </footer>
);

// 🔧 8 mock users
const mockUsers = [
    {
        _id: 'user1',
        name: 'Alice',
        email: 'alice@example.com',
        avatar: 'https://i.pravatar.cc/150?img=5',
        location: 'Ahmedabad',
        skills: ['React', 'Node.js', 'MongoDB'],
    },
    {
        _id: 'user2',
        name: 'Bob',
        email: 'bob@example.com',
        avatar: 'https://i.pravatar.cc/150?img=12',
        location: 'Surat',
        skills: ['Python', 'Django', 'FastAPI'],
    },
    {
        _id: 'user3',
        name: 'Charlie',
        email: 'charlie@example.com',
        avatar: 'https://i.pravatar.cc/150?img=8',
        location: 'Rajkot',
        skills: ['Photoshop', 'Illustrator', 'React'],
    },
    {
        _id: 'user4',
        name: 'David',
        email: 'david@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        location: 'Vadodara',
        skills: ['Python', 'ML', 'Pandas'],
    },
    {
        _id: 'user5',
        name: 'Eva',
        email: 'eva@example.com',
        avatar: 'https://i.pravatar.cc/150?img=20',
        location: 'Delhi',
        skills: ['Excel', 'Data Entry', 'Typing'],
    },
    {
        _id: 'user6',
        name: 'Frank',
        email: 'frank@example.com',
        avatar: 'https://i.pravatar.cc/150?img=25',
        location: 'Bangalore',
        skills: ['Photoshop', 'Figma', 'Canva'],
    },
    {
        _id: 'user7',
        name: 'Grace',
        email: 'grace@example.com',
        avatar: 'https://i.pravatar.cc/150?img=31',
        location: 'Kolkata',
        skills: ['FastAPI', 'Flask', 'PostgreSQL'],
    },
    {
        _id: 'user8',
        name: 'Harry',
        email: 'harry@example.com',
        avatar: 'https://i.pravatar.cc/150?img=36',
        location: 'Pune',
        skills: ['React', 'Redux', 'Tailwind'],
    },
];

const SkillFinder = () => {
    const [searchSkill, setSearchSkill] = useState('');
    const [searchName, setSearchName] = useState('');
    const [requestedTo, setRequestedTo] = useState([]);

    const handleRequest = (userId) => {
        setRequestedTo([...requestedTo, userId]);
    };

    const filteredUsers = mockUsers.filter((user) => {
        const skillMatch = user.skills.some((skill) =>
            skill.toLowerCase().includes(searchSkill.toLowerCase())
        );
        const nameMatch = user.name.toLowerCase().includes(searchName.toLowerCase());
        return skillMatch && nameMatch;
    });

    return (
        <div style={{ fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* 🔍 Filters */}
            <div style={{ padding: '1.5rem 2rem', backgroundColor: '#f2f2f2' }}>
                <h3>🔎 Find Collaborators</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Search by skill (e.g. React, Python)"
                        value={searchSkill}
                        onChange={(e) => setSearchSkill(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>

            {/* 👥 Grid of Users */}
            <div style={{ padding: '2rem', flex: 1 }}>
                {filteredUsers.length === 0 ? (
                    <p>No users found with the given filters.</p>
                ) : (
                    <div style={gridStyle}>
                        {filteredUsers.map((user) => (
                            <div key={user._id} style={cardStyle}>
                                <img src={user.avatar} alt={user.name} style={avatarStyle} />
                                <h4>{user.name}</h4>
                                <p style={infoStyle}>📧 {user.email}</p>
                                <p style={infoStyle}>📍 {user.location}</p>
                                <strong>Skills:</strong>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {user.skills.map((skill, index) => (
                                        <li key={index}>• {skill}</li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleRequest(user._id)}
                                    disabled={requestedTo.includes(user._id)}
                                    style={{
                                        marginTop: '10px',
                                        padding: '6px 12px',
                                        backgroundColor: requestedTo.includes(user._id) ? '#6c757d' : '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: requestedTo.includes(user._id) ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {requestedTo.includes(user._id) ? 'Requested' : 'Request Collaboration'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

// 🧩 Styles
const navStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};


const navLink = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
};

const footerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem',
};

const inputStyle = {
    padding: '10px',
    width: '250px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
};

const cardStyle = {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
};

const avatarStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '0.5rem',
};

const infoStyle = {
    margin: '5px 0',
    fontSize: '0.9rem',
    color: '#333',
};

export default SkillFinder;
