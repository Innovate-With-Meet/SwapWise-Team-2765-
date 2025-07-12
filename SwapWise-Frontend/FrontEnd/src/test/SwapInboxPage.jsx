import React, { useState } from 'react';

// 🔹 Navbar Component
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

// 🔹 Footer Component
const Footer = () => (
    <footer style={footerStyle}>
        <p>© 2025 SwapWise • Connecting Skills Globally</p>
    </footer>
);

const SwapInboxPage = () => {
    const [incomingRequests, setIncomingRequests] = useState([
        {
            requestId: 'req1',
            fromUser: {
                name: 'Alice',
                email: 'alice@example.com',
                avatar: 'https://i.pravatar.cc/150?img=5',
            },
            skillOffered: 'React',
            skillWanted: 'Django',
            status: 'pending',
        },
        {
            requestId: 'req2',
            fromUser: {
                name: 'Charlie',
                email: 'charlie@example.com',
                avatar: 'https://i.pravatar.cc/150?img=8',
            },
            skillOffered: 'Photoshop',
            skillWanted: 'Excel',
            status: 'pending',
        },
        {
            requestId: 'req5',
            fromUser: {
                name: 'Meera',
                email: 'meera@example.com',
                avatar: 'https://i.pravatar.cc/150?img=15',
            },
            skillOffered: 'Java',
            skillWanted: 'Vue.js',
            status: 'pending',
        },
        {
            requestId: 'req6',
            fromUser: {
                name: 'Ravi',
                email: 'ravi@example.com',
                avatar: 'https://i.pravatar.cc/150?img=22',
            },
            skillOffered: 'MongoDB',
            skillWanted: 'Express.js',
            status: 'pending',
        },
        {
            requestId: 'req7',
            fromUser: {
                name: 'Sara',
                email: 'sara@example.com',
                avatar: 'https://i.pravatar.cc/150?img=12',
            },
            skillOffered: 'Figma',
            skillWanted: 'Framer',
            status: 'pending',
        },
        {
            requestId: 'req8',
            fromUser: {
                name: 'John',
                email: 'john@example.com',
                avatar: 'https://i.pravatar.cc/150?img=17',
            },
            skillOffered: 'Python',
            skillWanted: 'Flutter',
            status: 'pending',
        },
        {
            requestId: 'req9',
            fromUser: {
                name: 'Lily',
                email: 'lily@example.com',
                avatar: 'https://i.pravatar.cc/150?img=9',
            },
            skillOffered: 'SQL',
            skillWanted: 'NoSQL',
            status: 'pending',
        },
        {
            requestId: 'req10',
            fromUser: {
                name: 'Sam',
                email: 'sam@example.com',
                avatar: 'https://i.pravatar.cc/150?img=10',
            },
            skillOffered: 'JavaScript',
            skillWanted: 'Next.js',
            status: 'pending',
        },
    ]);

    const [sentRequests] = useState([
        {
            requestId: 'req3',
            toUser: {
                name: 'David',
                email: 'david@example.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
            },
            skillOffered: 'Python',
            skillWanted: 'Figma',
            status: 'accepted',
        },
        {
            requestId: 'req4',
            toUser: {
                name: 'Eva',
                email: 'eva@example.com',
                avatar: 'https://i.pravatar.cc/150?img=20',
            },
            skillOffered: 'Node.js',
            skillWanted: 'Tailwind CSS',
            status: 'pending',
        },
        {
            requestId: 'req11',
            toUser: {
                name: 'Tom',
                email: 'tom@example.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
            },
            skillOffered: 'PHP',
            skillWanted: 'Laravel',
            status: 'pending',
        },
        {
            requestId: 'req12',
            toUser: {
                name: 'Tina',
                email: 'tina@example.com',
                avatar: 'https://i.pravatar.cc/150?img=6',
            },
            skillOffered: 'Rust',
            skillWanted: 'GoLang',
            status: 'pending',
        },
        {
            requestId: 'req13',
            toUser: {
                name: 'Rahul',
                email: 'rahul@example.com',
                avatar: 'https://i.pravatar.cc/150?img=11',
            },
            skillOffered: 'HTML',
            skillWanted: 'SASS',
            status: 'accepted',
        },
        {
            requestId: 'req14',
            toUser: {
                name: 'Nina',
                email: 'nina@example.com',
                avatar: 'https://i.pravatar.cc/150?img=19',
            },
            skillOffered: 'Bootstrap',
            skillWanted: 'Chakra UI',
            status: 'pending',
        },
        {
            requestId: 'req15',
            toUser: {
                name: 'Omar',
                email: 'omar@example.com',
                avatar: 'https://i.pravatar.cc/150?img=13',
            },
            skillOffered: 'C++',
            skillWanted: 'C#',
            status: 'rejected',
        },
        {
            requestId: 'req16',
            toUser: {
                name: 'Zara',
                email: 'zara@example.com',
                avatar: 'https://i.pravatar.cc/150?img=14',
            },
            skillOffered: 'Docker',
            skillWanted: 'Kubernetes',
            status: 'pending',
        },
    ]);

    const handleResponse = (id, action) => {
        const updated = incomingRequests.map((req) =>
            req.requestId === id ? { ...req, status: action } : req
        );
        setIncomingRequests(updated);
    };

    return (
        <div style={{ fontFamily: 'Segoe UI', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ padding: '2rem', flex: 1 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>📥 Swap Requests Inbox</h2>

                <section>
                    <h3>🔄 Incoming Requests</h3>
                    <div style={gridStyle}>
                        {incomingRequests.slice(0, 8).map((req) => (
                            <div key={req.requestId} style={cardStyle}>
                                <img src={req.fromUser.avatar} alt="avatar" style={avatarStyle} />
                                <h4>{req.fromUser.name}</h4>
                                <p>{req.fromUser.email}</p>
                                <p>📤 <b>{req.skillOffered}</b> → 📥 <b>{req.skillWanted}</b></p>
                                <p>Status: <b>{req.status}</b></p>

                                {req.status === 'pending' && (
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                        <button onClick={() => handleResponse(req.requestId, 'accepted')} style={btnStyle('green')}>
                                            Accept
                                        </button>
                                        <button onClick={() => handleResponse(req.requestId, 'rejected')} style={btnStyle('red')}>
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginTop: '3rem' }}>
                    <h3>📤 Sent Requests</h3>
                    <div style={gridStyle}>
                        {sentRequests.slice(0, 8).map((req) => (
                            <div key={req.requestId} style={cardStyle}>
                                <img src={req.toUser.avatar} alt="avatar" style={avatarStyle} />
                                <h4>{req.toUser.name}</h4>
                                <p>{req.toUser.email}</p>
                                <p>📤 <b>{req.skillOffered}</b> → 📥 <b>{req.skillWanted}</b></p>
                                <p>Status: <b>{req.status}</b></p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

// 🔧 Styling
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

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns
    gap: '1.5rem',
    marginTop: '1rem',
};

const cardStyle = {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
};

const avatarStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '0.5rem',
};

const btnStyle = (color) => ({
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: color === 'green' ? '#28a745' : '#dc3545',
    color: '#fff',
    cursor: 'pointer',
});

export default SwapInboxPage;
