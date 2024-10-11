import pool from "@/lib/mysql";

export default async function handler(req,res) {
    try {
        const db = await pool.getConnection();
        let bodyRequest = req.body;
        let body = JSON.parse(bodyRequest);
        let dest = body.destination;
        const query = 'select id,destination_id,city_name,state_province from destinations where city_name like "%'+dest+'%"';
        const values = [body.destination];
        const[results] = await db.execute(query);
        const resultArray = new Array();
        results.forEach((item) => {
            var object = {'label':item.city_name+ ', '+item.state_province,'id':item.destination_id};
            resultArray.push(object);
        });
        db.release();        
        return res.status(200).json(resultArray);
    } catch (error) {
       return res.status(500).json(error);
    }
}