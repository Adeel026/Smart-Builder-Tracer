import React, { useState, useEffect } from "react";
import "./ProjectList.css";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/auth/all-projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
          setUser(data.user)
        } else {
          console.error("Failed to fetch projects:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProjects();
  }, []);
  const filteredProjects = projects.filter((project) =>
    project.projectTitle && project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFirstLetters = (sentence) => {
    const words = sentence.trim().split(" ");
    const firstLetters = words.map((word) => word.charAt(0)).join("");
    return firstLetters;
  };

  return (
    <div className="projectlists-main">
      <div className="projectlists">
        <h1>All Created Projects</h1>
        <input
          type="search"
          placeholder="Search project"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="projectlists-display">
        {filteredProjects.map((project) => (
          <div className="projectlist" onClick={() => navigate("/supervisor/projectwork/" + project._id, {state: {user, project}})} key={project._id}>
            <h1>{getFirstLetters(project.projectTitle)}</h1>
            <h2>{project.projectTitle}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
