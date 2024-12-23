# Todo Application

A simple Todo application with a Node.js backend and a JavaScript frontend. This project allows users to create, read, update, and delete todos.

---
```bash
TODO-APP/
│
├── cypress/                   # Cypress test-related files
│   ├── downloads/             # Downloads from Cypress tests
│   ├── e2e/                   # End-to-end Cypress tests
│   │   └── todo.spec.cy.js    # E2E test for the todo app
│   ├── fixtures/              # Test fixtures (mock data)
│   ├── screenshots/           # Screenshots captured by Cypress
│   └── support/               # Cypress support files
│
├── public/                    # Public folder for frontend files
│   ├── index.html             # Main HTML file for the frontend
│   ├── script.js              # Main JavaScript file for frontend logic
│   └── style.css              # CSS for styling the app
│
├── test/                      # API test files
│   └── api.test.js            # Test cases for API endpoints
│
├── cypress.config.js          # Cypress configuration file
├── package-lock.json          # Lock file for Node dependencies
├── package.json               # Project metadata and dependencies
├── server.js                  # Backend server setup
└── todos.json                 # JSON file acting as the database


## Features

### Backend (Node.js)
- **Add Todos:** Create a new todo with a unique ID.
- **View Todos:** Fetch all todos from the server.
- **Update Todos:** Modify the text or completion status of an existing todo.
- **Delete Todos:** Remove a todo by its ID.

### Frontend (HTML/JavaScript)
- **Dynamic UI:** Render todos dynamically from the backend.
- **Form Handling:** Add new todos via a form.
- **Inline Editing:** Edit todo text directly from the UI.
- **Completion Toggle:** Mark todos as completed or undo completion.
- **Delete Action:** Remove todos from the list.

---

## Technologies Used

### Backend
- **Node.js:** Server-side runtime.
- **Express:** Web framework.
- **File System (fs):** Read and write todos to a JSON file.

### Frontend
- **HTML/CSS/JavaScript:** User interface.

### Testing
- **Cypress:** End-to-end testing framework for UI and API testing.
- **Mocha:** Test framework used by Cypress for writing tests.
- **Chai:** Assertion library for testing.

---

## Project Setup

### Prerequisites
- Node.js installed on your system.
- A modern web browser.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. Install dependencies:

   npm install


3. Start the server:

   node server.js


4. Open the frontend:
   - The frontend is served from the public folder. 


## How to Run Tests
### Running API Tests

Install API Testing Dependencies:
- npm run test

Using Postman:

Import the API collection into Postman.

Set the base URL to http://localhost:3000/api/todos.

Execute requests (GET, POST, PUT, DELETE) with the required payloads.



### Running Cypress Tests
1. Run in CLI (Headless Mode):

- npx cypress run

2. Run in Cypress GUI:

- npx cypress open

