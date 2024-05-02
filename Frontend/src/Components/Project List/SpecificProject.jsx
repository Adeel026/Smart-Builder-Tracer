import React, { useState, useEffect } from "react";
import "./ProjectList.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
const SpecificProject = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const response = await fetch("http://localhost:8000/auth/get-project", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data)
          // console.log(data.name);
          setUser(data.loginDetails)
          setProjects(data.projects);
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

  const handleProjectClick = (project) => {
    if (project.supervisorStatus === "accepted") {
      navigate("/customer/projectprogress/" + project._id, { state: { user, project } });
    }
    if (project.supervisorStatus === "requested") {
      toast.error('Failed to open project. Request is not yet accepted by supervisor!');
    }
    if (project.supervisorStatus === "declined") {
      toast.error('Failed to open project. Request is declined by supervisor!');
    }
  }

  return (
    <>
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
            <div
              key={project._id}
              className="projectlist"
              onClick={() => handleProjectClick(project)}
            >
              <h1>{getFirstLetters(project.projectTitle)}</h1>
              <h2>{project.projectTitle}</h2>
              {project.supervisorStatus === "requested" && <h2>Request in Progress!</h2>}
              {project.supervisorStatus === "declined" && <h2>Request Declined!</h2>}
            </div>
          ))}
        </div>
        <ToastContainer />
      </div >
    </>
  );

};

export default SpecificProject;
