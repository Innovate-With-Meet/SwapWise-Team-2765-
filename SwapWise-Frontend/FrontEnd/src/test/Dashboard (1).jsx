import React, { useMemo, useState } from 'react'
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import { Edit, Delete, Save } from '@mui/icons-material'

const predefinedSkills = [
  'Python', 'JavaScript', 'React', 'Node.js', 'Java',
  'C++', 'SQL', 'HTML', 'CSS', 'Machine Learning', 'DevOps',
]

export default function Profile() {
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
  })

  const [avatarFile, setAvatarFile] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState('')
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editedSkillName, setEditedSkillName] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)

  const skillExists = useMemo(
    () => (skillName) => user.skills.some((s) => s.name === skillName),
    [user.skills]
  )

  const handleAddSkill = () => {
    if (!selectedSkill || skillExists(selectedSkill)) return
    const newId = user.skills.length ? user.skills[user.skills.length - 1].id + 1 : 1
    setUser((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: newId, name: selectedSkill }],
    }))
    setSelectedSkill('')
  }

  const handleDeleteSkill = (id) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const handleEditSkill = () => {
    if (!editedSkillName || skillExists(editedSkillName)) return
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.map((s) =>
        s.id === editingSkillId ? { ...s, name: editedSkillName } : s
      ),
    }))
    setEditingSkillId(null)
    setEditedSkillName('')
  }

  const handleAvatarUpload = () => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile)
      setUser((prev) => ({ ...prev, avatar: url }))
    }
  }

  const toggleAvailability = () => {
    setIsAvailable((prev) => !prev)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>User Profile</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item xs>
            <Button variant="contained" component="label">
              Upload
              <input hidden type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
            </Button>
            <Button sx={{ ml: 1 }} onClick={handleAvatarUpload}>Save</Button>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 2 }}><strong>Username:</strong> {user.username}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Phone:</strong> {user.phone}</Typography>
        <Typography><strong>Address:</strong> {user.address}</Typography>

        <Button
          variant="outlined"
          color={isAvailable ? 'success' : 'error'}
          onClick={toggleAvailability}
          sx={{ mt: 2 }}
        >
          {isAvailable ? 'Available' : 'Unavailable'}
        </Button>

        <Typography variant="h6" sx={{ mt: 4 }}>Skills</Typography>
        <List dense>
          {user.skills.map((skill) => (
            <ListItem key={skill.id}>
              {editingSkillId === skill.id ? (
                <FormControl size="small" sx={{ width: '60%' }}>
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
                <ListItemText primary={skill.name} />
              )}

              <ListItemSecondaryAction>
                {editingSkillId === skill.id ? (
                  <IconButton edge="end" onClick={handleEditSkill}><Save /></IconButton>
                ) : (
                  <>
                    <IconButton edge="end" onClick={() => {
                      setEditingSkillId(skill.id)
                      setEditedSkillName(skill.name)
                    }}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteSkill(skill.id)}>
                      <Delete />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Grid container spacing={2} alignItems="center" sx={{ mt: 3 }}>
          <Grid item xs={10}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Skill</InputLabel>
              <Select
                fullWidth
                value={selectedSkill}
                label="Select Skill"
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                {predefinedSkills.map((skill) => (
                  <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddSkill}
              sx={{ height: '40px' }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
