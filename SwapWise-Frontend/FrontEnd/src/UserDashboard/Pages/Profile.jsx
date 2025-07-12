import React, { useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';

const predefinedSkills = [
  'Python', 'JavaScript', 'React', 'Node.js', 'Java',
  'C++', 'SQL', 'HTML', 'CSS', 'Machine Learning', 'DevOps',
];

const Profile = () => {
  const [user, setUser] = useState({
    avatar: '',
    username: 'john_doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123, Example Street, City',
    skills: [
      { id: 1, name: 'Python' },
      { id: 2, name: 'React' },
    ],
  });

  const [formData, setFormData] = useState({
    username: user.username,
    phone: user.phone,
    address: user.address,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editedSkillName, setEditedSkillName] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [newPassword, setNewPassword] = useState('');

  const skillExists = useMemo(
    () => (skillName) => user.skills.some((s) => s.name === skillName),
    [user.skills]
  );

  const handleAddSkill = () => {
    if (!selectedSkill || skillExists(selectedSkill)) return;
    const newId = user.skills.length ? user.skills[user.skills.length - 1].id + 1 : 1;
    setUser((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: newId, name: selectedSkill }],
    }));
    setSelectedSkill('');
  };

  const handleDeleteSkill = (id) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const handleEditSkill = () => {
    if (!editedSkillName || skillExists(editedSkillName)) return;
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.map((s) =>
        s.id === editingSkillId ? { ...s, name: editedSkillName } : s
      ),
    }));
    setEditingSkillId(null);
    setEditedSkillName('');
  };

  const handleAvatarUpload = () => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setUser((prev) => ({ ...prev, avatar: url }));
    }
  };

  const toggleAvailability = () => {
    setIsAvailable((prev) => !prev);
  };

  const handleProfileUpdate = () => {
    setUser((prev) => ({
      ...prev,
      username: formData.username,
      phone: formData.phone,
      address: formData.address,
    }));
    alert('✅ Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (!newPassword.trim()) return alert('⚠️ Please enter a password');
    alert('🔐 Password updated (connect to backend to store securely)');
    setNewPassword('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">👤 User Profile</Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Avatar Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={user.avatar}
              alt="Profile"
              sx={{ width: 80, height: 80, border: '2px solid #1976d2' }}
            />
          </Grid>
          <Grid item xs>
            <Button variant="contained" component="label" size="small">
              Upload Avatar
              <input hidden type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={handleAvatarUpload}>
              Save Avatar
            </Button>
          </Grid>
        </Grid>

        {/* Personal Details */}
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Username"
            fullWidth
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            fullWidth
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={user.email}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth onClick={handleProfileUpdate}>
                Save Profile Info
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth color="warning" onClick={handlePasswordChange}>
                Update Password
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color={isAvailable ? 'success' : 'error'}
            onClick={toggleAvailability}
            sx={{ mt: 2, width: '100%' }}
          >
            {isAvailable ? ' Available for Collaboration' : '🚫 Unavailable'}
          </Button>
        </Box>

        {/* Skills Section */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>🛠 Skills</Typography>

        <Grid container spacing={1}>
          {user.skills.map((skill) => (
            <Grid item xs={12} sm={6} key={skill.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  px: 2,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  transition: '0.2s',
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                  },
                }}
              >
                {editingSkillId === skill.id ? (
                  <FormControl size="small" sx={{ flex: 1, mr: 2 }}>
                    <Select
                      value={editedSkillName}
                      onChange={(e) => setEditedSkillName(e.target.value)}
                    >
                      {predefinedSkills.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography fontWeight={500}>{skill.name}</Typography>
                )}

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {editingSkillId === skill.id ? (
                    <IconButton size="small" onClick={handleEditSkill} color="success">
                      <Save fontSize="small" />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingSkillId(skill.id);
                          setEditedSkillName(skill.name);
                        }}
                        color="primary"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteSkill(skill.id)}
                        color="error"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Add Skill */}
        <Grid container spacing={2} alignItems="center" sx={{ mt: 3 }}>
          <Grid item xs={8}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Skill</InputLabel>
              <Select
                value={selectedSkill}
                label="Select Skill"
                onChange={(e) => setSelectedSkill(e.target.value)}
                sx={{
                  height: '40px',
                  backgroundColor: '#fff',
                }}
              >
                {predefinedSkills.map((skill) => (
                  <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddSkill}
              sx={{
                height: '40px',
                fontWeight: 'bold',
                borderRadius: 1,
                textTransform: 'none',
                fontSize: '0.9rem',
              }}
            >
              Add Skill
            </Button>
          </Grid>
        </Grid>

      </Paper>
    </Container>
  );
};

export default Profile;
