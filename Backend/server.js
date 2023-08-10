const http=require('http')
const port=3001
const server=http.createServer(function(req,res){
    res.write('Rohan Maganahalli')
    res.end()
})
server.listen(port,function(error){
    if(error){
        console.log('Something went wrong',error)
    }else{
        console.log('Server is listening to port '+port)
    }
})