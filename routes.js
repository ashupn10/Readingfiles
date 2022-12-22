const fs=require('fs');

const functionhandler=(req,res)=>{
    res.setHeader('Content-Type','text/html');
    if(req.url=='/'){
        const data=fs.readFileSync('message.txt');
        res.write(`<p>${data}</p>`)
        res.write('<form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">send</button></form>');
        return res.end();
    }
    if(req.url==='/message'&& req.method==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        req.on('end',()=>{
            const item=Buffer.concat(body).toString();
            const message=item.split('=')[1];
            console.log(message);
            fs.writeFileSync('message.txt',message);
        })
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.write('<h1>Hello from the node js server</h1>');
    res.end();
}
module.exports.handler=functionhandler;