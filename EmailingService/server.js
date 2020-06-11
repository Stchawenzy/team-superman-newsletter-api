const http=require('http');
const app=require('./src/app');

const port=process.env.port || 11001;

const server=http.createServer(app);

server.listen(port, () => {
    console.log(`running on port ${port}`);
    console.log("--------------------------");
    }
);