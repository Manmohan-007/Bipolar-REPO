import classes from "./Dashboard.module.css";
import React from "react";
import Latest from "../../components/DashboardComponents/chart.js/Latest";
import Performance from "../../components/DashboardComponents/chart.js/Performance";
import Storage from "../../components/DashboardComponents/chart.js/storage";
import Notification from "../../components/DashboardComponents/NotificationList/Notification";
import Order from "../../components/DashboardComponents/orderlist/order";
export default function DashBoard(props) {
  return (
    <div className={classes.DashBoardWrapper}>
      <p className={classes.heading}>Welcome back,</p>
      <div className={classes.charts}>
        <Order position={props.position} props={props} />
        <Latest />
        <Performance />
        <Storage />
        <Notification />
      </div>
    </div>
  );
}
