import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogReader from './Component/Blogger/BlogReader.jsx';
import UserProvider from './Component/Auth/UserProvider';
import BlogWirte from './Component/Blogger/BlogWritte.jsx';
import BlogShow from './Component/Blogger/BlogShow.jsx';
import Profile from './Component/Profile/Profile.jsx';
import Sing from './Component/loginsingin/SingIn.jsx';
import AddCreate from './Component/Add/AddCreate';
import Login from './Component/loginsingin/Login';
// import UserContext from './Component/Auth/UserContext';


function App() {
  // const { token } = React.useContext(UserContext);


  return (
    <>
    <UserProvider>
          <Router>
            <Routes>
            {/* <Route path="/" element={(token === token) && user ? <Navigate to='/dashboard' /> : <Login />} /> */}
              <Route path="/" element={<Login/>} />
              <Route path="/sign-up" element={<Sing />} />
              <Route path="/create-blog" element={<BlogWirte />} />
              <Route path="/views-detail" element={<BlogReader />} />
              <Route path="/profile-user" element={<Profile />} />
              <Route path="/home-page" element={<BlogShow />} />
              <Route path="/post" element={<AddCreate />} />

            </Routes>
          </Router>
        </UserProvider>
    </>
  );
}

export default App;
