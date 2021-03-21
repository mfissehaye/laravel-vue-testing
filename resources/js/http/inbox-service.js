import axios from 'axios'

export default {
    async all() {
        const response = await axios.get('/inbox')
        return response.data
    }
}
