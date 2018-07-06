$(document).ready(function(){
	console.log( 'loaded' );
		
	var json = {};
	$.ajax({
		url: 'knittingapp.json',
		dataType: 'json',
		method: 'get',
		error: function (jqXHR, textStatus, errorThrown) {
			
			// log
			console.log('error loading data'+errorThrown);
		},
		
		success: function(data, textStatus, jqXHR) {
			// log
			console.log('json loaded');	
			
			// Store data
			json = data;
		}
	});


	// Listen for form submit
	$('form').on('submit', function(e) {
		e.preventDefault();
		// Log
		console.log('form submitted');
	

	// Hide error messages
	$('#gender_error').hide();
	$('#type_error').hide();

	// Validate user input
	var errors_found = false;
	var gender = $('#gender').val();
	var type = $('#type').val();
	if (!gender) {
		errors_found = true;
		$('#gender_error').text('Please select a gender').show();
		}
	if (!type) {
		errors_found = true;
		$('#type_error').text('Please select a clothing type').show();
	}
	
	// Run matching algorithm
	
	var matches = [];
	if (!errors_found) {
			$.each(json.items, function(k,v) {
				
			if (gender == v.gender && type == v.type) {
				matches.push(v);
			}
								
		});
	}
	
	// Output matches on screen
		
		if (matches) {
			var n = $("matches").length;
			$('p#resultcount').text('Showing  ' +matches.length+'  Results');
			}
		
		if (matches) {		
			var ul = $('ul#matches');
			var str = '';
			$.each(matches, function(k, v) {  
			str += '<li><h2>' + "Item Name:"  +v.name +"<br>" + "Copyright:" + v.copyright+ '</h2>';
			str += '<img src="/sweaterscount/img/' +v.image+'"</li>';
			str += '<a href="'+v.url+'" title="' +v.url+'"> '+v.url+' </a></li>';
			str +="<br>";
			});
			
			$(ul).empty().append(str);
			console.log(matches);
			
		}
	
			
		})
		
		
		return false;
		});
	
	
		
	
	
			
		
		
	
		
		
