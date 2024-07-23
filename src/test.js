if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(function(position){
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        
    });
        
    }
else{
    console.log("Geolocation is not supported by this browser.");
}

