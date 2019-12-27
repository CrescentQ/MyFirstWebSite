const request = require("request")

var location = "Ha noi";
var positionUrl = "http://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?access_token=pk.eyJ1IjoiaXZhci10aGUtYm9uZWxlc3MiLCJhIjoiY2s0bndmemllMmJsMTNrbGI2emcxMmhtbiJ9.yBZkJ74peyBqnkjbCAm2ng"
request(positionUrl, function(err,res){
    if(!err && res.statusCode==200){
        var bodyJson = JSON.parse(res.body);
    var longitude = bodyJson.features[0].center[0];
    var latitude = bodyJson.features[0].center[1];
    console.log(latitude);
    console.log(longitude);
    var url = "https://api.darksky.net/forecast/7a318006fd1bad724994531d8af686d5/"+latitude+","+longitude+"?units=si"
console.log(url)
request(url,function(err, res){
    var data = JSON.parse(res.body)
    console.log(data.currently.summary +" Nhiet do hien tai: "+ data.currently.temperature)
})

}
else console.log("something bad happend");
});
    



