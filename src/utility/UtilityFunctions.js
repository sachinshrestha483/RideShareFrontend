import Urls from "@/utility/IdentitySection/Urls";
import axios from "axios";
import Store from "../store/index";

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
    return { GetDateString, GetDateTimeString,GetUtcDateTime };
};

// 2018-06-12T19:30
export default UtilityFunctions;
