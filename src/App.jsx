import { useLocation, Routes, Route } from "react-router-dom";
import './App.css';
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar.jsx';
import Index from "./views/Index/Index.jsx";
import AboutUs from './views/AboutUs/AboutUs.jsx';
import MainPageLoader from "./views/MainPage/MainPageLoader.jsx";
import How_to_play from "./views/How-to-play/How-to-play.jsx";
import Profile from "./views/Profile/Profile.jsx";
import CreateMatchHandler from "./views/CreateMatchHandler/CreateMatchHandler.jsx";
import JoinMatchHandler from "./views/JoinMatchHandler/JoinMatchHandler.jsx";
import AllMatches from "./views/AllMatches/AllMatches.jsx";
import AdminForm from "./views/AdminForm/AdminForm.jsx";
import AllUsers from "./views/AllUsers/AllUsers.jsx";

function App() {
  const pagesWithoutHorizontalNavbar = ["/main-page"];
  const location = useLocation();
  const hideHorizontalNavbar = pagesWithoutHorizontalNavbar.includes(location.pathname);
  
  return (
    <>
      {!hideHorizontalNavbar && <HorizontalNavbar/>}
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/main-page" element={<MainPageLoader/>}/>
        <Route path="/how-to-play" element={<How_to_play/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-match" element={<CreateMatchHandler/>}/>
        <Route path="/join-match" element={<JoinMatchHandler/>}/>
        <Route path="/all-matches" element={<AllMatches/>}/>
        <Route path="/admin" element={<AdminForm/>}/>
        <Route path="/all-users" element={<AllUsers/>}/>
      </Routes>
    </>
  );
}

export default App
