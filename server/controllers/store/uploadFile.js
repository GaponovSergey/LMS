import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


export default function uploadFile(req, res) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, "/../../", "/store/", req.params.user, req.headers["x-file-id"]);
    const fileStream = fs.createWriteStream(filePath, {flags: 'a'} );
    req.on("data", ()=> {

        console.log(89)
    })
    req.pipe(fileStream);

    

    fileStream.on("close", ()=> {

        res.end();
    })
    
}