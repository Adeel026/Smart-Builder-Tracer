const express = require("express");
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
require("../database/connection");

const { registerSupervisor, registerCustomer, allSupervisors } = require('../controller/SignUpController');
router.post('/register-supervisor', registerSupervisor);
router.post('/register-customer', registerCustomer);
router.get('/allSupervisors', allSupervisors);

const { login, logout } = require('../controller/SignInController');
router.post('/login-user', login);
router.post('/logout-user', logout);

const { createAppointment } = require('../controller/BookAppointmentController');
router.post('/create-appointment', createAppointment)

const { addDetails } = require('../controller/addProjectController');
router.post('/add-project', Authenticate, addDetails);

const { getAllProjects } = require('../controller/AllProjectList');
router.get('/all-projects', Authenticate, getAllProjects);

const { AcceptProject, DeclineProject } = require('../controller/Project')
router.put('/decline-project/:projectId', Authenticate, DeclineProject);
router.put('/accept-project/:projectId', Authenticate, AcceptProject);

const { ShowProject, ShowRequestedProjects } = require('../controller/getProjectById');
router.get('/get-project', Authenticate, ShowProject);
router.get('/get-requested-projects', Authenticate, ShowRequestedProjects);
module.exports = router;
