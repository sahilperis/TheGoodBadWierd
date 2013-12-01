exports.index = function(req, res){
	res.render('HomePage', { title: 'UMass CS Surveys'});
};

exports.tourSurveyForm = function(req, res){
    //Returns the answers
	var who = req.query.who
	var source = req.query.source
	var length = req.query.length

	//If we dont have all the answers.
	if(who === undefined || source === undefined || length === undefined){
	    res.render('TourSurveyForm', { title: 'Surveys'});
	}else{
        console.log("Logged Answers: " + who +","+ source +","+ length);
        connection.query("insert into user_answers (user_name, student, ans1, ans2, ans3, ans4) value('Tanya Gupta', true, '"+who+"', '"+source+"','"+length+"','d');");
        res.redirect('/');
	}
};

exports.tourSurveyResults = function(req, res){
	res.render('TourSurveyResults', { title: 'Surveys'});
};

exports.contact = function(req, res){
	res.render('Contact', {title: 'Contact'});
};