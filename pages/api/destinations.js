// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { baseUrl } from './../../repositories/Repository';
import axios from 'axios';
import fsPromises from 'fs/promises';
import path from 'path';
const destinationsFilePath = path.join(process.cwd(), 'json/destinations.json');


export default async function handler(req, res) {
  const response = await axios.get(`${baseUrl}/fetch-destinations`);
  if(response.data.success){
      const updatedData = JSON.stringify(response.data.data.destinations);
      await fsPromises.writeFile(destinationsFilePath, updatedData);
  }
}
