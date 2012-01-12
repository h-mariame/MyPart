
function SeConnecter(){
    var NomUser=document.forms.seconnecterform.user.value;
    var Motdp=document.forms.seconnecterform.mdp.value;
    
    //alert(NomUser);
    //alert(Motdp);

    // appel Web service pour se connecter
    
    
    /*
    if (connection){
     // stocker l'Id de l'utilisateur en local
     
    }else alert ("Nom d'utilisateur ou mot de passe incorrect!");
   //*/   
}
function Whereareyou(){
    var tiny = document.forms.menuform.cpwd.value;
    
    // coder ici le web service"utilisateur LirePosition(String tiny)"qui recupère la longitude et la latitude à partir du tiny url
    
    // Ici on affecte au variable alt et lng les valeurs recuperées grace au web service
    //var alt=;
    // var lng=;
    
    var alt=45.424987;
    var lng=4.390197;
    
    LocaliserAmi(alt,lng);    
}
/*
function VerifierMdp(){ // methode de verification de mdp saisie lors de la creation d'un compte'
    var mdp = document.forms.newuserform.pwd.value;
    var cmdp= document.forms.newuserform.cpwd.value;
    if (mdp==cmdp)return true;
    else return false;
}

function EcrireBDD()
{
    if(VerifierMdp()) {
        var pseudo =document.forms.newuserform.username.value;
        //Ecrire nom et mot de passe dans la bdd appel web service
        /*
        if (true){    
            alert("L'utilisateur a été cree");
            return true;
        }else return false;
   //
        alert("L'utilisateur a été cree");
        return true;
    }
    else {
        alert("La confirmation du mot de passe n'est pas correct!! ");
        return false;        
    }
}
*/

function SeDeconnecter(){
    // récupérer l'id de l'utilisateur
    
    // appelé web service pour changé état de l'utilisateur
    
    // supprimer l'id de l'utilisateur du local storage
    
    alert("Déconnection");
}
/*
function LocaliserMoi(){
    if (GBrowserIsCompatible()){
        //instancier une map ou on doit afficher la localisation de l'utilisateur
	var mapUser = document.getElementById("Userposition");
        var m = new GMap2(mapUser);
	m.setCenter(new GLatLng(45.449809,4.388788),13); // centrer la carte sur : l'attitude, longitude et zoom 
        m.openInfoWindow(m.getCenter(),document.createTextNode("TSE"));
        
        //window.open('#carte','Ma position','')
				
	/* instancier une map ou on affiche la localisation d'un(e) ami(e)
	var mapFriend = document.getElementById("Friendmap");
	var m2 = new GMap2(mapFriend);
	*/				
	//m.setMapType(G_SATELLITE_MAP); d�finir une vue satellite
				
	/* ajouter les barre de zoom	
	var c= new GMapTypeControl();
	m.addControl(c);
	m.addControl(new GLargeMapControl());
	*			
    }
    else{
        alert("Please upgrade your browser! ");
    }
}*/



 var ImhereApp = (function(){
	var App = {
		stores: {},
		views: {}
	};
	
	//Initialize localStorage Data Store
	App.stores.UserAccount= new Store('UserAccount');
	
	// Signup User Model
	
	var Registration = Backbone.Model.extend({
	
		//use localStorage datasotre
		localStorage: App.stores.UserAccount,
		
		// Didn't try yet to think about the initialize function
		
		initialize:function(){
			if (!this.get('username')){
				this.set({username:"username @"+ Date()})
			};
			if (!this.get('pwd')){
				this.set({pwd:"No content"})
			};
		}
	});
	
	// User collection
	
	var UsersList= Backbone.Collection.extend({
		//this collection is composed of Signup objects
		model: Registration,
		//Set the localStorage datastore
		localStorage: App.stores.UserAccount,
		initialize: function(){
			var collection=this;
			
			//when localStorage updates, fetch data from the store
			
			this.localStorage.bind('update', function (){
			 //fetch the collection
			collection.fetch();
			})
		}
	});
	// note view
	var NewFormView = Backbone.View.extend({
		events:{
			"submit form":"createUser"
		},
		createUser: function(event){
		
			var attrs=this.getAttributes();
			var userAccount = new Registration();
			
			userAccount.set(attrs);
			userAccount.save();
			
			if (!this.validate(attrs)){
			
				console.log(attrs);
				alert("Confirmation du mot de passe incorrect! ");
				event.preventDefault();
				event.stopPropagation();
				
			}
			
			// stop browser from submitting the form (or following links)
			//event.preventDefault();
			
			//stop jQuery Mobile from doing its form magic
			//event.stopPropagation();
			
			//close dialog
			//$('.ui-dialog').dialog('close');
			//this.reset();
		},
	
		getAttributes: function(){
			return{
				username: this.$('form [name="username"]').val(),
				pwd: this.$('form [name="pwd"]').val(),
				cpwd: this.$('form [name="cpwd"]').val(),
			}
		},
		reset: function(){
			this.$('input, textarea').val('');
		},

	
	validate: function(attrs){
			console.log(attrs);
			if (attrs.pwd == attrs.cpwd) return true;
			else return false;
			}
	});
	
	$(document).ready(function(){
		App.views.new_form = new NewFormView({
			el: $("div#signup")
		});
		
	});
	
	window.Registration=Registration;
	return App;

})();
