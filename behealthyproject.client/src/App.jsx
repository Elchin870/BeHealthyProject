import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPageUser from './components/SignUpPageUser';
import SignUpPageDietitian from './components/SignUpPageDietitian';
import ResetPassword from './components/ResetPassword';
import DietitianPage from './components/DietitianPage';
import LoginPageDietitian from './components/LoginPageDietitian';
import LoginPageUser from './components/LoginPageUser';
import CompleteUserProfile from './components/CompleteUserProfile';
import UserPage from './components/UserPage';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import Forbidden from './components/Forbidden';
import CompleteDietitianProfile from './components/CompleteDietitianProfile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPageUser />} />
                <Route path="/signin/dietitian" element={<LoginPageDietitian />} />
                <Route path="/signup/user" element={<SignUpPageUser />} />
                <Route path="/signup/dietitian" element={<SignUpPageDietitian />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/forbidden" element={<Forbidden />} />

                <Route path="/dietitianpage" element={
                    <ProtectedRoute requiredRole="dietitian">
                        <DietitianPage />
                    </ProtectedRoute>
                } />
                <Route path="/completeuserprofile" element={
                    <ProtectedRoute requiredRole="user">
                        <CompleteUserProfile />
                    </ProtectedRoute>
                } />
                <Route path="/completedietitianprofile" element={
                    <ProtectedRoute requiredRole="dietitian">
                        <CompleteDietitianProfile />
                    </ProtectedRoute>
                } />
                <Route path="/userpage" element={
                    <ProtectedRoute requiredRole="user">
                        <UserPage />
                    </ProtectedRoute>
                } />
                <Route path="/userprofile" element={
                    <ProtectedRoute requiredRole="user">
                        <UserProfile />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
