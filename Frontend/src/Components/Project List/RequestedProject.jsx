import React, { useState, useEffect } from "react";
import "./ProjectList.css";

const RequestedProject = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:8000/auth/get-requested-projects", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setProjects(data.requestedProjects);
            } else {
                console.error("Failed to fetch projects:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching projects:", error.message);
        }
    };
    const handleAccept = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8000/auth/accept-project/${projectId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            if (response.ok) {
                fetchProjects();
            } else {
                console.error("Failed to accept project:", response.statusText);
            }
        } catch (error) {
            console.error("Error accepting project:", error.message);
        }
    };

    const handleDecline = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8000/auth/decline-project/${projectId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            if (response.ok) {
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project._id !== projectId)
                );
            } else {
                console.error("Failed to decline project:", response.statusText);
            }
        } catch (error) {
            console.error("Error declining project:", error.message);
        }
    };

    const filteredProjects = projects.filter((project) =>
        project.projectTitle && project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getFirstLetters = (sentence) => {
        const words = sentence.trim().split(" ");
        const firstLetters = words.map((word) => word.charAt(0)).join("");
        return firstLetters;
    };

    return (
        <>
            <div className="projectlists-main">
                <div className="projectlists">
                    <h1>Requested Projects</h1>
                    <input
                        type="search"
                        placeholder="Search project"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="projectlists-display">
                    {filteredProjects.map((project) => (
                        <div className="projectlist" key={project._id}>
                            <h1>{getFirstLetters(project.projectTitle)}</h1>
                            <h2>{project.projectTitle}</h2>
                            <div className="projectlist-buttons">
                                {project.supervisorStatus === 'requested' && (
                                    <>
                                        <button onClick={() => handleAccept(project._id)}>
                                            Accept
                                        </button>
                                        <button onClick={() => handleDecline(project._id)}>
                                            Decline
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RequestedProject;
