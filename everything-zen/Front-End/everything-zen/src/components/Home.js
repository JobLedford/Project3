import React, { useState, useEffect } from 'react';
import Project from '../models/Project-Model';
import ProjectForm from './ProjectForm';

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await Project.find();
                setProjects(projects);
            } catch (error) {
                console.log('Error fetching projects', error);
            }
        };

        fetchProjects();
    }, []);
    
    const handleFormSubmit = (newProject) => {
        setProjects([...projects, newProject]);
    };

    const handleUpdate = async (projectId) => {
        const updatedTitle = prompt('Enter the updated title:');
        const updatedDescription = prompt('Enter the updated description')

        try {
            const updatedProject = await Project.findByIdAndUpdate(
                projectId,
                { title: updatedTitle, description: updatedDescription },
                { new: true }
            );
            
            setProjects((prevProjects) =>
                prevProjects.map((project) => 
                    project._id === updatedProject._id ? updatedProject : project
                )
            );
        } catch (error) {
            console.log('Error updating project', error);
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await Project.findByIdAndDelete(projectId);
            setProjects((prevProjects) => 
                prevProjects.filter((project) => project._id !== projectId)
            );
        } catch (error) {
            console.log('Error deleting project', error);
        }
    };

    return(
        <div className="home">
            <div className="yo">
                <h2>Welcome to my Construction Company!</h2>
                <h3>Fill Out Your Project Here!</h3>
                <ProjectForm onFormSubmit={handleFormSubmit} />
                <ul>
                    {projects.map((project) => (
                        <li key={project._id} className="project-info">
                            <div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                            <div className="project-actions">
                                <button onClick={() => handleUpdate(project._id)}>Update Project</button>
                                <button onClick={() => handleDelete(project._id)}>Delete Project</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;