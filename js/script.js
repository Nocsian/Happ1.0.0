var latitud;
var longitud;

function menu(){
	var c = document.getElementById('contenedor');
	var m = document.getElementById('menu');
	if (c.className == 'contenedorFull') {
		c.className = 'contenedorSemi';
		m.className = 'menuA';
	}else{
		c.className = 'contenedorFull';
		m.className = 'menuC';
	}
}

function menuOp(op){
  carga('cargando.html','top');

  if (op == 1) {
  	carga('solicitarAyuda.html','top');
  }
  if (op == 2) {
  	carga('prestarAyuda.html','top');
	listar();
  }
}

function carga(url,id){
	var pagecnx = createXMLHttpRequest();
	pagecnx.onreadystatechange=function(){
	  if (pagecnx.readyState == 4 && (pagecnx.status==200 || window.location.href.indexOf("http")==-1))
		 document.getElementById(id).innerHTML=pagecnx.responseText;
	  }
	  pagecnx.open('GET',url,true)
	  pagecnx.send(null)
}
 
function createXMLHttpRequest(){
var xmlHttp=null;
if (window.ActiveXObject) xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
else if (window.XMLHttpRequest)
	     xmlHttp = new XMLHttpRequest();
return xmlHttp;
}


function clickGPS()
{
  navigator.geolocation.getCurrentPosition(onSuccessMiGps, onErrorMiGps);

}

function onSuccessMiGps(posicion)
{
		  latitud=posicion.coords.latitude;
		  longitud=posicion.coords.longitude;
		  dbins_happ();
}

function onErrorMiGps(error) 
{
        alert('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
}

function dbins_happ(){
				
	var idusuario=Math.floor((Math.random() * 100) + 1);
	var fecha="12/10/2016";
	var descripcion=$("#tbxSolicitud").val();
	var id_categoria=$("#cbxCategoria").val();
	var id_subCategoria=$("#cbxSubCategoria").val();
		
	var dataString="idusuario="+idusuario+"&latitud="+latitud+"&longitud="+longitud+"&fecha="+fecha+"&descripcion="+descripcion+"&id_categoria="+id_categoria+"&id_subCategoria="+id_subCategoria+"&insert=";

		if($.trim(latitud).length>0 & $.trim(longitud).length>0 & $.trim(descripcion).length>0){		
			$.ajax({
			type: "POST",
			url:"http://concienciati.com/php/insert_happ.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			success: function(data){
				if(data=="success"){		
					alert("inserted");
				}
				 else if(data=="error"){	
					alert("error");
				}
			 }
			 });
		}else{
			alert("Error Cod.405");
		}
		
		return false;

}

function listar(){
	var error=0;
	
	$.ajax({
		url: "http://concienciati.com/php/prestarAyuda.php",
		type: "POST",
		crossDomain: true,
		cache: false,
		data:{ 
			accion:"listar_solicitudes"
		},
		success: function(data){
				
				jQuery("#listviewHapp").append(data);
				
			}	
		});
	if(error == 1){
		return false;
	}else{
		return true;
	}
	
	
}



