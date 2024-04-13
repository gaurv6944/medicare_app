import React, { useEffect } from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import { setUser } from "../redux/features/userSlice";

 const UserProfile = () => {
  //getDOc Details
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } 
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
   return (
    <Layout>
      <h1 className="user_profile">User Profile</h1>
    <div className="card">
       
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>IsAdmin: {user.isAdmin== false ? "No" : "YES"}</div>
        <div>IsDoctor: {user.isDoctor == false ? "No":"YES"}</div>
    </div>
    </Layout>
   
   )
 }
 
 export default UserProfile
 