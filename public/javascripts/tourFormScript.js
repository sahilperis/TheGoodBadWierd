var answers = new Array();
function collect (){
    $(document).ready(function(){
        //This extracts the values out of the form according to JQuery documentation

        var who = $('input:radio[name=who]:checked').val();
        answers.push(who);
        var source = $('input:radio[name=source]:checked').val();
        answers.push(source);
        var length = $('input:radio[name=length]:checked').val();
        answers.push(length);
        if(validate()===true){
            alert("Thank you for filling the Survey! You will now be redirected to our Home Page")
        }
    });
}
//move through the answers array and check if any value is undefined. If it is, prompt the user to fill in the missing answers. 
var validate = function(){

    for (var i=0; i<answers.length; i++){
        if(answers[i] === undefined ){
            alert("Hey fill in all the values!")
            return false;

        } //end if
    }//end for
    return true;

}//endValidateNew