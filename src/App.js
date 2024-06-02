// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Home';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import Login from './Login';
import Courses from './Courses';
import CourseDetails from './CourseDetails'; // Import the CourseDetails component
import LessonDetails from './LessonDetails';
import AssignmentDetails from './AssignmentDetails';
import Quizzes from './quizzes';
export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Smart-Education-Platform" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/:id/lessons/:id" element={<LessonDetails />} />
        <Route path="/assignment/:id" element={<AssignmentDetails />} />
        <Route path="/courses/:id/quizzes/:id" element={<Quizzes />} />

      </Routes>
      <Footer />
    </div>

  );
}


/////nested Route //////// ولعرض محتوى صفحة داخلية اقوم باستيرد Outlet
/* <Route path="/login" element={<sd />} >
    <Route path="/login" element={<Login />} />

</Route> */
// import { Outlet } from "react-router-dom";
/* <outlet /> */
/////////////////////

// const [data, setData] = useState([]);

// useEffect(() => {
//   fetch("https://api.imgflip.com/get_memes")
//     .then((res) => res.json())
//     .then((data) => setData(data.data.memes.map((el) => el.name)))
//     .catch((error) => console.error("Error fetching data:", error));
// }, []);

// const dataToShow = data.map((item, index) => (
//   <Cards key={index} name={item} />
// ));


// return <div>{dataToShow}</div>;


////////////
// const datashow = data.map((el, index) => <Cards key={index} img={el.img} country={el.country} dec={el.dec}
// reivew={el.reivew} price={el.price} />);
// return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
//         {datashow}
//     </div>
// );



//////Form ////////////////////////////
// const [first, functionFirst] = useState("");

// return (
//     <div>
//         <form>
//             <label htmlFor='1'>First</label>
//             <input type='text' id="1" placeholder='first' value={first} required onChange={(e) => functionFirst(e.target.value)} />
//             <label htmlFor='2'>last</label>
//             <input type='text' id="2" required />
//             <label htmlFor='3'>Email</label>
//             <input type='email' id="3" required />
//             <button type='submit'>Send</button>
//         </form>
//     </div>
// );