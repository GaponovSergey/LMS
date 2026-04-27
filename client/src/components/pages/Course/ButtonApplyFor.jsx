import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyForCourse, withdrawCourseApplication, fetchApplicationStatus } from "../../../store/applySlice";
import "./buttonApply.css";


export default function ButtonApplyFor({courseId = null}) {

    const dispatch = useDispatch();
    const {appliedStatus }= useSelector( state => state.apply );
    const userId = useSelector( state => state.user.account.id)

    useEffect( ()=> {
        if (courseId && userId) {
            dispatch(fetchApplicationStatus({courseId}))
        }
        
    }, [userId, courseId])

    return(
        <>
            <div>{appliedStatus === "pending" && 
                <p className={"apply-button-status"}>Ваша заявка находится на рассмотрении</p>
            }</div>
            <div>
            {!appliedStatus ? 
                <button className={"apply-button apply-button-send"} onClick={()=> dispatch(applyForCourse({courseId}))}>Подать заявку</button> : 
                <button className={"apply-button apply-button-withdraw"} onClick={()=> dispatch(withdrawCourseApplication({courseId}))}>Отозвать заявку</button> 
            }</div>
        </>
    )
}