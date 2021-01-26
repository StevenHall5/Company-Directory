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
	getAllDeptSelect2();
	$('#addMenu').css({display: 'none'});
	$('#addEmpPage').css({display: 'block'});
});

$('#toAddDept').on('click', function() {
	getAllLocSelect2();
	$('#addMenu').css({display: 'none'});
	$('#addDeptPage').css({display: 'block'});
});

$('#toAddLoc').on('click', function() {
	$('#addMenu').css({display: 'none'});
	$('#addLocPage').css({display: 'block'});
});

// Access Menu Buttons

$('#toAllEmp').on('click', function() {
	getAllEmpTable();
	$('#accessMenu').css({display: 'none'});
	$('#allEmpPage').css({display: 'block'});
});

$('#toAllDept').on('click', function() {
	getAllDeptTable();
	$('#accessMenu').css({display: 'none'});
	$('#allDeptPage').css({display: 'block'});
});

$('#toAllLoc').on('click', function() {
	getAllLocTable();
	$('#accessMenu').css({display: 'none'});
	$('#allLocPage').css({display: 'block'});
});

$('#toSelEmp').on('click', function() {
	getAllEmpSelect();
	getAllDeptSelect3();
	$('#accessMenu').css({display: 'none'});
	$('#selEmpPage').css({display: 'block'});
});

$('#toSelDept').on('click', function() {
	getAllDeptSelect();
	getAllLocSelect3();
	$('#accessMenu').css({display: 'none'});
	$('#selDeptPage').css({display: 'block'});
});

$('#toSelLoc').on('click', function() {
	getAllLocSelect();
	$('#accessMenu').css({display: 'none'});
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
	clearForm();
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
					<td>${dept.location}</td>
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

			$('#empSpan').html('<select class="form-control" id="empSelect"><option></option></select>');

			data.forEach(emp => {

				$('#empSelect').append($("<option>").attr('value', emp.id).text(`${emp.lastName}, ${emp.firstName}`));

			});

			$('#empSelect').change(function() {
				var currVal = $('#empSelect').val();
				getPersonnel(currVal);
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

			$('#deptSpan').html('<select class="form-control" id="deptSelect"><option></option></select>');

			data.forEach(dept => {

				$('#deptSelect').append($("<option>").attr('value', dept.id).text(`${dept.name}`));

			});

			$('#deptSelect').change(function() {
				var currVal = $('#deptSelect').val();
				getDepartment(currVal);
				getEmployeesByDepartment(currVal);
			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

function getAllDeptSelect2() {

	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#addEmpDept').html('<select class="form-control" id="deptSelect2"></select>');

			data.forEach(dept => {

				$('#deptSelect2').append($("<option>").attr('value', dept.id).text(`${dept.name}`));

			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

function getAllDeptSelect3() {

	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#getEmpDept').html('<select class="form-control" id="deptSelect3"></select>');

			data.forEach(dept => {

				$('#deptSelect3').append($("<option>").attr('value', dept.id).text(`${dept.name}`));

			});

			$('#deptSelect3').change(function() {
				var currVal = $('#deptSelect3').val();
				getDepartment2(currVal);
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

			$('#locSpan').html('<select class="form-control" id="locSelect"><option></option></select>');

			data.forEach(loc => {

				$('#locSelect').append($("<option>").attr('value', loc.id).text(`${loc.name}`));

			});

			$('#locSelect').change(function() {
				var thisVal = $('#locSelect').val();
				var currVal = $('#locSelect')[0][thisVal].innerText;
				$('#getLocName').attr({value: currVal});
				getEmployeesByLocation(thisVal);
			});
			
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

function getAllLocSelect2() {

	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#addDeptLoc').html('<select class="form-control" id="locSelect2"></select>');

			data.forEach(loc => {

				$('#locSelect2').append($("<option>").attr('value', loc.id).text(`${loc.name}`));

			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

function getAllLocSelect3() {

	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#getDeptLoc').html('<select class="form-control" id="locSelect3"></select>');

			data.forEach(loc => {

				$('#locSelect3').append($("<option>").attr('value', loc.id).text(`${loc.name}`));

			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Populates form with selected employee info

function getPersonnel(id) {

	$.ajax({
		url: "libs/php/getPersonnel.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data;

			$('#getFName').attr({value: data.personnel[0].firstName});
			$('#getLName').attr({value: data.personnel[0].lastName});
			$('#getJobTitle').attr({value: data.personnel[0].jobTitle});
			$('#getEmail').attr({value: data.personnel[0].email});
			$('#deptSelect3').val(data.personnel[0].departmentID).change();
			$('#getEmpLoc').attr({value: data.personnel[0].location});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Populates form with selected department info

function getDepartment(id) {

	$.ajax({
		url: "libs/php/getDepartmentByID.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data[0];

			$('#getDeptName').attr({value: data.name});
			$('#locSelect3').val(data.locationID).change();
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

function getDepartment2(id) {

	$.ajax({
		url: "libs/php/getDepartmentByID.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data[0];

			$('#getEmpLoc').attr({value: data.location});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Creates tables with all employees in each department

function getEmployeesByDepartment(id) {

	$.ajax({
		url: "libs/php/getEmployeesByDepartment.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data;

			$('#allEmpByDeptTable').html(`
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
				</tr>
			</thead>`);

			data.forEach(emp => {

				$('#allEmpByDeptTable').append(`<tr>
					<td>${emp.firstName}</td>
					<td>${emp.lastName}</td>
					<td>${emp.jobTitle}</td>
					<td>${emp.email}</td>
					</tr>`);
			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Creates tables with all employees in each location

function getEmployeesByLocation(id) {

	$.ajax({
		url: "libs/php/getEmployeesByLocation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data;

			$('#allEmpByLocTable').html(`
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
				</tr>
			</thead>`);

			data.forEach(emp => {

				$('#allEmpByLocTable').append(`<tr>
					<td>${emp.firstName}</td>
					<td>${emp.lastName}</td>
					<td>${emp.jobTitle}</td>
					<td>${emp.email}</td>
					<td>${emp.department}</td>
					</tr>`);
			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Clears forms of data

function clearForm() {
	$(':text').attr({value: ""});
	$('input[type=email]').attr({value: ""});
	$('select').val('');
	$('#allEmpByDeptTable').html("");
	$('#allEmpByLocTable').html("");
};