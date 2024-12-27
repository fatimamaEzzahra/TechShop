import axios from 'lib/axios'

export const useAuth = () => {

    const csrf = () => axios.get('/sanctum/csrf-cookie');

}