var busqueda = "";
$( ".formulario" ).submit(function( event ) {
	$(".informacion").empty();
	busqueda = $(".texto").val();
	$(".texto").val("");
	var service_url = 'https://www.googleapis.com/freebase/v1/search';
	var params = {
		'query': busqueda,
		//'filter': '(all type:/music/artist)',
		'limit': 10,
		'indent': true
	};

	$.getJSON(service_url + '?callback=?', params, function(response) {
		var numero = 0;
		$.each(response.result, function(i, result) {
			numero+=1;
			var obj = {text:result['name']}.text;
			var insertar = "<tr>"+"<td>"+numero+"<td>"+obj+"</td>"+"</tr>";
			$(".informacion").append(insertar);
		});
	});
	$('.check').prop('checked', false);
	$(".disable").slideUp("slow");
	event.preventDefault();

	
});

$('input[name="filtros"]').change(function(){
	$(".informacion").empty();
	var checkedEnable = []; //0,1,2
	var filterUrls = [" type:/music/", " type:/people/", " type:/book/"];
	var filterString = "";
	$("input[name=filtros]:checked").each(function(){
		checkedEnable.push(this.value);
	});
	if(checkedEnable.length==0){
		$(".disable").slideUp("slow");
	}else{
		$(".panel-heading").css("display","block");
		$(".panel-body").css("display","block");
		if(checkedEnable.indexOf("0")>=0){
			$(".subfilterMusic").slideDown("slow");
		}else{
			$(".subfilterMusic").slideUp("slow");
		};
		if(checkedEnable.indexOf("1")>=0){
			$(".subfilterPeople").slideDown("slow");
		}else{
			$(".subfilterPeople").slideUp("slow");
		};
		if(checkedEnable.indexOf("2")>=0){
			$(".subfilterBooks").slideDown("slow");
		}else{
			$(".subfilterBooks").slideUp("slow");
		};
	};

	for (var i=0;i<checkedEnable.length;i++){
		filterString = filterString + filterUrls[checkedEnable[i]];
	};
	
	filterString = "(all"+filterString+")";
	var service_url = 'https://www.googleapis.com/freebase/v1/search';
	var params = {
		'query': busqueda,
		'filter': filterString,
		'limit': 10,
		'indent': true
	};
	$.getJSON(service_url + '?callback=?', params, function(response) {
		var numero = 0;
		$.each(response.result, function(i, result) {
			numero+=1;
			var obj = {text:result['name']}.text;
			var insertar = "<tr>"+"<td>"+numero+"<td>"+obj+"</td>"+"</tr>";
			$(".informacion").append(insertar);
		});
	});
	event.preventDefault();
});