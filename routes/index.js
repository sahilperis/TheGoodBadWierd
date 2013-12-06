exports.index = function(req, res){
	res.render('HomePage', { title: 'UMass CS Surveys'});
};

exports.tourSurveyForm = function(req, res){
    //Returns the answers
	var q1 = req.query.q1;
	var q2 = req.query.q2;
	var q3 = req.query.q3;
    var q4 = req.query.q4;
    var q5 = req.query.q5;

	//If we dont have all the answers.
	if(q1 === undefined || q2 === undefined || q3 === undefined || q4 === undefined || q5 === undefined){
	    res.render('TourSurveyForm', { title: 'Surveys'});
	}else{
        console.log("Logged Answers: " + q1 +","+ q2 +","+ q3+","+ q4+","+ q5);
        connection.query("insert into user_answers (user_name, student, ans1, ans2, ans3, ans4, ans5) value('Tanya Gupta', true, '"+q1+"', '"+q2+"','"+q3+"','"+q4+"','"+q5+"');");
        res.redirect('/');
	}
};

exports.tourSurveyResults = function(req, res){
	res.render('TourSurveyResults', { title: 'Surveys'});
};

exports.contact = function(req, res){
	res.render('Contact', {title: 'Contact'});
};