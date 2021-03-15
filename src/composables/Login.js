const login = async () => {
  const post = {
    name: id.value,
    password: password.value,
  };
await   axios
    .post(Urls.Authenticate, post)
    .then(function(response) {
      console.log(response);
      console.log("data");

      if (response.status != 200) {
        console.log("Error Occured");
      }
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    })
    .catch(function(error) {
      console.log(error);
    });
};
