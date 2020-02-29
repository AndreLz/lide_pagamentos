
const helpers = {
    ddMMyyyy: (data) => new Date(data).toLocaleDateString("pt-BR")


}

export default {
    install: function (Vue, name = '$helpers') {
        Object.defineProperty(Vue.prototype, name, { value: helpers });
        //Vue.prototype.$parse = parse;
    }
}