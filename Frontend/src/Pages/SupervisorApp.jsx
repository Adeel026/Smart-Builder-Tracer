import { Route, Routes } from "react-router-dom";
import ProjectList from "../Components/Project List/ProjectList";
import Todo from "../Components/To DoList/Todo";
import Chat from "../Components/Chat Room/Chat";
import RequestedProject from "../Components/Project List/RequestedProject";
import Navbar from "../Components/NavBar/Navbar";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import Detail from "../Components/Project Detail/ProjectDetail";

const SupervisorApp = () => {
  const { userType, setUserType } = useUserContext();
  useState(() => {
    setUserType("supervisor");
  }, [userType])
  return (
    <>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/requestedprojects" element={<RequestedProject />} />
        <Route path="/projectwork/:projectId" element={<Todo />} />
        <Route path="/projectwork/chat/:userId" element={<Chat />} />
        <Route path="/projectwork/details/:projectId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default SupervisorApp;