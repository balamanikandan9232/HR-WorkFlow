# HR Workflow Designer

A visual HR workflow designer where HR admins can build and test internal workflows such as onboarding, leave approval, and document verification using a node-based canvas. [web:25][web:37]

🔗 **Live Demo**: https://hr-work-flow.vercel.app/ [web:1]

---

## Features

- Visual drag-and-drop workflow builder using a node-based canvas.
- Multiple node types for HR processes (start, task, approval, automated, end). [memory:5][web:25]
- Connect nodes with edges to define workflow paths.
- Sidebar for adding and configuring nodes.
- Workflow inspector / forms for editing node details.
- Built with modern React + Vite setup for fast development. [web:1][web:19]

---

## Tech Stack

- **Frontend:** React (Vite React template) [web:1][web:19]  
- **Canvas / Flows:** `@xyflow/react` (React Flow successor) for node-based UI. [memory:1][web:25][web:37]  
- **Tooling:**  
  - Vite for bundling and dev server. [web:19]  
  - ESLint for linting and code quality. [web:1]  

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)  
- npm (comes with Node)

### Installation

<img width="915" height="783" alt="image" src="https://github.com/user-attachments/assets/8f7aeb0c-65f9-40b4-878c-b9226a1500d8" />


## Core Concepts

- **Nodes:** Represent HR steps (e.g., “Start Onboarding”, “Manager Approval”, “Send Email”). [memory:5][web:25]  
- **Edges:** Connections between nodes defining the direction and order of the workflow.  
- **Canvas:** React Flow / XyFlow-powered area where nodes and edges are rendered and manipulated.  
- **Inspector / Forms:** Side panels to edit node metadata such as titles, roles, thresholds, and settings.

---

## How to Use

1. Open the app in your browser (local dev or Vercel demo). 
2. Drag or add nodes from the sidebar onto the canvas.  
3. Connect nodes by dragging from a source handle to a target handle.
4. Select a node to edit its details in the inspector (e.g., approver role, labels, thresholds). 
5. Iterate on your workflow until it matches your HR process.

---

## Design & Architecture Notes

- Uses a centralized workflow context to store nodes, edges, and selection state, enabling consistent updates from canvas and forms. 
- React Flow / XyFlow is configured via `ReactFlowProvider` and a custom `Canvas` component for better separation of concerns. 
- Node forms update the workflow context rather than mutating React Flow state directly, which keeps business logic in one place. 

---

## Completed vs. Future Work

### Implemented

- Basic HR workflow canvas with multiple node types. [memory:16][web:25]  
- Drag-and-drop node creation and edge connections.  
- Node inspector and forms for editing node data.  
- Vite-based dev/build setup and ESLint configuration. [web:19][web:1]  
- Deployed demo on Vercel. [web:1]

### Potential Improvements

- Persist workflows to a backend (e.g., REST/GraphQL API). [web:34]  
- Authentication and per-user saved workflows. [web:34]  
- Role-based access and permissions for editing and approving steps.  
- Workflow simulation with step-by-step execution and validation. [web:25]  
- Test coverage (unit/integration) with Vitest/React Testing Library. [web:34]

---

## Scripts

Common npm scripts available in this project: [web:19][web:36]

- `npm run dev` – Start development server  
- `npm run build` – Create production build  
- `npm run preview` – Preview production build locally  
- `npm run lint` – Run ESLint checks

---

## Deployment

The project is currently deployed on **Vercel** at:

- https://hr-work-flow.vercel.app/ [web:1]

To redeploy:

1. Push changes to the `master` branch of this repository.  
2. Ensure Vercel is configured to use the Vite build command (`npm run build`) and output (`dist`). [web:35]

---

## Author

- **Balamanikandan** – MERN / React Developer  
- GitHub: https://github.com/balamanikandan9232 [web:1]

---

## License

This project is currently unpublished under a specific license.  
You can optionally add **MIT License** or any other license later as needed. [web:26][web:21]

