const successAlert = (message) => {
    iziToast.success({
        title: 'OK',
        message: message,
    });
};

const errorAlert=(message)=>{

    iziToast.error({
        title: 'Error',
        message: message,
    });
}


export { successAlert ,errorAlert};

