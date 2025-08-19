import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: `https://notes-server-qvfz.onrender.com`,
	headers: {
		'Content-Type': 'application/json',
	},
})
