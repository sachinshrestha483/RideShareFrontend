import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";
import HttpResponseObject from "@/utility/objects/HttpResponseObject";
import { pathDistance } from "@/composables/RideFunctions"
import UtilityFunctions from "@/utility/UtilityFunctions";
import UtilityData from "@/utility/UtilityData"
const getDistanceofOverlappingPointsFromInitalPoint = async (latlnglist, startIndex, endIndex) => {


    const { GetDistanceinKmfromMeter, GetHumanReadabledate } = UtilityFunctions();
    var actualtoOverlappingInitialPointlengthresponse = await pathDistance({ path: JSON.stringify(latlnglist.slice(0, startIndex + 1)) });
    var actualtoOverlappingFinalPointlengthresponse = await pathDistance({ path: JSON.stringify(latlnglist.slice(0, endIndex + 1)) });

    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")

    console.log("start Index :"+ startIndex)
    console.log("end Index :"+ endIndex)


    console.log("actualtoOverlappingFinalPointlengthresponse")
    console.log(actualtoOverlappingFinalPointlengthresponse);
    console.log(actualtoOverlappingInitialPointlengthresponse);


    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")

    if (actualtoOverlappingInitialPointlengthresponse.haveError || actualtoOverlappingFinalPointlengthresponse.haveError) {
        return { isCalculated: false }
    }

    return {
        isCalculated: true, distanceofOvpInitialPointfromInitalPoint: actualtoOverlappingInitialPointlengthresponse.responseObject.distance
        , distanceofOvpInitialPointfromFinalPoint: actualtoOverlappingFinalPointlengthresponse.responseObject.distance
    }
};


const getDateForReachingOverlappingRideInitalAndFinalPoint = async (ridestartDate, latlngList, overlappingStartIndex, overlappingEndIndex) => {

    let distaceofOverlaiingPointsPoint = await getDistanceofOverlappingPointsFromInitalPoint( latlngList, overlappingStartIndex, overlappingEndIndex);

    if (!distaceofOverlaiingPointsPoint.isCalculated) {
        return { isCalculated: false }
    }
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
console.log("distance of Overlapping Point")
    console.log(distaceofOverlaiingPointsPoint);

    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")


    let timeToReachinitalPointinSec = (distaceofOverlaiingPointsPoint.distanceofOvpInitialPointfromInitalPoint / (UtilityData.averageSpeedinKmph / 3.6));
    let timeToReachFinalPointinSec = (distaceofOverlaiingPointsPoint.distanceofOvpInitialPointfromFinalPoint / (UtilityData.averageSpeedinKmph / 3.6));

    let initialPointDateTime = new Date(ridestartDate);
    let finalPonitDateTime = new Date(ridestartDate);

    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log("initial point date time and final point date time")

    console.log(initialPointDateTime);
    console.log(finalPonitDateTime);



    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")




    initialPointDateTime.setSeconds(
        initialPointDateTime.getSeconds() + timeToReachinitalPointinSec
    );

    finalPonitDateTime.setSeconds(
        finalPonitDateTime.getSeconds() + timeToReachFinalPointinSec
    );

    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log("initial point date time and final point date time")

    console.log(initialPointDateTime);
    console.log(finalPonitDateTime);



    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")
    console.log(" 😊 😊 😊 😊 😊 😊 😊 It is Here as it is Present Here  😊 😊 😊 😊 😊 ")



    return { isCalculated: true, intialPointDateTime: initialPointDateTime, finalPointDateTime: finalPonitDateTime };
}

export  { getDistanceofOverlappingPointsFromInitalPoint, getDateForReachingOverlappingRideInitalAndFinalPoint };
