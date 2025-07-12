// src/pages/SkillManagement.jsx
import React, { useEffect, useState } from 'react';
// import api from '../services/api';

export const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    // 🔄 Fetch all skills
    const fetchSkills = async () => {
        try {
            const res = await api.get('/skills');
            setSkills(res.data);
        } catch (err) {
            console.error('Failed to fetch skills:', err);
        }
    };

    // ➕ Add new skill
    const addSkill = async () => {
        if (!newSkill.trim()) return;
        try {
            const res = await api.post('/skills', { skill: newSkill });
            setSkills([...skills, res.data]);
            setNewSkill('');
        } catch (err) {
            console.error('Failed to add skill:', err);
        }
    };

    // ❌ Delete skill
    const deleteSkill = async (id) => {
        try {
            await api.delete(`/skills/${id}`);
            setSkills(skills.filter(skill => skill._id !== id));
        } catch (err) {
            console.error('Failed to delete skill:', err);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div style={{ maxWidth: 500, margin: 'auto', padding: '1rem' }}>
            <h2>Skill Management</h2>

            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add your skill"
                    style={{ flex: 1, padding: '0.5rem' }}
                />
                <button onClick={addSkill} style={{ marginLeft: '10px' }}>Add</button>
            </div>

            <ul>
                {skills.map((skill) => (
                    <li key={skill._id} style={{ marginBottom: '10px' }}>
                        {skill.skill}
                        <button
                            onClick={() => deleteSkill(skill._id)}
                            style={{ marginLeft: '10px', color: 'red' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageSkills;
