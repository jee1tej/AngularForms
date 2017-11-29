var http = require("http");
var formidable = require("formidable");
var util = require("util");

var server = http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, x-Requested-With, Content-Type, Accept');

    if(req.method.toLowerCase() === 'post'){
        processForm(req, res);
        return;
    }

    if(req.method.toLowerCase() === 'get'){
        var data = {
            data : {
                languages : [
                    'Telugu',
                    'English',
                    'Kannada',
                    'Malayalam',
                    'Others'
                ]
            }
        };
        var responseData = JSON.stringify(data);
        console.log("Languages returned :" + responseData)
        res.end(responseData);
        return;
    }
    res.end();
});


function processForm(req , res){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err , fields) {

        fields.id = 'ABC123';

        res.writeHead(200, {
            'content-type' : 'text/plain'
        });

        let data = JSON.stringify({
            fields : fields
        });

        res.end(data);

        console.log("posted fields: ");
        console.log(data);
    });
}

var port = 3100;
server.listen(port);
console.log('Server is listening to port '+ port);