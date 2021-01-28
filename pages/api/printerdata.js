export default async (req, res) => {
    const address = "http://" + process.env.OP_SETTINGS.IP + ":" + process.env.OP_SETTINGS.PORT + "/api/job";
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
    res.status(200).json(data);
}