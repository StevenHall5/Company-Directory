var currentID = 0;

$('#dataSpan').on('click', 'td', function() {

	switch (this.id.slice(0, 6)) {

		case "empedt":
			getAllDeptSelect3();
			var thisedit = (this.id).slice(6);
			getPersonnel(thisedit);
			$('#editModal').modal('show');
			$('#submitEmp').on('click', function() {
				if (!$('#getFName').val() || !$('#getLName').val()) {
					$('#dataNeededModal').modal('show');
				} else {
					$('#editEmpModal').modal('show');
				}			
			});
			
			$('#saveEmpButton').on('click', function() {
				updateEmpFunc(thisedit);
			});
		break;

		case "empdel":
			$('#delEmpModal').modal('show');
			var thisdel = (this.id).slice(6);
			$('#delEmpButton').on('click', function() {
				deleteEmpFunc(thisdel);
			});
		break;

		case "dptedt":
			getAllLocSelect3();
			var thisedit = (this.id).slice(6);
			getDepartment(thisedit);
			$('#editDeptModal').modal('show');
			$('#submitDept').on('click', function() {
				if (!$('#getDeptName').val()) {
					$('#dataNeededModal').modal('show');
				} else {
					$('#editDeptConfirmModal').modal('show');
				}
			});
			$('#saveDeptButton').on('click', function() {
				updateDeptFunc(thisedit);
			});
		break;

		case "dptdel":
			var thisdel = (this.id).slice(6);
			delDeptCheck(thisdel);
		break;
			
		case "dptexp":
			var thisexp = (this.id).slice(6);
			if ($(`#arrowDown${thisexp}`)[0].dataset.icon === "caret-down") {
				$(`#arrowDown${thisexp}`)[0].dataset.icon = "caret-up";
				$(`#deptRow${thisexp}`).after(`<tr id="newDeptRow${thisexp}"><td colspan="6"><table class="table table-hover container table-dark" id="allEmpByDeptTable${thisexp}"></table></td></tr>`);
				getEmployeesByDepartment(thisexp);
			} else {
				$(`#arrowDown${thisexp}`)[0].dataset.icon = "caret-down";
				$(`#newDeptRow${thisexp}`).html('');
			}
		break;

		case "locedt":
			var thisedit = (this.id).slice(6);
			getLocation(thisedit);
			$('#editLocModal').modal('show');
			$('#submitLoc').on('click', function() {
				if (!$('#getLocName').val()) {
					$('#dataNeededModal').modal('show');
				} else {
					$('#editLocConfirmModal').modal('show');
				}
			});
			$('#saveLocButton').on('click', function() {
				updateLocFunc(thisedit);
			});
		break;

		case "locdel":
			var thisdel = (this.id).slice(6);
			delLocCheck(thisdel);
		break;
			
		case "locexp":
			var thisexp = (this.id).slice(6);
			if ($(`#arrowDown${thisexp}`)[0].dataset.icon === "caret-down") {
				$(`#arrowDown${thisexp}`)[0].dataset.icon = "caret-up";
				$(`#locRow${thisexp}`).after(`<tr id="newLocRow${thisexp}"><td colspan="6"><table class="table table-striped container table-dark" id="allEmpByLocTable${thisexp}"></table></td></tr>`);
				getEmployeesByLocation(thisexp);
			} else {
				$(`#arrowDown${thisexp}`)[0].dataset.icon = "caret-down";
				$(`#newLocRow${thisexp}`).html('');
			}
		break;										
	}

});

$('#refreshPageButton').on('click', function() {
	getAllEmpTable();
	clearForm();
});

$('#addButton').on('click', function() {
	getAllDeptSelect2();
	$('#addModal').modal('show');
});

$('#submitAddEmp').on('click', function() {
	if (!$('#addFName').val() || !$('#addLName').val()) {
		$('#dataNeededModal').modal('show');
	} else {
		$('#addEmpModal').modal('show');
	}
});

$('#submitAddDept').on('click', function() {
	if (!$('#AddDept').val()) {
		$('#dataNeededModal').modal('show');
	} else {
		$('#addDeptModal').modal('show');
	}
});

$('#submitAddLoc').on('click', function() {
	if (!$('#loc').val()) {
		$('#dataNeededModal').modal('show');
	} else {
		$('#addLocModal').modal('show');
	}
});

$('#addEmpButton').on('click', function() {
	addEmpFunc();
});

$('#addDeptButton').on('click', function() {
	addDeptFunc();
});

$('#addLocButton').on('click', function() {
	addLocFunc();
});

$('#navEmp').on('click', function() {
	getAllEmpTable();
});

$('#navDept').on('click', function() {
	getAllDeptTable();
});

$('#navLoc').on('click', function() {
	getAllLocTable();
});

$('#addSelector').on('change', function() {
	if ($('#addSelector').val() === "emp") {
		getAllDeptSelect2();
		$('#addEmpForm').css({display: 'block'});
		$('#addDeptForm').css({display: 'none'});
		$('#addLocForm').css({display: 'none'});
	} else if ($('#addSelector').val() === "dept") {
		getAllLocSelect2();
		$('#addEmpForm').css({display: 'none'});
		$('#addDeptForm').css({display: 'block'});
		$('#addLocForm').css({display: 'none'});
	}else if ($('#addSelector').val() === "loc") {
		$('#addEmpForm').css({display: 'none'});
		$('#addDeptForm').css({display: 'none'});
		$('#addLocForm').css({display: 'block'});
	}
});

// Clears forms of data

function clearForm() {
	$('.textField').val("");
	$('input[type=email]').val("");
};

// CREATE FUNCTIONS

// Add an employee

function addEmpFunc() {

	$.ajax({
		url: "libs/php/insertEmployee.php",
		type: 'POST',
		dataType: 'json',
		data: {
			addFName: $('#addFName').val(),
			addLName: $('#addLName').val(),
			addJobTitle: $('#addJobTitle').val(),
			addEmail: $('#addEmail').val(),
			deptSelect2: $('#deptSelect2').val()
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				clearForm();
				$("#mainSelector").val("emp").change();
				$('#addEmpModal').modal('hide');
				$('#addModal').modal('hide');
			} else {
				alert("Error occurred, please try again");
			}
	
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Add a department

function addDeptFunc() {

	$.ajax({
		url: "libs/php/insertDepartment.php",
		type: 'POST',
		dataType: 'json',
		data: {
			name: $('#AddDept').val(),
			locationID: $('#locSelect2').val()
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				clearForm();
				$("#mainSelector").val("dept").change();
				$('#addDeptModal').modal('hide');
				$('#addModal').modal('hide');
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Add a location

function addLocFunc() {

	$.ajax({
		url: "libs/php/insertLocation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			name: $('#loc').val(),
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				clearForm();
				$("#mainSelector").val("loc").change();
				$('#addLocModal').modal('hide');
				$('#addModal').modal('hide');
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// READ FUNCTIONS


// Produce a table with details for all employees

function getAllEmpTable() {

	$.ajax({
		url: "libs/php/getAll.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;			

			$('#dataSpan').html(`
			<table id="dataTable" data-height="100" class="table table-hover table-striped table-dark" data-toggle="table collapse">
			<thead>
			<tr>
				<th>
					First Name
				</th>
				<th>
					Last Name
				</th>
				<th class="jCol">
					Job Title
				</th>
				<th class="eCol">
					Email
				</th>
				<th class="dCol">
					Department
				</th>
				<th class="lCol">
					Location
				</th>
				<th>	
				</th>
				<th>
				</th>
			</tr>
		</thead><tbody></tbody></table>`);

			data.forEach(emp => {

				$('#dataTable').append(
					
					`<tr id="${emp.id}">
					<td>${emp.firstName}</td>
					<td>${emp.lastName}</td>
					<td class="jCol">${emp.jobTitle}</td>
					<td class="eCol">${emp.email}</td>
					<td class="dCol">${emp.department}</td>
					<td class="lCol">${emp.location}</td>
					<td id="empedt${emp.id}"><i class="fas fa-pen"></i></td>
					<td id="empdel${emp.id}"><i class="fas fa-trash"></i></td>
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

			$('#dataSpan').html(`
			<table id="dataTable2" class="table table-hover table-striped table-dark" data-toggle="table">
			<thead class="thead-dark">
				<tr>					
					<th data-field="dptDropdown">
						
					</th>
					<th data-field="deptName">
						Department
					</th>
					<th data-field="deptLocation">
						Location
					</th>
					<th data-field="but1">	
					</th>
					<th data-field="but2">
					</th>
				</tr>
			</thead><tbody>`);

			data.forEach(dept => {
				$('#dataTable2').append(`<tr id="deptRow${dept.id}">
					<td id="dptexp${dept.id}"><i id="arrowDown${dept.id}" class="fas fa-caret-down"></i></td>
					<td>${dept.name}</td>
					<td>${dept.location}</td>
					<td id="dptedt${dept.id}"><i class="fas fa-pen"></i></td>
					<td id="dptdel${dept.id}"><i class="fas fa-trash"></i></td>
				</tr>`);
			});

			$('#dataTable2').append(`</tbody></table>`);
				
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

			$('#dataSpan').html(`
			<table id="dataTable3" class="table table-hover table-striped table-dark" data-toggle="table">
			<thead class="thead-dark">
				<tr>					
					<th data-field="dptDropdown">	
					</th>
					<th>
						Location
					</th>
					<th data-field="but1">	
					</th>
					<th data-field="but2">
					</th>
				</tr>
			</thead><tbody>`);

			data.forEach(loc => {
				$('#dataTable3').append(`<tr id="locRow${loc.id}">
				<td id="locexp${loc.id}"><i id="arrowDown${loc.id}" class="fas fa-caret-down"></i></td>
				<td>${loc.name}</td>
					<td id="locedt${loc.id}"><i class="fas fa-pen"></i></td>
					<td id="locdel${loc.id}"><i class="fas fa-trash"></i></td>
				</tr>`);
			});

			$('#dataTable3').append(`</tbody></table>`);

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};


// Produce a select for all departments

function getAllDeptSelect2() {

	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'POST',
		dataType: 'json',
		
		success: function(result) {

			var data = result.data;

			$('#addEmpDept').html('<select class="form-control" id="deptSelect2" name="deptSelect2"></select>');

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

	currentID = id;

	$.ajax({
		url: "libs/php/getPersonnel.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data;

			$('#getFName').val(data.personnel[0].firstName);
			$('#getLName').val(data.personnel[0].lastName);
			$('#getJobTitle').val(data.personnel[0].jobTitle);
			$('#getEmail').val(data.personnel[0].email);
			$('#deptSelect3').val(data.personnel[0].departmentID).change();
			$('#getEmpLoc').val(data.personnel[0].location);
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Populates form with selected department info

function getDepartment(id) {

	currentID = id;

	$.ajax({
		url: "libs/php/getDepartmentByID.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data[0];

			$('#getDeptName').val(data.name);
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

			$('#getEmpLoc').val(data.location);
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Populates form with selected location info

function getLocation(id) {

	currentID = id;

	$.ajax({
		url: "libs/php/getLocationByID.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data[0];

			$('#getLocName').val(data.name);
				
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

			$(`#allEmpByDeptTable${id}`).html(`
			<thead class="thead-dark">
				<tr>
					<th>
						First Name
					</th>
					<th>
						Last Name
					</th>
					<th class="jCol">
						Job Title
					</th>
					<th class="eCol">
						Email
					</th>
					<th data-field="but1">	
					</th>
					<th data-field="but2">
					</th>
				</tr>
			</thead><tbody></tbody></table>`);

			data.forEach(emp => {

				$(`#allEmpByDeptTable${id}`).append(`<tr>
					<td>${emp.firstName}</td>
					<td>${emp.lastName}</td>
					<td class="jCol">${emp.jobTitle}</td>
					<td class="eCol">${emp.email}</td>
					<td id="empedt${emp.id}"><i class="fas fa-pen"></i></td>
					<td id="empdel${emp.id}"><i class="fas fa-trash"></i></td>
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

			$(`#allEmpByLocTable${id}`).html(`
			<thead class="thead-dark">
				<tr>
					<th>
						First Name
					</th>
					<th>
						Last Name
					</th>
					<th class="jCol">
						Job Title
					</th>
					<th class="eCol">
						Email
					</th>
					<th class="dCol">
						Department
					</th>
					<th data-field="but1">	
					</th>
					<th data-field="but2">
					</th>
				</tr>
			</thead>`);

			data.forEach(emp => {

				$(`#allEmpByLocTable${id}`).append(`<tr>
					<td>${emp.firstName}</td>
					<td>${emp.lastName}</td>
					<td class="jCol">${emp.jobTitle}</td>
					<td class="eCol">${emp.email}</td>
					<td class="dCol">${emp.department}</td>
					<td id="empedt${emp.id}"><i class="fas fa-pen"></i></td>
					<td id="empdel${emp.id}"><i class="fas fa-trash"></i></td>
					</tr>`);
			});
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// UPDATE FUNCTIONS

// Update employee info

function updateEmpFunc(id) {

	$.ajax({
		url: "libs/php/updateEmployee.php",
		type: 'POST',
		dataType: 'json',
		data: {
			firstName: $('#getFName').val(),
			lastName: $('#getLName').val(),
			jobTitle: $('#getJobTitle').val(),
			email: $('#getEmail').val(),
			departmentID: $('#deptSelect3').val(),
			id: currentID
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				$('#editEmpModal').modal('hide');
				$('#editModal').modal('hide');
				getAllEmpTable();
				clearForm();
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Update department info

function updateDeptFunc() {

	$.ajax({
		url: "libs/php/updateDepartment.php",
		type: 'POST',
		dataType: 'json',
		data: {
			name: $('#getDeptName').val(),
			locationID: $('#locSelect3').val(),
			id: currentID
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				$('#editDeptModal').modal('hide');
				$('#editDeptConfirmModal').modal('hide');
				getAllDeptTable();
				clearForm();
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Update location info

function updateLocFunc(id) {

	$.ajax({
		url: "libs/php/updateLocation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			name: $('#getLocName').val(),
			id: currentID
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				$('#editLocModal').modal('hide');
				$('#editLocConfirmModal').modal('hide');
				getAllLocTable();
				clearForm();
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// DELETE FUNCTIONS

// Delete employee info

function deleteEmpFunc(id) {

	$.ajax({
		url: "libs/php/deleteEmployee.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				getAllEmpTable();
				$('#delEmpModal').modal('hide');
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Verify department can be safely deleted

function delDeptCheck(id) {

	$.ajax({
		url: "libs/php/countDepartments.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data[0].totalPeople;

			if (data === "0") {
				$('#delDeptModal').modal('show');
				$('#delDeptButton').on('click', function() {
					deleteDeptFunc(id);
				});
			} else {
				$('#cannotDeleteDeptModal').modal('show');
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Delete department info

function deleteDeptFunc(id) {

	$.ajax({
		url: "libs/php/deleteDepartment.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				getAllDeptTable();
				$('#delDeptModal').modal('hide');
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Verify location can be safely deleted

function delLocCheck(id) {

	$.ajax({
		url: "libs/php/countLocations.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var data = result.data[0].totalDepts;

			if (data === "0") {
				$('#delLocModal').modal('show');
				$('#delLocButton').on('click', function() {
					deleteLocFunc(id);
				});
			} else {
				$('#cannotDeleteLocModal').modal('show');
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Delete location info

function deleteLocFunc(id) {

	$.ajax({
		url: "libs/php/deleteLocation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			id: id
		},
		
		success: function(result) {

			var statusCode = result.status.code;

			if (statusCode === "200") {
				getAllLocTable();
				$('#delLocModal').modal('hide');
			} else {
				alert("Error occurred, please try again");
			}
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error');
		}
	}); 		
	
};

// Stacks Modals
$(document).on('show.bs.modal', '.modal', function (event) {
	var zIndex = 1040 + (10 * $('.modal:visible').length);
	$(this).css('z-index', zIndex);
	setTimeout(function() {
		$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
	}, 0);
});

// Preloader

$(document).ready(function () {
	if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
	}
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});
	$('#back-to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
	getAllEmpTable();
});