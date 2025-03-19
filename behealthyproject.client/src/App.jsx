import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPageUser from './components/SignUpPageUser';  // Import SignUpPageUser
import SignUpPageDietitian from './components/SignUpPageDietitian';  // Import SignUpPageDietitian

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup/user" element={<SignUpPageUser />} />
                <Route path="/signup/dietitian" element={<SignUpPageDietitian />} />
            </Routes>
        </Router>
    );
}

export default App;
