function ajax_get(url,callback){


		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){

			if(xmlhttp.readyState == 4 && xmlhttp.status ==200){
				console.log('responseText: ' + xmlhttp.responseText );

					try{

						var data = JSON.parse(xmlhttp.responseText);
						} catch (err) {
						console.log(err.message + "" );
						return;

					}

						callback(data);
			}

	

		}
			xmlhttp.open("GET",url,true);


			xmlhttp.send();
	}


	function callbackresult(data) {
		// alert(data);
		document.getElementById("result").innerHTML = "";

			document.getElementById("result").innerHTML +=
  					
			"<li> Location : " + data.query.results.channel.location.city + "</li>"+"<br>"+
			"<li> Region : " + data.query.results.channel.location.region + "</li>"+"<br>"+
			"<li> Country : " + data.query.results.channel.location.country + "</li>"+"<br>"+
			"<li> Humidity : " + data.query.results.channel.atmosphere.humidity + "</li>"+"<br>"+
			"<li> Rising : " + data.query.results.channel.atmosphere.rising + "</li>"+"<br>"+
			"<li> Visibity : " + data.query.results.channel.atmosphere.visibility + "</li>"+"<br>"+
			"<li> Sunrise : " + data.query.results.channel.astronomy.sunrise + "</li>"+"<br>"+
			"<li> Sunset : " + data.query.results.channel.astronomy.sunset + "</li>"+"<br>"+
			"<br>";
			

			var forecast = data.query.results.channel.item.forecast;
			console.log(forecast[1]);
			document.getElementById("frc").innerHTML = " ";

			   for(var i = 0; i < 3; i++) {
			   			
				    	document.getElementById("frc").innerHTML +=
				    	 
				        "<td><h2>" + forecast[i].day +" "+forecast[i].date  +  "</h2>" +
				        "<p>Highest Temp: " + toCels(forecast[i].high) + 
				        "<br/> Lowest Temp: " + toCels(forecast[i].low) + "</p>" +
				        "<p>Sky information: " + forecast[i].text + "</p>" +
				        "</td>";
    }
		
  	
}

		function toCels(temp) {
   			 temp = parseInt(temp);
    		temp = ( temp - 32 ) / 1.8;
    		return Math.round(temp);
		}

		var but = document.getElementById("submit"); 

		but.onclick = function() {
			var loc = document.getElementById("location").value;

 		var chadi = "SELECT * FROM weather.forecast WHERE woeid IN";
        chadi += "(SELECT woeid FROM geo.places(1) WHERE text='" + loc + "')";
		ajax_get("https://query.yahooapis.com/v1/public/yql?q=" + chadi + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", callbackresult);

		}