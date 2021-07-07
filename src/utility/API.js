import config from "config/AWSConfig";
import { Auth } from "aws-amplify";
import axios from 'axios';

const API = {

    getAllEvents: async () => {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        const i = axios.create({
            baseURL: config.apiGateway.URL,
            headers: { 'token': token },
        });
        
        const res = await i.get('/events')
        return res.data;
    },

    viewEvent: async (eventId) => {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        const i = axios.create({
            baseURL: config.apiGateway.URL,
            headers: { 'token': token },
        });

        const res = await i.get(`/event/${eventId}`);
        return res.data;
    },

    updateEvent: async (eventId) => {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        const i = axios.create({
            baseURL: config.apiGateway.URL,
            headers: { 'token': token },
        });

        const res = await i.put(`/event/${eventId}`);
        return res.data;
    },

    deleteEvent: async (eventId) => {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        const i = axios.create({
            baseURL: config.apiGateway.URL,
            headers: { 'token': token },
        });

        const res = await i.delete(`/event/${eventId}`)
        return res.data;
    }, 

    addEvent: async (title, date, id) => {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        let data = {};
        data.eventTitle = title;
        data.eventDate = date;
        data.eventId = id;
        const i = axios.create({
            baseURL: config.apiGateway.URL,
            headers: { 'token': token },
        });

        const res = await i.post(`/event`, data)
        return res.data;
    },

}
export default API