Great! Here's an updated README file incorporating your **scripts** for starting the server:

```markdown
# 🎓 Student Management System (TypeScript)

This **Student Management System** is a full-stack application built using **TypeScript**, providing functionalities for managing student records. The project leverages modern TypeScript features along with Express.js for routing, validation, and user authentication. It demonstrates real-world usage of **CRUD operations**, **authentication**, and **role-based access**.

---

## ✨ Features  
- **Admin Panel**: Admin can manage student records, including adding, editing, and deleting students.  
- **User Panel**: Users (students) can view their profiles and update their information.  
- **Authentication**: User and Admin login with session management.  
- **Responsive Layouts**: User and admin interfaces are separate with custom layouts.  
- **Error Handling**: Consistent error handling across the application.

---

## 🛠️ Tech Stack  
- **TypeScript**: Strongly-typed JavaScript for better scalability and maintainability.  
- **Express.js**: Web framework for Node.js, used for handling HTTP requests.  
- **MongoDB**: NoSQL database to store student and user data.  
- **EJS**: Templating engine for rendering views with dynamic data.  
- **bcryptjs**: For hashing and securing passwords.  
- **Express-Session**: For handling user sessions and login states.

---

## 📂 Project Structure

```plaintext
student-management-typescript/
├── public/
│   ├── css/
│   │   ├── admin.css          # Admin-specific styles
│   │   ├── index.css          # General styles
│   │   └── user.css           # User-specific styles
│   └── ts/
│       └── authValidation.ts   # User authentication validation
├── src/
│   ├── config/
│   │   └── db.config.ts       # Database configuration
│   ├── controllers/
│   │   ├── adminControllers.ts # Admin controllers for student management
│   │   ├── indexControllers.ts # General controllers
│   │   └── userControllers.ts  # User controllers for profile management
│   ├── middlewares/
│   │   └── authMiddlewares.ts  # Middleware for user authentication
│   ├── models/
│   │   └── userModels.ts      # Mongoose models for User
│   ├── routes/
│   │   ├── adminRoutes.ts     # Admin-specific routes
│   │   ├── indexRoutes.ts     # General routes
│   │   └── userRoutes.ts      # User-specific routes
│   ├── types/
│   │   ├── env.d.ts           # Environment variables
│   │   └── global.d.ts        # Global type declarations
│   ├── utils/
│   │   ├── httpStatusCodes.ts # Standard HTTP status codes
│   │   └── messageUtils.ts    # Utility for sending messages
│   └── app.ts                 # Main application entry point
├── views/
│   ├── admin/
│   │   ├── add.ejs            # Add student page
│   │   ├── adminLogin.ejs     # Admin login page
│   │   ├── dashboard.ejs      # Admin dashboard
│   │   ├── edit.ejs           # Edit student page
│   │   ├── search.ejs         # Student search page
│   │   └── view.ejs           # View student details
│   ├── layouts/
│   │   ├── adminLayout.ejs    # Layout for Admin panel
│   │   ├── userLayout.ejs     # Layout for User panel
│   │   └── authLayout.ejs     # Layout for authentication pages
│   ├── partials/
│   │   ├── admin/
│   │   │   ├── sidebar.ejs    # Admin sidebar
│   │   │   └── header.ejs     # Admin header
│   │   └── user/
│   │       └── header.ejs     # User header
│   └── user/
│       ├── profile.ejs        # User profile page
│       ├── signup.ejs         # User signup page
│       └── userLogin.ejs      # User login page
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
├── tsConfig.client.json      # Client-side TypeScript configuration
├── .gitignore                # Git ignore rules
├── package-lock.json         # Package lock file for npm
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or later)
- **npm** (v6 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/student-management-typescript
   cd student-management-typescript
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Set up your **MongoDB** connection in `src/config/db.config.ts`.

2. Create a `.env` file and add your environment variables, such as database URI and session secrets.

### Build and Run the Project
1. To build the server:
   ```bash
   npm run build:server
   ```

2. To build the client-side TypeScript:
   ```bash
   npm run build:client
   ```

3. To build both the server and client:
   ```bash
   npm run build
   ```

4. To start the server:
   ```bash
   npm start
   ```

5. To build and serve the project:
   ```bash
   npm run serve
   ```

---

## 🔍 Usage

- **Admin Panel**: Admin can login, add, edit, and delete student records, and manage the dashboard.
- **User Panel**: Users (students) can view and update their profiles.
- **Authentication**: Users and admins can securely log in and maintain sessions.
- **Error Handling**: Clear and structured error pages for invalid routes and other issues.

---

## 🧩 Learning Outcomes
- Master **TypeScript fundamentals** and **OOP** principles.
- Work with **MongoDB** and **Mongoose** for data management.
- Learn how to structure a full-stack **Node.js** application with **Express**.
- Apply **session management** and **authentication** in a real-world project.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🌟 Acknowledgements
Special thanks to the **TypeScript** community and **Express** team for their documentation and open-source resources.

Happy Coding! 💻
```