import parse from 'parse';

//if (process.env.NODE_ENV === 'production') {
if (process.env.NODE_ENV === 'development') {
    // sandbox

    // conta antiga
    parse.initialize(
        "xXJL5MWBPATUGL28PN3T8e5LcIotlGk0O731bUKh",
        "RKI8zS9wv9nGFNJb0mG3keU6Lc1zRIUA1M4OCsPF"
    );

    //conta oficial
    // parse.initialize(
    //     "keQKgmMXbEOB9WZkeFyYPYi0fD3NVmnRoctYZGmU",
    //     "p2gMqA0AtVSpyiZ3c8CFbjnMn8JndVqe7dIv8Tvi"
    // );
    parse.serverURL = "https://parseapi.back4app.com";

} else {
     // conta antiga
     parse.initialize(
        "xXJL5MWBPATUGL28PN3T8e5LcIotlGk0O731bUKh",
        "RKI8zS9wv9nGFNJb0mG3keU6Lc1zRIUA1M4OCsPF"
    );
    // production conta oficial
    // parse.initialize(
    //     "KCgObmpYt2Qvup2XD9YOVjFA5Kglh6fAra6U3nyS",
    //     "Tmjk5im5qT6iKhalwKawh4rtAVpYc6wNY3v3m4Oo"
    // );
    parse.serverURL = "https://parseapi.back4app.com";
}

export default {
    install: function (Vue, name = '$parse') {
        Object.defineProperty(Vue.prototype, name, { value: parse });
        //Vue.prototype.$parse = parse;
    }
}