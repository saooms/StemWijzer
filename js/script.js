var index;
var answerlst = [];
var startform = document.getElementById("start");
var questionform = document.getElementById("question");
var optionsform = document.getElementById("options");
var startbtn = document.getElementById("startbtn");
var backbtn = document.getElementsByClassName("back");
var probtn = document.getElementById("pro");
var ambivalentbtn = document.getElementById("ambivalent");
var contrabtn = document.getElementById("contra");
var skipbtn = document.getElementById("skip");
var nextbtn = document.getElementById("next");
var checks;
var currentview;

startbtn.onclick = function(){launch()};
probtn.onclick = function(){nextQuestion("pro")};
ambivalentbtn.onclick = function(){nextQuestion("ambivalent")};
contrabtn.onclick = function(){nextQuestion("contra")};
skipbtn.onclick = function(){nextQuestion("none")};
nextbtn.onclick = function(){setOptions("parties")};


function launch(){
    startform.style.display = "none";
    questionform.style.display = "inline";
    index = 0;
    for(var i = 0; i < backbtn.length; i++) {
        var btn = backbtn[i];
        btn.onclick = function() {
            back();
        }
    }
    setQuestion();
}

function displaySwitch(prev, fol){
    prev.style.display = "none";
    fol.style.display = "inline";
    currentview = fol;
}

function setQuestion(){
    switch (index) {
        case -1:
            displaySwitch(questionform, startform);
            break;

        case (subjects.length):
            setOptions("statements");
            break;
    
        default:
        console.log(index);
            document.getElementById("questiontitle").innerHTML = subjects[index].title;
            document.getElementById("text").innerHTML = subjects[index].statement;
            break;
    }
    if (index > 0 & typeof(current = answerlst[index]) != 'undefined') {
        switch (current.position) {
            case "pro":
                probtn.style.backgroundColor = "blue";
                break;
            case "ambivalent":
                ambivalentbtn.style.backgroundColor = "blue";
                break;
            case "contra":
                contrabtn.style.backgroundColor = "blue";
                break;
        }
    }
}


function answer(choice){
    answerlst[index] = (new pick(choice));

    function pick(position){
        this.position = position;
    }
}

function nextQuestion(choice){
    answer(choice);
    index++;
    setQuestion();
}

function back(){
    index--;
    setQuestion();
}

function setOptions(view){
    displaySwitch(questionform, optionsform);
    var optionlst = document.getElementById("optionslist");
    optionlst.innerHTML = "";
    var text;

    if (view == "statements") {
        subjects.forEach(subject => {
            optionlst.innerHTML += "<div><input class='w3-check check' type='checkbox'><label> " + subject.title +"</label></div>";
        });
        text = "Zijn er onderwerpen die u extra belangrijk vindt?";
    }
    else {
        parties.forEach(party => {
            optionlst.innerHTML += "<div><input class='w3-check check' type='checkbox' checked ='checked'><label> " + party.name +"</label></div>";
        });
        text = "Welke partijen wilt u meenemen in het resultaat?";
    }

    document.getElementById("optionstext").innerHTML = text

    checks = document.getElementsByClassName("check");
}