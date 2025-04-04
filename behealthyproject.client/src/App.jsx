import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPageUser from './components/SignUpPageUser';  
import SignUpPageDietitian from './components/SignUpPageDietitian';
import UserPage from './components/UserPage';
import ResetPassword from './components/ResetPassword';
import DietitianPage from './components/DietitianPage';
import LoginPageDietitian from './components/LoginPageDietitian';
import LoginPageUser from './components/LoginPageUser';

function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<LoginPageUser />} />
                <Route path="/signin/dietitian" element={<LoginPageDietitian />} />
                <Route path="/signup/user" element={<SignUpPageUser />} />
                <Route path="/signup/dietitian" element={<SignUpPageDietitian />} />
                <Route path="/userpage" element={<UserPage />} />
                <Route path="/dietitianpage" element={<DietitianPage />} />
                <Route path="/resetpassword" element={<ResetPassword />} />

            </Routes>
        </Router>
    );
}

export default App;

 