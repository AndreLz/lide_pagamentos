import parse from 'parse';

//if (process.env.NODE_ENV === 'production') {
if (process.env.NODE_ENV !== 'development') {
    parse.initialize(
        "9kQDDQDoZ71udsbx5lpbMVeJiNB35zlwc6lwKzKd",
        "R9QBWQEOaSLzOSGdVcYBMgFyTst1WaSM7ecQydYx"
    );
    parse.serverURL = "https://lidesandbox.back4app.io";

} else {
    parse.initialize(
        "xXJL5MWBPATUGL28PN3T8e5LcIotlGk0O731bUKh",
        "RKI8zS9wv9nGFNJb0mG3keU6Lc1zRIUA1M4OCsPF"
    );
    parse.serverURL = "https://lide.back4app.io";

}




export default {
    install: function (Vue, name = '$parse') {
        Object.defineProperty(Vue.prototype, name, { value: parse });
        //Vue.prototype.$parse = parse;
    }
}