const express = require('express');
const router = express.Router();
const Project = require('../models/Project-Model');

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.log('Error fetching projects', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new project
router.post('/projects', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newProject = await Project.create({ title, description });
    res.status(201).json(newProject);
  } catch (error) {
    console.log('Error creating project', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update a project
router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    console.log('Error updating project', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a project
router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Project.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    console.log('Error deleting project', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
