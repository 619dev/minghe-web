import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
http.createServer(async (req,res)=>{try {const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const relative=name==='/'?'index.html':name.replace(/^\/+/, '');if(relative.split('/').includes('..'))throw Error();let file=path.join(root,relative);if(relative==='tantuns-h5.png')file=path.join(root,'public',relative);const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(Number(process.env.PORT)||3000,'127.0.0.1',()=>console.log('Local: http://localhost:3000'));
