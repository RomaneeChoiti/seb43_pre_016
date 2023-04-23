import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LogoutHeader from "./components/header/LogoutHeader";
import LoginHeader from "./components/header/LoginHeader";
import Questions from "./components/Questions";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Askquestions from "./components/Askquestions";
import QuestionDetail from "./components/QuestionDetail";
import ScrollToTop from "./components/ScrollTop";
import axios from "axios";
import Login from "./components/Login";
import Mypage from "./components/Mypage";
import QuestionEdit from "./components/QuestionEdit";
import { useCookies } from "react-cookie";

function App() {
  //우선 Api를 이용하여 데이터를 받아왔지만 추후에 데이터가 만들어지면 아래 코드를 변경할 예정
  const [listData, setListData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const data = () => {
    axios
      .get("http://localhost:8080/questions")
      .then((res) => {
        setListData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    data();
  }, []);

  return (
    //container가 필요한 곳은 메인 페이지(질문 리스트 페이지), 질문 상세 페이지, tags 페이지, user 페이지, myPage 페이지 이다.
    <div className="App">
      <ScrollToTop />
      {cookies.accessToken ? (
        <LoginHeader removeCookie={removeCookie} />
      ) : (
        <LogoutHeader />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Sidebar />
              <Questions listData={listData} cookies={cookies} />
            </div>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <div className="container">
              <Sidebar />
              <QuestionDetail />
            </div>
          }
        ></Route>
        <Route
          path="questions/:id/edit"
          element={
            <div className="container">
              <Sidebar />
              <QuestionEdit />
            </div>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <div className="container">
              <Sidebar />
              {/* <Searchpage/> */}
            </div>
          }
        ></Route>
        <Route
          path="/users/id/userName"
          element={
            <div className="container">
              <Sidebar />
              <Mypage />
            </div>
          }
        ></Route>
        <Route path="/questions/ask" element={<Askquestions />}></Route>
        <Route path="/users/login" element={<Login />}></Route>
        <Route path="/users/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
