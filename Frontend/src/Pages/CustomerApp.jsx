import { Route, Routes } from "react-router-dom";
import ProjectForm from "../Components/Project Form/ProjectForm";
import SpecificProject from "../Components/Project List/SpecificProject";
import ProjectProgress from "../Components/Project Progress/ProjectProgress";
import Chat from "../Components/Chat Room/Chat";
import Navbar from "../Components/NavBar/Navbar";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";


const CustomerApp = () => {
    const { userType, setUserType } = useUserContext();
    useState(() => {
        setUserType("customer");
    }, [userType])
    return (
        <>
            <Routes>
                <Route path="/" element={<SpecificProject />} />
                <Route path="/createproject" element={<ProjectForm />} />
                <Route path="/projectprogress/:projectId" element={<ProjectProgress />} />
                <Route path="/projectprogress/chat/:userId" element={<Chat />} />
            </Routes>
        </>
    );
}

export default CustomerApp;