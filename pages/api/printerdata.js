export default async (req, res) => {

    const ans = await fetch(`http://192.168.0.122:8081/api/job`, 
    {
        headers: {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7',
        'Content-Type': 'application/json',
        "X-Api-Key": "BD86451B85D3458FA21FA8291188D4B0"
        }
    })
    const data = await ans.json();


    res.status(200).json(data);
}