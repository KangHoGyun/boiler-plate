import React, { useEffect } from "react";
//import Axios from 'axios';
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";
export default function (SpecificComponent, option, adminRoute = null) {
  //option 중
  //null -> 아무나 출입이 가능한 페이지
  //true -> 로그인한 유저만 출입이 가능한 페이지
  //false -> 로그인한 유저는 출입 불가능한 페이지

  //adminRoute 중
  //true이면 관리자만 출입이 가능한 페이지
  //지금은 디폴트가 null로 해놓았다.

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login"); //로그인 하지 않았으면
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/"); // 관리자 페이지 들어가려할 때
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return withRouter(AuthenticationCheck);
}
