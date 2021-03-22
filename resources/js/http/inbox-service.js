import axios from 'axios'

export default {
    async all() {
        const response = await axios.get('/api/v1/mails')
        return response.data
    },

    async create(email) {
        const response = await axios.post('/api/v1/mails', email)
        return response.data
    }
}
