import React, { useState } from "react";
import Project from '../models/Project-Model';


const ProjectForm = ({ onFormSUbmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newProject = await Project.create({ title, description });
            onFormSUbmit(newProject);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.log('Error creating project', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Project Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder='Project Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type='submit'>Add Project</button>
        </form>
    );
};

export default ProjectForm;