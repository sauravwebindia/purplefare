import { baseUrl } from '@/repositories/Repository';
import axios from 'axios';
export default async function handler(req,res) {
    try {
        let bodyRequest = req.body;
        let body = JSON.parse(bodyRequest);        
        const responseData = await axios.post(`${baseUrl}/search-hotels`,body);
        console.log(responseData);
        let response = JSON.parse(responseData);
        return res.status(200).json(response);
    }catch (error) {
        return res.status(500).json(error);
     }
 }