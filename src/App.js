import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import MbtiPage from './pages/MbtiPage';
import TravleTest from './pages/TravelTest';
import TravelResult from './pages/TravelResult';
import Login from './pages/Login';
import Join from './pages/Join';
import GlobalStyle from './components/GlobalStyle';
import Chat from './pages/Chat';
import ChatLogin from './pages/ChatLogin';
import Review from './pages/Review';
import YoutubeTest from './pages/YoutubeTest';
import YoutubeResult from './pages/YoutubeResult';
import JobTest from './pages/JobTest';
import JobResult from './pages/JobResult';
import './assets/custom.scss';
import Personalities from './pages/Personalities';
import UserPage from './pages/UserPage';
import Ask from './pages/Ask';
import AdminPage from './pages/Adminpage';
import AdminLogin from './pages/AdminLogin';

function App() {
    window.Kakao.init('dbc26ec5c63bf136447323baac97f826');
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/Login" element={<Login />}></Route>
                    <Route path="/Join" element={<Join />}></Route>
                    <Route path="/Ask" element={<Ask />}></Route>
                    <Route path="/AdminPage" element={<AdminPage />}></Route>
                    <Route path="/AdminLogin" element={<AdminLogin />}></Route>

                    <Route path="/UserPage" element={<UserPage />}></Route>
                    <Route path="/MbtiPage" element={<MbtiPage />}></Route>
                    <Route exact path="/ChatLogin" element={<ChatLogin />}></Route>
                    <Route path="/Chat" element={<Chat />}></Route>
                    <Route exact path="/Personalities" element={<Personalities />}></Route>
                    <Route path="/TravelTest" element={<TravleTest />} />
                    <Route path="/TravelResult" element={<TravelResult />} />
                    <Route path="/YoutubeTest" element={<YoutubeTest />} />
                    <Route path="/YoutubeResult" element={<YoutubeResult />} />
                    <Route path="/Review" element={<Review />} />
                    <Route path="/JobTest" element={<JobTest />} />
                    <Route path="/JobResult" element={<JobResult />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
