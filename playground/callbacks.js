var getUser = (id, callback) => {
    user = {
      id: id,
      name: "Corduroy"
    };
    setTimeout(() => {
      callback(user);
    }, 3000);
  };
  
  getUser(2, (userObject) => {
    console.log(userObject);
  });