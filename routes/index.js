/*
* meant to provide template for survey route
*/
function survey_template(req){
    var id = parseInt(req.params.IDNum);
    var questions = new Array();
    var options = new Array();
    var title;
    var description;

    //Configures the variables for each different survey
    switch(id){

        case 1:
            title = 'Generic Class Survey';

            description = 'What did you think of the class?';

            questions.push('Did you enjoy the class?');
            questions.push('How many hours did you spend studying?');
            questions.push('How much did you learn?');
            questions.push('What grade do you expect to get?');
            questions.push('Is Tim Richards the coolest?');

            options.push(['Yes','No']);
            options.push(['5','10','15','20+']);
            options.push(['Not much','A bit','A lot']);
            options.push(['A','B','C','D or lower']);
            options.push(['Yes','Yes']);
            break;
        case 2:
            title = 'Departmental Tour';

            description = 'Thank you for taking a tour of the School of Computer Science! Please take some time to fill out this survey.';

            questions.push('Are you a male or female?');
            questions.push('How old will you be if you attend the School of Computer Science in the Fall?');
            questions.push('How did you find out about the tour?');
            questions.push('How was the length of the tour?');
            questions.push('Do you think you will be attending the School of Computer Science after this tour?');

            options.push(['Male', 'Female']);
            options.push(['18','19','20','21+']);
            options.push(['UMass CS Website', 'University Tour', 'Friend', 'Other']);
            options.push(['Long','Just Right','Short']);
            options.push(['Yes','No','Undecided']);
            break;
        case 3:
            //space for 3rd survey
            break;
        case 4:
            //space for 4th survey
            break;
    }

    var jsonObj = {
        title: title,
        description: description,
        questions: questions,
        options: options
    }

    return jsonObj;
}

/*
 * meant to provide template for results route. not totally functional.
 */
function results_template(req){
    var id = parseInt(req.params.IDNum);
    var questions = new Array();
    var options = new Array();
    var title;

    //Configures the variables for each different survey
    switch(id){
        case 1:
            title = 'Generic Class Survey Results';

            questions.push('Did you enjoy the class?');
            questions.push('How many hours did you spend studying?');
            questions.push('How much did you learn?');
            questions.push('What grade do you expect to get?');
            questions.push('Is Tim Richards the coolest?');

            options.push(['Yes','No']);
            options.push(['5','10','15','20+']);
            options.push(['Not much','A bit','A lot']);
            options.push(['A','B','C','D or lower']);
            options.push(['Yes','Yes']);
            break;
        case 2:
            title = 'Departmental Tour Results';

            questions.push('Are you a male or female?');
            questions.push('How old will you be if you attend the School of Computer Science in the Fall?');
            questions.push('How did you find out about the tour?');
            questions.push('How was the length of the tour?');
            questions.push('Do you think you will be attending the School of Computer Science after this tour?');

            options.push(['Male', 'Female']);
            options.push(['18','19','20','21+']);
            options.push(['UMass CS Website', 'University Tour', 'Friend', 'Other']);
            options.push(['Long','Just Right','Short']);
            options.push(['Yes','No','Undecided']);

            break;
        case 3:
            //option for 3rd survey
            break;
        case 4:
            //option for 4th survey
            break;
    }

    var jsonObj = {
        title: title,
        questions: questions,
        options: options
    }

    return jsonObj;
}

exports.index = function(req, res){
	res.render('HomePage', { title: 'UMass CS Surveys'});
};

exports.surveyForm = function(req, res){

    var surveyObj = survey_template(req);

    //Returns the answers
	var q1 = req.query.q1;
	var q2 = req.query.q2;
	var q3 = req.query.q3;
    var q4 = req.query.q4;
    var q5 = req.query.q5;

	//If we dont have all the answers.
	if(q1 === undefined || q2 === undefined || q3 === undefined || q4 === undefined || q5 === undefined){
	    res.render('SurveyForm', surveyObj);
	}else{
        console.log("Logged Answers: " + q1 +","+ q2 +","+ q3+","+ q4+","+ q5);
        connection.query("insert into user_answers (user_name, student, ans1, ans2, ans3, ans4, ans5) value('anon', true, '"+q1+"', '"+q2+"','"+q3+"','"+q4+"','"+q5+"');");
        res.redirect('/');
	}
};

exports.surveyResults = function(req, res){
    var resultObj = results_template(req);
    res.render('SurveyResults', resultObj);
};


exports.login = function(req, res){
	res.render('Login', {title: 'Login'});
};