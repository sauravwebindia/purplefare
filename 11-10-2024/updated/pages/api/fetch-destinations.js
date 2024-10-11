// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fsPromises from 'fs/promises';
import path from 'path';
const destinationsFilePath = path.join(process.cwd(), 'json/destinations.json');


export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Read the existing data from the JSON file
    const jsonData = await fsPromises.readFile(destinationsFilePath);
    const objectData = JSON.parse(jsonData);
    res.status(200).json(objectData);
  }
}
