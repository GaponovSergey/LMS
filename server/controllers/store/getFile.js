import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import errorHandler from "../../models/errorHandler.js";


export default function getFile(req, res) {

    try {
        const {user, file} = req.params;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const filePath = join(__dirname, "/../../", "/store/", user, file);
        const fileStream = fs.createReadStream(filePath, {highWaterMark: 65000});
        fileStream.on("data", (сhunk)=> {

            console.log(сhunk.length)
        })
        fileStream.pipe(res); 
    } catch(err) {
        errorHandler(req, res, err)
    }

       
}