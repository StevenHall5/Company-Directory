// Main Menu Buttons

$('#toAddMenu').on('click', function() {
	$('#mainMenu').css({display: 'none'});
	$('#addMenu').css({display: 'block'});
});

$('#toAccessMenu').on('click', function() {
	$('#mainMenu').css({display: 'none'});
	$('#accessMenu').css({display: 'block'});
});

// Add Menu Buttons

$('#toAddEmp').on('click', function() {
	$('#addMenu').css({display: 'none'});
	$('#addEmpPage').css({display: 'block'});
});

$('#toAddDept').on('click', function() {
	$('#addMenu').css({display: 'none'});
	$('#addDeptPage').css({display: 'block'});
});

$('#toAddLoc').on('click', function() {
	$('#addMenu').css({display: 'none'});
	$('#addLocPage').css({display: 'block'});
});

// Access Menu Buttons

$('#toAllEmp').on('click', function() {
	$('#accessMenu').css({display: 'none'});
	getAllEmpTable();
	$('#allEmpPage').css({display: 'block'});
});

$('#toAllDept').on('click', function() {
	$('#accessMenu').css({display: 'none'});
	getAllDeptTable();
	$('#allDeptPage').css({display: 'block'});
});

$('#toAllLoc').on('click', function() {
	$('#accessMenu').css({display: 'none'});
	getAllLocTable();
	$('#allLocPage').css({display: 'block'});
});

$('#toSelEmp').on('click', function() {
	$('#accessMenu').css({display: 'none'});
	getAllEmpSelect();
	$('#selEmpPage').css({display: 'block'});
});

$('#toSelDept').on('click', function() {
	$('#accessMenu').css({display: 'none'});
	getAllDeptSelect();
	$('#selDeptPage').css({display: 'block'});
});

$('#toSelLoc').on('click', function() {
	$('#accessMenu').css({display: 'none'});
	getAllLocSelect();
	$('#selLocPage').css({display: 'block'});
});

// Back Buttons

$('.backToMainMenu').on('click', function() {
	$('.majorMenu').css({display: 'none'});
	$('#mainMenu').css({display: 'block'});
});

$('.backToAddMenu').on('click', function() {
	$('.addPage').css({display: 'none'});
	$('#addMenu').css({display: 'block'});
});

$('.backToAccessMenu').on('click', function() {
	$('.accessPage').css({display: 'none'});
	$('#accessMenu').css({display: 'block'});
});

// Produce a table with details for all employees

function getAllEmpTable() {

	$.ajax({
		url: "libs/php/getAll.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#allEmpTable').html(`
			<thead>
				<tr>
					<th>
						First Name
					</th>
					<th>
						Last Name
					</th>
					<th>
						Job Title
					</th>
					<th>
						Email
					</th>
					<th>
						Department
					</th>
					<th>
						Location
					</th>
				</tr>
			</thead>`);

			data.forEach(emp => {

				$('#allEmpTable').append(`<tr>
					<td>${emp.firstName}</td>
					<td>${emp.lastName}</td>
					<td>${emp.jobTitle}</td>
					<td>${emp.email}</td>
					<td>${emp.department}</td>
					<td>${emp.location}</td>
					</tr>`);
			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Produce a table with details for all departments

function getAllDeptTable() {

	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#allDeptTable').html(`
			<thead>
				<tr>
					<th>
						ID
					</th>
					<th>
						Department
					</th>
					<th>
						Location
					</th>
				</tr>
			</thead>`);

			data.forEach(dept => {
				$('#allDeptTable').append(`<tr>
					<td>${dept.id}</td>
					<td>${dept.name}</td>
					<td>${dept.locationID}</td>
				</tr>`);
			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Produce a table with details for all locations

function getAllLocTable() {

	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#allLocTable').html(`
			<thead>
				<tr>
					<th>
						ID
					</th>
					<th>
						Location
					</th>
				</tr>
			</thead>`);

			data.forEach(loc => {
				$('#allLocTable').append(`<tr>
					<td>${loc.id}</td>
					<td>${loc.name}</td>
				</tr>`);
			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Produce a select for all employees

function getAllEmpSelect() {

	$.ajax({
		url: "libs/php/getAll.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#empSpan').html('<select class="form-control" id="empSelect"></select>');

			data.forEach(emp => {

				$('#empSelect').append($("<option>").attr('value', emp.id).text(`${emp.lastName}, ${emp.firstName}`));

			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Produce a select for all departments

function getAllDeptSelect() {

	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#deptSpan').html('<select class="form-control" id="deptSelect"></select>');

			data.forEach(dept => {

				$('#deptSelect').append($("<option>").attr('value', dept.id).text(`${dept.name}`));

			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Produce a select for all locations

function getAllLocSelect() {

	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#locSpan').html('<select class="form-control" id="locSelect"></select>');

			data.forEach(loc => {

				$('#locSelect').append($("<option>").attr('value', loc.id).text(`${loc.name}`));

			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};