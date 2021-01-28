export default async (req, res) => {

    const op_settings = JSON.parse(process.env.OP_SETTINGS);

    const address = "http://" + op_settings.IP + ":" + op_settings.PORT + "/api/job";
    
    console.log(address)
    const ans = await fetch(address, 
    {
        headers: {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7',
        'Content-Type': 'application/json',
        "X-Api-Key": op_settings.API_KEY
        }
        
    })

    const data = await ans.json();
    res.status(200).json(data);
}