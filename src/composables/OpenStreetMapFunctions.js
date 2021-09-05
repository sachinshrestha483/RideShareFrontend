import axios from "axios";

const OpenStreetMapFunctions = () => {
  const getNames = async (name) => {
    let res = {data:[]};
    await axios
      .get(
        "https://nominatim.openstreetmap.org/search?q=" + name + "&format=json"
      )
      .then(function(response) {
        // handle success
        res = response;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return res.data;
  };

  return { getNames };
};

export default OpenStreetMapFunctions;
