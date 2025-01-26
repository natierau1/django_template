# **React Frontend Setup Plan with Material UI Dashboard**

### Goals:
1. Use the Material UI **Dashboard Template** as the base UI for the entire frontend.
2. Dockerize the React application.
3. Implement a `.gitignore` to ensure unnecessary files are excluded from version control.
4. Prepare the system for scalable development with TypeScript and authentication.

---

## **1. Project File Structure**

```
frontend/
├── Dockerfile
├── .dockerignore
├── .gitignore
├── package.json
├── tsconfig.json
├── public/
│   ├── index.html
│   └── manifest.json
└── src/
    ├── App.tsx
    ├── index.tsx
    ├── components/
    │   ├── Dashboard.tsx      # Material UI dashboard template
    │   ├── Login.tsx          # Login screen
    │   ├── ProtectedRoute.tsx # Authentication guard for routes
    │   └── Sidebar.tsx        # Navigation sidebar (from Dashboard)
    ├── services/
    │   └── authService.ts     # Authentication API integration
    ├── theme/
    │   └── theme.ts           # Custom Material UI theme
    └── utils/
        └── helpers.ts         # Reusable helper functions
```

---

## **2. Material UI Dashboard Integration**

### Base Template
The [Dashboard Template](https://github.com/mui/material-ui/blob/v6.4.1/docs/data/material/getting-started/templates/dashboard/Dashboard.tsx) will serve as the foundation of your application. Its components (like the sidebar, top navigation, and cards) will be reused across the system.

### Required Setup:
1. **Install Material UI**:
   ```bash
   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @fontsource/roboto
   ```

2. **Add Dashboard to `src/components/`**:
   - Copy the [Dashboard.tsx](https://github.com/mui/material-ui/blob/v6.4.1/docs/data/material/getting-started/templates/dashboard/Dashboard.tsx) file into `src/components/`.

3. **Modify for Reuse**:
   - Extract reusable components like the sidebar (`Sidebar.tsx`) and top navigation.
   - Wrap the dashboard in `ProtectedRoute` to secure it with authentication.

4. **Theme Customization**:
   - Add a custom theme in `src/theme/theme.ts` for consistent styling across the app:
     ```tsx
     import { createTheme } from '@mui/material/styles';

     const theme = createTheme({
       palette: {
         primary: {
           main: '#1976d2',
         },
         secondary: {
           main: '#dc004e',
         },
       },
       typography: {
         fontFamily: 'Roboto, Arial, sans-serif',
       },
     });

     export default theme;
     ```

5. **Integration in `App.tsx`**:
   - Wrap the app with the `ThemeProvider` and `CssBaseline` for global styles:
     ```tsx
     import React from 'react';
     import { ThemeProvider, CssBaseline } from '@mui/material';
     import { BrowserRouter, Routes, Route } from 'react-router-dom';
     import theme from './theme/theme';
     import Dashboard from './components/Dashboard';
     import Login from './components/Login';
     import ProtectedRoute from './components/ProtectedRoute';

     const App = () => (
       <ThemeProvider theme={theme}>
         <CssBaseline />
         <BrowserRouter>
           <Routes>
             <Route path="/login" element={<Login />} />
             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
           </Routes>
         </BrowserRouter>
       </ThemeProvider>
     );

     export default App;
     ```

---

## **3. Docker Setup for React**

### Dockerfile
```dockerfile
# Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

### `.dockerignore`
Ensure unnecessary files are excluded from the Docker build context:
```
node_modules
build
.dockerignore
.git
.gitignore
```

---

### Add Frontend to `docker-compose.yml`
Update `docker-compose.yml` to include the frontend:
```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
  container_name: react-frontend
  ports:
    - "3000:3000"
  volumes:
    - ./frontend:/app
    - /app/node_modules
```

---

## **4. Git Ignore**

### `.gitignore`
Add a `.gitignore` file to exclude unnecessary files from version control:
```
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# TypeScript
*.tsbuildinfo

# Logs
logs
*.log
npm-debug.log*

# Build
build/

# Docker
docker-compose.override.yml
.dockerignore

# IDEs
.vscode/
.idea/
*.swp
```

---

## **5. Authentication Flow**

### Steps:
1. **Login Page (`Login.tsx`)**:
   - Use Material UI components to create a login form.
   - Send a POST request to the Django backend `/api/token/` endpoint.
   - Store the `access` and `refresh` tokens in `localStorage`.

   Example:
   ```tsx
   import React, { useState } from 'react';
   import { TextField, Button, Container, Typography } from '@mui/material';
   import { useNavigate } from 'react-router-dom';
   import axios from 'axios';

   const Login = () => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       try {
         const response = await axios.post('http://localhost:8000/api/token/', { username, password });
         localStorage.setItem('authToken', response.data.access);
         localStorage.setItem('refreshToken', response.data.refresh);
         navigate('/dashboard');
       } catch (error) {
         alert('Invalid credentials');
       }
     };

     return (
       <Container maxWidth="sm">
         <Typography variant="h4" align="center" gutterBottom>Login</Typography>
         <form onSubmit={handleSubmit}>
           <TextField
             label="Username"
             fullWidth
             margin="normal"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
           />
           <TextField
             label="Password"
             type="password"
             fullWidth
             margin="normal"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <Button variant="contained" color="primary" fullWidth type="submit">Login</Button>
         </form>
       </Container>
     );
   };

   export default Login;
   ```

2. **Protected Routes (`ProtectedRoute.tsx`)**:
   - Ensure only authenticated users can access the dashboard:
     ```tsx
     import React from 'react';
     import { Navigate } from 'react-router-dom';

     const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
       const token = localStorage.getItem('authToken');
       return token ? children : <Navigate to="/login" />;
     };

     export default ProtectedRoute;
     ```

3. **Logout Functionality**:
   - Add a logout button in the dashboard to clear tokens and redirect to the login page.

---

## **6. Testing**

1. Verify the login page works with valid/invalid credentials.
2. Test `ProtectedRoute` by accessing `/dashboard` without a token (should redirect to `/login`).
3. Check the Material UI dashboard layout for compatibility across screen sizes.
