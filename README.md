# Case Intake System

A modern case management system built with React and .NET 7, featuring file uploads and role-based access control.

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- Axios for API calls

### Backend
- .NET 7 Web API
- Entity Framework Core
- SQLite database
- File-based storage for attachments

## Features
- Case submission with file attachments
- Role-based access (Admin/User)
- Case listing and management
- File upload support
- Clean architecture design

## Getting Started

### Prerequisites
- Node.js 16+
- .NET 7 SDK
- SQLite

### Backend Setup
1. Navigate to the API project:
   ```bash
   cd CaseIntake.API
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Run the application:
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5218`

### Frontend Setup
1. Navigate to the web project:
   ```bash
   cd caseintake-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## Demo Credentials
- Admin: username: `admin`, password: `admin123`
- User: username: `user`, password: `user123`

## Project Structure
```
├── CaseIntake.API/          # Backend API project
├── CaseIntake.Core/         # Core domain models and interfaces
├── CaseIntake.Infrastructure/# Data access and services
└── caseintake-web/          # React frontend
```

## Development
- Backend API runs on port 5218
- Frontend development server runs on port 3000
- SQLite database is stored in the API project
- File uploads are stored in the API's wwwroot/uploads directory

## Security Considerations
- Basic authentication implemented
- File upload size limits
- Input validation
- CORS configured for development

## Next Steps
- Implement JWT authentication
- Add Microsoft Dynamics integration
- Implement CSV export
- Add email notifications 