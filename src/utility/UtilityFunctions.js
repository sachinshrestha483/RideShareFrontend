import Urls from "@/utility/IdentitySection/Urls";
import axios from "axios";
import Store from "../store/index";
import * as moment from "moment";


const UtilityFunctions = () => {

    const GetDateString = (birthday) => {
        return birthday.getFullYear() + '-' + ('0' + (birthday.getMonth() + 1)).slice(-2) + '-' + ('0' + birthday.getDate()).slice(-2)
    };
    const GetDateTimeString = (birthday) => {
        return birthday.getFullYear() + '-' + ('0' + (birthday.getMonth() + 1)).slice(-2) + '-' + ('0' + birthday.getDate()).slice(-2) + "T" + ('0' + (birthday.getHours())).slice(-2) + ":" + ('0' + (birthday.getMinutes())).slice(-2)
    }
    const GetUtcDateTime = (dateTime) => {
        return dateTime.toISOString();
    }

    const GetDistanceinKmfromMeter=(val)=>{
        return (val/1000);
    }

    const GetHumanReadabledate=(date)=>{
        return moment(new Date(date)).format('MMMM Do YYYY, h:mm a')
    }


    
 return { GetDateString, GetDateTimeString,GetUtcDateTime,GetDistanceinKmfromMeter,GetHumanReadabledate };
};

// 2018-06-12T19:30
export default UtilityFunctions;
