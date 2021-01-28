import fs from 'fs';
import path from 'path';

export default async (req, res) => {
    const address = "http://" + process.env.OP_SETTINGS.IP + ":" + process.env.OP_SETTINGS.PORT + "/api/timelapse";
    const API_KEY = process.env.OP_SETTINGS.APIKEY
    const ans = await fetch(address, 
    {
        headers: {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7',
        'Content-Type': 'application/json',
        "X-Api-Key": API_KEY
        }
        
    })

    const data = await ans.json();

    let newFiles = [];

    data.files.forEach(file => {
        let path_file = path.resolve(file.name)
        if(path.extname(path_file).toLowerCase() === ".mp4") {
            let newfile = file;

            newfile.name = path.basename(path_file);
            newfile.url = "/files/timelapses/" + path.basename(path_file);

            newFiles.push(newfile);
        }
    });

    res.status(200).json(newFiles);


    /*if(!fs.existsSync(tl_path)) {
        console.log(tl_path);
        console.log("No such path");
        res.status(500);
    }
    else {

        let files = fs.readdirSync(tl_path);
        var targetFiles = files.filter(function(file) {
            return path.extname(file).toLowerCase() === ".mp4";
        });


        res.status(200).json(targetFiles);
    }
    */
}