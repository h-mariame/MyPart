var userlng;
var useralt;
var tinyUrl;

function test(){
    alert ("on m'a appelé de l'autre fichier");

}

function AfficherCarte(alt,lng,who){
    var latlng = new google.maps.LatLng(alt, lng);
        
        // Ansi que des options pour la carte, centrée sur latlng
        var optionsGmaps = {
            center:latlng,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15
        };
        if (who==1)var map = new google.maps.Map(document.getElementById("Userposition"), optionsGmaps);
        else if (who==2)var map = new google.maps.Map(document.getElementById("FriendPosition"), optionsGmaps);

        // Ajout d'un marqueur à la position trouvée
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title:"Vous êtes ici"
        });
        map.panTo(latlng);    
}
function LocaliserMoi(position){

    if(navigator.geolocation) {

        function affichePosition(position) 
        {
            var userlng=position.coords.longitude;
            var useralt=position.coords.latitude;
            var who=1; //pour faire la distinction entre localiser user et localiser ami
            //*
            alert("test acdf");
            tinyUrl="www.imhere/2";
            alert(tinyUrl);
            
            document.getElementById("tinyurluser").value=tinyUrl;
            AfficherCarte(useralt,userlng,who);
        }

        // Fonction de callback en cas d’erreur    
        function erreurPosition(error) { }
            navigator.geolocation.getCurrentPosition(affichePosition,erreurPosition); 
    }      
}

function LocaliserAmi(alt,lng){
    // il faut ajouter l'appel du web service pour récupérer lng et alt de l'ami'
    //var alt=45.449809;
    //var lng=4.388788;    
    alert("tes coordonnées recu : ",alt,lng);
    var who=2;
    AfficherCarte(alt,lng,who);
}

function cord(lat,lon){
    useralt=lat;
    userlng=lon;
}

// Ici la fonction CalculerItin() final recevra en parametre les coordonnées obtenus grace à l'appel du web service
//donc elle ressemblera à CalculerItin(Calt,Clng) par exemple
function CalculerItin(){
   
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(handlePosition);
    /* function handlePosition(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            cord(lat,lon);
        } */    	
    }
    
    function handlePosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        cord(lat,lon);
        itt();
    }
       
    function itt(){
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var maPosition = new google.maps.LatLng(useralt,userlng);
        var taPosition = new google.maps.LatLng(50.600946,3.039724);
  
        var myOptions = {
            zoom : 15,
            center : maPosition,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
    
        var request = {
            origin : maPosition,
            destination : taPosition,
            travelMode : google.maps.DirectionsTravelMode.WALKING
        };
        
        var map;
        map = new google.maps.Map(document.getElementById("FrienItinerary"),myOptions);
        directionsDisplay.setMap(map);
    
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }
}    