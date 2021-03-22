import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'

extend('required', required)
const register = (localVue) => {
    localVue.component('validation-observer', ValidationObserver)
    localVue.component('validation-provider', ValidationProvider)
}

// exporting for the test util
export {
    register
}
