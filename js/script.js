function startServer(){
    $.get("https://loan-prediction-gursimar.herokuapp.com/", function (data) {
    });
}

function onBtnClick(){
    $('#approval').text("...")

    var url = "https://loan-prediction-gursimar.herokuapp.com/employee_predict"
    var name = $('#Name').val()
    var satisfaction = $('#satisfaction_level').val()
    var last = $('#last_evaluation').val()
    var number = $('#number_project').val()
    var average_monthly = $('#average_monthly_hours').val()
    var time_spend = $('#time_spend_company').val()
    var work = $('#work_accident').find(":selected").text();
    var promotion = $('#promotion_last_5years').find(":selected").text();
    var sal = $('#salary').find(":selected").text();
    var dep = $('#dept').find(":selected").text();

    $('#approval').css({ color:"#e797a5"});
    if (name === "") { 
        $('#approval').text("Kindly Enter the Name of The Employee") 
        return 
    }
    if (satisfaction==="") { satisfaction=0.65 }
    if (last === "") { last = 0.55 }
    if (number === "") { number = 4 }
    if (average_monthly === "") { average_monthly = 140 }
    if (time_spend === "") { time_spend = 3 }
    if (work === "") { work = 'no' }
    if (promotion === "") { promotion = 'no' }
    if (sal === "") { sal = 'low' }
    if (dep === "") { dep = 'sales' }

    if (parseInt(satisfaction)<0 || parseInt(satisfaction)>1) {
        $('#approval').text("Invalid Value for Satisfaction Levels")
        return
    }
    if (parseInt(last) < 0 || parseInt(last) > 1) {
        $('#approval').text("Invalid Value for Last Evaluation")
        return
    }
    if (parseInt(number) < 0) {
        $('#approval').text("Invalid Value for Number Of Projects")
        return
    }
    if (number % 1 != '0') {
        $('#approval').text("Number Of Projects should be an integer value")
        return
    }
    if (parseInt(average_monthly) < 30 || parseInt(average_monthly) > 330) {
        $('#approval').text("Invalid Value for Average Monthly Hours")
        return
    }
    if (average_monthly % 1 != '0'){
        $('#approval').text("Average Monthly Hours should be an integer value")
        return
    }
    if (parseInt(time_spend) < 0 || parseInt(time_spend) > 70) {
        $('#approval').text("Invalid Value for Number Of Time Spent")
        return
    }
    if (time_spend % 1 != '0') {
        $('#approval').text("Years Spent should be an integer value")
        return
    }

    $.post(url,{
        satisfaction_level: parseFloat(satisfaction),
        last_evaluation: parseFloat(last),
        number_project: parseInt(number),
        average_monthly_hours: parseInt(average_monthly),
        time_spend_company: parseInt(time_spend),
        work_accident: work,
        promotion_last_5years: promotion,
        salary: sal,
        dept: dep,
    },function(data,status){
            console.log(data.Apporval_Prediction)
            $('#approval').css({ color: "#b4c9df" });
            $('#approval').text(name+data.Apporval_Prediction)
    })
}

function changework_accident(){
    var val = $('#work_accident').find(":selected").text();
    if(val !==""){
        $('#work_accident +.dependants-name .content-dependants').addClass('optionclass')
    }
    else{
        $('#work_accident +.dependants-name .content-dependants').removeClass('optionclass')
    }
}

function changesalary() {
    var val = $('#salary').find(":selected").text();
    if (val !== "") {
        $('#salary +.dependants-name .content-dependants').addClass('optionclass')
    }
    else {
        $('#salary +.dependants-name .content-dependants').removeClass('optionclass')
    }
}


function changepromotion_last_5years() {
    var val = $('#promotion_last_5years').find(":selected").text();
    if (val !== "") {
        $('#promotion_last_5years +.dependants-name .content-dependants').addClass('optionclass')
    }
    else {
        $('#promotion_last_5years +.dependants-name .content-dependants').removeClass('optionclass')
    }
}


function changedept() {
    var val = $('#dept').find(":selected").text();
    if (val !== "") {
        $('#dept +.dependants-name .content-dependants').addClass('optionclass')
    }
    else {
        $('#dept +.dependants-name .content-dependants').removeClass('optionclass')
    }
}