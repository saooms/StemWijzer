//#region forms
var startform = document.getElementById("start");
var questionform = document.getElementById("question");
var statementsform = document.getElementById("statements");
var partiesform = document.getElementById("parties");
var resultform = document.getElementById("result");
var formarray = [startform, questionform, statementsform, partiesform, resultform];
//#endregion

//#region btns
var startbtn = document.getElementById("startbtn");
var backbtn = document.getElementsByClassName("back");
var probtn = document.getElementById("pro");
var ambivalentbtn = document.getElementById("ambivalent");
var contrabtn = document.getElementById("contra");
var skipbtn = document.getElementById("skip");
var submitstatementsbtn = document.getElementById("submitstatements");
var submitpartiesbtn = document.getElementById("submitparties");
//#endregion

//#region miscellaneous
var questindex;
var pageindex;
var currentview;
var inputs;
var answerlst = [];
var selectedStatements = [];
var selectedParties = [];
//#endregion

//#region events
startbtn.onclick = function(){launch()};
probtn.onclick = function(){nextPage("pro")};
ambivalentbtn.onclick = function(){nextPage("ambivalent")};
contrabtn.onclick = function(){nextPage("contra")};
skipbtn.onclick = function(){nextPage("none")};
submitstatementsbtn.onclick = function(){submit("statements")};
submitpartiesbtn.onclick = function(){submit("parties")};
//#endregion


function launch(){
    currentview = startform;
    questindex = 0;
    pageindex = 1;

    for(var i = 0; i < backbtn.length; i++) {
        var btn = backbtn[i];
        btn.onclick = function() {
            previousPage();
        }
    }
    setPage();
}

function displaySwitch(fol){
    if (fol != currentview) {
        currentview.style.display = "none";
        fol.style.display = "inline";
        currentview = fol;    
    }
}

function setPage(){
    console.log(formarray[pageindex]);
    displaySwitch(formarray[pageindex]);
    switch (currentview) {
        case questionform:
            setQuestion();
            break;
    
        case statementsform:
            setOptions(currentview);
            break;

        case partiesform:
            setOptions(currentview);
            break;
        
        case resultform:
            setResult();
            break;
    }
}

function resetColor(){
    probtn.style.border = "none";
    ambivalentbtn.style.border = "none";
    contrabtn.style.border = "none";
}

function setColor(current) {
    resetColor();
    switch (current.position) {
            case "pro":
                probtn.style.border = "2px solid blue";
                break;
            case "ambivalent":
                ambivalentbtn.style.border = "2px solid blue";
                break;
            case "contra":
                contrabtn.style.border = "2px solid blue";
                break;
        }
}


function answer(choice){
    answerlst[questindex] = (new pick(choice));

    function pick(position){
        this.position = position;
    }
}

function nextPage(choice){

    if (questindex >= (subjects.length - 1)) {
        pageindex++;
    } 
    if (questindex < subjects.length & questindex >= 0){
        answer(choice);
    }
    questindex++;
    setPage();
}

function previousPage(){
    if (questindex == 0 | questindex >= (subjects.length)) {
        pageindex--;
    }
    questindex--;
    setPage();
}

function setQuestion(){
    document.getElementById("questiontitle").innerHTML = subjects[questindex].title;
    document.getElementById("text").innerHTML = subjects[questindex].statement;
    (questindex >= 0 & typeof(current = answerlst[questindex]) != 'undefined') ? setColor(current) : resetColor();
}

function setOptions(view){
    var list;
    console.log(answerlst);
    
    if (view == statementsform) {
        (list = document.getElementById("statementlist")).innerHTML = ""; 
        subjects.forEach(subject => {
            console.log(list);
            list.innerHTML += "<div><input value='" + subject.title + "'class='w3-check' name='statement' type='checkbox'><label> " + subject.title +"</label></div>";
        });
    }
    else if (view == partiesform){
        (list = document.getElementById("partylist")).innerHTML = "";   
        parties.forEach(party => {
            list.innerHTML += "<div><input value='" + party.name + "'class='w3-check' name='party' type='checkbox'><label> " + party.name +"</label></div>";
        });
    }
    setChecked(view);
}

function setChecked(view){
    inputs = document.getElementsByClassName('w3-check');

    for (i = 0; i < inputs.length; i++) {
        for (a = 0; a < ((view == statementsform)? selectedStatements : selectedParties).length; a++) {
            console.log(inputs[i].value, selectedParties[a], i, a);
            if(view == statementsform){
                if (inputs[i].value == selectedStatements[a]) {
                    inputs[i].checked = true;
                }
            } else {
                if (inputs[i].value == selectedParties[a]) {
                    inputs[i].checked = true;
                } 
            }
        }
    }

}

function submit(array){
    inputs = document.getElementsByClassName('w3-check');
    (((array == "statements")? selectedStatements : selectedParties).length = 0);
    for(i = 0; i < inputs.length; i++){
        if(inputs[i].checked){
            ((array == "statements")? selectedStatements : selectedParties).push(inputs[i].value);
        }
    }
    console.log(selectedStatements, selectedParties);
    nextPage();
}


function setResult(){
    // console.log(statementlst, partylst);
    // displaySwitch(resultform);
}