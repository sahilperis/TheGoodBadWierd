/*
 * GET home page.
 */

//The following 3 variables are just for testing purposes: 
var who , source, length = undefined;

exports.index = function(req, res){
	res.render('HomePage', { title: 'UMass CS Surveys'});
};

exports.tourSurveyForm = function(req, res){
	//This might get the values out of form and fix the GET error. Need to tinker more with this.
	var who = req.query.who
	var source = req.query.source
	var length = req.query.length

	//If we dont have all the answers. 
	if(who===undefined || source===undefined ||length ===undefined){
	    res.render('TourSurveyForm', { title: 'Surveys'});
	}
	else{
		/*We have all the required answers so connect to data base and update its values! 
		David this your job--Use the model variable I have created above. . Once the DB has been updated, we simply redirect to the Home Page.
		*/
		connection.query("insert into user_answers (user_name, student, ans1, ans2, ans3, ans4) value('Tanya Gupta', true, "+who+","+source+","+length+",'d');");
		res.redirect('/');
	}
};

exports.tourSurveyResults = function(req, res){
	res.render('TourSurveyResults', { title: 'Surveys'});
};

exports.contact = function(req, res){
	res.render('Contact', {title: 'Contact'});
};