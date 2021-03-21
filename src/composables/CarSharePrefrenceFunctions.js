import Urls from "@/utility/IdentitySection/Urls";
import axios from "axios";
import Store from "../store/index";

const CarSharePrefrence = () => {
  const getCarSharePrefrence = async () => {
    let carSharePrefrences = [];
    await axios
      .get(Urls.GetTravelPrefrences)
      .then(function(response) {
        // handle success
        console.log(response);
        carSharePrefrences = response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
    return carSharePrefrences;
  };

  const getSubCarSharePrefrenceById = async (id) => {
    let subcarSharePrefrences = [];

    await axios
      .get(Urls.GetSubtravelPrefrencesById + id)
      .then(function(response) {
        // handle success
        console.log(response);
        subcarSharePrefrences = response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
    return subcarSharePrefrences;
  };

  const AddCarSharePrefrence = async (name) => {
    let res = false;

    await axios
      .post(Urls.AddTravelPrefrences, {
        name: name,
        show: true
      })
      .then(function(response) {
        console.log(response);
        res = true;
      })
      .catch(function(error) {
        console.log(error);
      });

    return res;
  };

  const getAllSubCarPrefrences = async () => {
    let subcarSharePrefrences = [];

    await axios
      .get(Urls.GetAllSubtravelPrefrences)
      .then(function(response) {
        // handle success
        console.log("dwdwdwdwdwd");
        console.log(response);
        subcarSharePrefrences = response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });

    return subcarSharePrefrences;
  };

  const AddSubCarSharePrefrence = async (name, travelPrefrenceId) => {
    let added = false;
    const subTravelPrefrecneObject = {
      id: 0,
      name: name,
      travelPrefrenceId: travelPrefrenceId,
      show: true

    };

    await axios
      .post(Urls.AddSubTravelPrefrences, subTravelPrefrecneObject)
      .then(function(response) {
        console.log(response);
        added = true;
      })
      .catch(function(error) {
        console.log(error);
      });

    return added;
  };

  const UpdateCarSharePrefrence = async (id, name,show) => {
    let updated = false;

    const updatedObject = {
      travelPrefrence: {
        id: id,
        name: name,
        show: show,

      },
    };
    await axios
      .post(Urls.UpdateAddTravelPrefrences, updatedObject)
      .then(function(response) {
        console.log(response);
        updated = true;
      })
      .catch(function(error) {
        console.log(error);
      });

    return updated;
  };

  const getTravelPrefrenceById = async (id) => {
    let travelPrefrence = null;
    await axios
      .get(Urls.GetTravelPrefrecneById + id)
      .then(function(response) {
        // handle success
        travelPrefrence = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });

    return travelPrefrence;
  };

  const UpdateSubCarSharePrefrences = async (id, name, travelPrefrenceId,show) => {
    // UpdateSubTravelPrefrences;

    let updated = null;

    var updatedObject = {
      subTravelPrefrenceDtoObj: {
        id: id,
        name: name,
        travelPrefrenceId: travelPrefrenceId,
        show: show,

      },
    };

    await axios
      .post(Urls.UpdateSubTravelPrefrences, updatedObject)
      .then(function(response) {
        console.log(response);
        updated = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    return updated;
  };


const getIndiSubCarSharePrefrenceById=async(id)=>{
let res=null;
await   axios.get( Urls.GetIndiSubTravelPrefrenceById+id)
    .then(function (response) {
      // handle success
      console.log(response);
      res=response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  return res;

}


const GetSubTravelPrefrenceofUserofTravelPrefrence=async(id)=>{
let res=null;
 await  axios.get(Urls.GetUserTravelPrefrencyByTravelPrefrenceId+id)
  .then(function (response) {
    // handle success
    res= response.data.subTravelPrefrenceId;
    console.log(response);
    console.log(response.data.id)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  return res;

}


const AddUserCareSharePrefrence=async(subTravelPrefrenceId)=>{
  await   axios.post(Urls.AddUserTravelPrefrence, {
    id: 0,
    userId: 0,//set dummy value here as it would set there 
    subTravelPrefrenceId: subTravelPrefrenceId
  })
      .then(function (response) {
        console.log(response);
       
      })
      .catch(function (error) {
        console.log(error);
      });

}


const GetUserTravelPrefrences =async()=>{
//UserTravelPrefrences
let res=null;
await axios.get(Urls.UserTravelPrefrences)
  .then(function (response) {
    // handle success
    console.log(response);
res=response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
return res;
}



  return {
    getCarSharePrefrence,
    getSubCarSharePrefrenceById,
    AddCarSharePrefrence,
    getAllSubCarPrefrences,
    AddSubCarSharePrefrence,
    UpdateCarSharePrefrence,
    getTravelPrefrenceById,
    UpdateSubCarSharePrefrences,
    getIndiSubCarSharePrefrenceById,
    AddUserCareSharePrefrence,
    GetSubTravelPrefrenceofUserofTravelPrefrence,
    GetUserTravelPrefrences
  
  };
};

export default CarSharePrefrence;
