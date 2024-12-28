# Job Portal Application

A dynamic and responsive **Job Portal Application** designed to streamline the job search process. This app offers a user-friendly interface, robust filtering options, secure authentication, and seamless navigation to provide an efficient and engaging experience for users.

## Features

### 1. Authentication
- **Login with JWT**:
  - Displays error messages for invalid credentials.
  - Redirects authenticated users to the Home page.
- **Route Protection**:
  - Unauthenticated users are redirected to the Login page when trying to access restricted routes.
  - Authenticated users attempting to access the Login page are redirected to the Home page.

### 2. Home Page
- Welcomes authenticated users.
- "Find Jobs" button navigates to the Jobs page.

### 3. Jobs Page
- **Profile Section**:
  - Fetches and displays user profile data.
  - Handles API errors with Retry functionality.
- **Job Listings**:
  - Fetches jobs dynamically with filtering options for employment type, salary range, and search queries.
  - Displays loaders during data fetching and "No Jobs Found" view for empty results.
  - Handles API failures gracefully with Retry options.
- **Filters and Search**:
  - Filter jobs by employment type (e.g., Full-Time, Part-Time).
  - Filter jobs by salary range.
  - Combine multiple filters for precise results.
  - Search for jobs dynamically based on user input.

### 4. Job Details Page
- Displays detailed job information, including similar job recommendations.
- **Retry Button**: Handles data-fetch failures.
- **Visit Company**: Opens the company website in a new tab.

### 5. 404 Page
- Displays a "Not Found" view for invalid URLs.

### 6. Header Navigation
- **Logo**: Redirects to the Home page.
- **Navigation Links**:
  - "Home" navigates to the Home page.
  - "Jobs" navigates to the Jobs page.
- **Logout**: Logs out the user and redirects to the Login page.

## Technologies Used

- **Frontend**: React.js
- **Routing**: React Router
- **Styling**: CSS, Bootstrap
- **State Management**: React state management
- **API Integration**: RESTful APIs
- **Authentication**: JWT-based secure authentication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-portal-app.git
   cd job-portal-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Profile API
- URL: `https://apis.ccbp.in/profile`
- Method: `GET`
- Headers: `Authorization: Bearer <JWT>`

### Jobs API
- URL: `https://apis.ccbp.in/jobs`
- Method: `GET`
- Query Parameters:
  - `employment_type`
  - `minimum_package`
  - `search`

### Job Details API
- URL: `https://apis.ccbp.in/jobs/:id`
- Method: `GET`
- Path Parameter: `id` (Job ID)

## Folder Structure
```
job-portal-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── styles/
└── README.md
```

## Additional Features
- **Dynamic Filters**: Real-time filtering and search functionality.
- **Responsive Design**: Optimized for all devices.
- **Error Handling**: Graceful handling of API failures with retry options.
- **Modular Components**: Scalable and reusable code structure.
- **Secure Authentication**: Robust session management with JWT.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Thanks to [CCBP APIs](https://apis.ccbp.in/) for providing API endpoints.

---
Developed with ❤️ using React.js.
