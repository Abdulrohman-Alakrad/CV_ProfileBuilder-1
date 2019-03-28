
$('.form').hide();
// // // $('.center').toggle();
$('#form1').hide();
$('#btn').click(function() {
	// body...
	$('.center').toggle();
	$('.form').toggle();

});
/// hide the alerts messages
$("#skillAlert").hide();
$("#workAlert").hide();
$("#eduAlert").hide();
$("#hobbyAlert").hide();


// function validateForm() {
//   var x = document.forms["myForm"]["fname"].value;
//   if (x == "") {
//     alert("Name must be filled out");
//     return false;
//   }
// }
/// add element for skills
var idSkills = 2;//counter to change the element id
$("#addSkills").on('click',function(){
	if (idSkills <= 3) {
	  $("#skillsDiv").append("Skill Name:<input type='text' class='skillsN' id='skillName"+
	  	idSkills+"'>Your prof persent:<input type='number' class='skillsP' id='skillPercent"+idSkills+"' step ='10' min='0' max='100'=><br>");
	  idSkills++;
	}else {
		$("#skillAlert").show();
	}
})

/// add element for work exereince
var idWork = 2;//counter to change the element id
$("#addJob").on('click',function(){
	if (idWork <= 3) {
	  $("#workDiv").append("<br>" +
	  		"JOB Title:"+
  		"<input type='text' id='job"+idWork+"' class='jobsT'>"+
  		"Job Company:"+
  		"<input type='text' id='company"+idWork+"'>"+
  		"Date From/to:<br>"+
  		"From:"+
  		"<input type='date' id='jobDateF"+idWork+"'>"+
  		"To:"+
  		"<input type='date' id='jobDateTo"+idWork+"'>");
	  idWork++;
	}else {
		$("#workAlert").show();
	}
})

/// add element for eduecation
var idEdu = 2;//counter to change the element id
$("#addEdu").on('click',function(){
	if (idEdu <= 3) {
	  $("#eduDiv").append("Majer:"+
  	"<input type='text' id='Major"+idEdu+"' class='eduMajor'>"+
  	"University:"+
  	"<input type='text' id='University"+idEdu+"'>"+
  	"Date:"+
  	"<input type='date' id='date"+idEdu+"'>	");
	  idEdu++;
	}else {
		$("#eduAlert").show();
	}
})

/// add element for hobbies
var idHobby = 2;//counter to change the element id
$("#addHobby").on('click',function(){
	if (idHobby <= 3) {
	  $("#hobbiesDiv").append("Hobby Name:<input type='text' class='hobbyC' id='hobby"+idHobby+"'>");
	  idHobby++;
	}else {
		$("#hobbyAlert").show();
	}
})

$("#printing").on('click',function(){

	$('.form').hide();
	$('.center').hide();
	$('.menuBar').hide();
	$('#printing').hide();
	window.print();


})
////////////////////////////////////////////////

	//				     the database	     					//

////////////////////////////////////////////////
var users = [];
function userData(userID){
	var userID = {}
	userID.contactArray = [];
	userID.summary;
	userID.skills = [];
	userID.jobs = [];
	userID.eduecation = [];
	userID.hobbies = [];
	userID.contactFactory = contactFactory;
	userID.skillsFactory = skillsFactory;
	userID.jobsFactory = jobsFactory;
	userID.eduFactory = eduFactory;
	userID.hobbyFactory = hobbyFactory;
return userID;
}	
//factory function for the user info contact
var contactFactory = function(firstName, lastName, phone, email, address){
	var contactObj = {};
		contactObj.firstName = firstName;
		contactObj.lastName = lastName;
		contactObj.phone = phone;
		contactObj.email = email;
		contactObj.address = address;
	this.contactArray.push(contactObj);
}
//factory function for Skills
var skillsFactory = function(skill, profPercent){
	var skillObj = {};
		skillObj.skill = skill;
		skillObj.profPercent = profPercent;
	this.skills.push(skillObj);
}
//factory function for works experince:
var jobsFactory = function(jobTitle, jobCompany, fromDate, toDate){
	var jobObj = {};
		jobObj.jobTitle = jobTitle;
		jobObj.jobCompany = jobCompany;
		jobObj.fromDate = fromDate;
		jobObj.toDate = toDate;
	this.jobs.push(jobObj);
}
//factory function for education
var eduFactory =function(major, university, date){
	var eduObj = {};
	eduObj.major = major;
	eduObj.university = university;
	eduObj.date = date;
this.eduecation.push(eduObj);
}
//factory function for hobbies
var hobbyFactory = function(hobby){
	this.hobbies.push(hobby);
}
//on click button submit add the information to array 
var userId = 0 ;
$("#submit1").on('submit',function(){
	// creat the user obj
	var user = userData(++userId);
	// add the contact info to user obj
	user.contactFactory($('#firstname').val(),$('#lastname').val(),$('#phoneNumber').val(), $('#email').val(), $('#address').val());
	user.summary = $('#summary').val();
	// add the skills info to user obj
	var skillsNamesArray = $('.skillsN');
	for (var i = 0; i < skillsNamesArray.length; i++) {
		var skillNameTemp = $("#skillName"+(i+1)).val();
		var skillPercentTemp = $("#skillPercent"+(i+1)).val();
		user.skillsFactory(skillNameTemp, skillPercentTemp) 
	}
	// add the works info to user obj
	var jobArray = $('.jobsT');	// just to know the number of jobs added
	for (var i = 0; i < jobArray.length; i++) {
		user.jobsFactory($("#job"+(i+1)).val(),$("#company"+(i+1)).val(),$("#jobDateF"+(i+1)).val(), $("#jobDateTo"+(i+1)).val());
	}
	// add the edu info to user obj
	var eduArray = $('.eduMajor');// just to know the number of edu added
	for (var i = 0; i < eduArray.length; i++) {
		user.eduFactory($("#Major"+(i+1)).val(),$("#Univercity"+(i+1)).val(),$("#date"+(i+1)).val());
	}
	// add the hobbies info to user obj
	var hobbyArray = $('.hobbyC');// just to know the number of hobby added
	for (var i = 0; i < hobbyArray.length; i++) {
		user.hobbyFactory($("#hobby"+(i+1)).val());
	}
	users.push(user);
	// users[0].contactArray[0].firstname
	$('#nameText').text(users[0].contactArray[0].firstName+" "+$('#lastname').val());
	$('#jobTitle').text($("#job1").val())
	$('#summaryText').text($('#summary').val())
	$('#emailText').text($('#email').val())
	$('#addText').text($('#address').val())
	$('#phoneText').text($('#phoneNumber').val())

	$('#skillItem').html('');
	for (var i = 0; i < skillsNamesArray.length; i++) {
		$('#skillItem').append("<li>" + $("#skillName"+(i+1)).val() + "</li> <br>");
		// $("#skillPercent"+(i+1)).val();
	}
	$('#worksItemT').html('');
	$('#worksDateT').html('');
	for (var i = 0; i < jobArray.length; i++) {
		$('#worksItemT').append("<li>" + $("#job"+(i+1)).val() +"</li><br><label>"+$("#company"+(i+1)).val()+"</label><br><br>");
		$('#worksDateT').append("<li>"+$("#jobDateF"+(i+1)).val()+"</li> <br><li>"+$("#jobDateTo"+(i+1)).val()+"</li> <br><br>"); 
	}

	$('#eduItemT').html('');
	$('#eduDateT').html('');
	for (var i = 0; i < eduArray.length; i++) {
		$('#eduItemT').append("<li>"+$("#Major"+(i+1)).val()+"</li> <br><label>"+$("#Univercity"+(i+1)).val()+"</label><br><br>");
		$('#eduDateT').append("<li>"+$("#date"+(i+1)).val()+"</li> <br><br><br>");
	}
	$('#hobbyTT').html('');
	for (var i = 0; i < hobbyArray.length; i++) {
		$('#hobbyTT').append("<li>" + $("#hobby"+(i+1)).val() +"</li> <br><br>");
	}
	$('.form').toggle();
	$('#form1').toggle();

});
