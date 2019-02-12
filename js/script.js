var index;
var answerlst = [];
var startform = document.getElementById("start");
var questionform = document.getElementById("question");
var optionsform = document.getElementById("options");
var resultform = document.getElementById("result");
var startbtn = document.getElementById("startbtn");
var backbtn = document.getElementsByClassName("back");
var probtn = document.getElementById("pro");
var ambivalentbtn = document.getElementById("ambivalent");
var contrabtn = document.getElementById("contra");
var skipbtn = document.getElementById("skip");
var nextbtn = document.getElementById("next");
var checks;
var currentview;
var statementlst;
var partylst;

startbtn.onclick = function(){launch()};
probtn.onclick = function(){nextPage("pro")};
ambivalentbtn.onclick = function(){nextPage("ambivalent")};
contrabtn.onclick = function(){nextPage("contra")};
skipbtn.onclick = function(){nextPage("none")};
nextbtn.onclick = function(){nextPage()};

function launch(){
    currentview = startform;
    index = 0;
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
    console.log(index);
    if (index < 0) {
        displaySwitch(startform);
    }else if (index == subjects.length){
        setOptions("statements");
    }else if (index == (subjects.length + 1)){
        saveOptions();
        setOptions("parties");
    }else if(index > (subjects.length + 1)){
        saveOptions();
        setResult();
    } else {
        setQuestion();
    }
    (index >= 0 & typeof(current = answerlst[index]) != 'undefined') ? setColor(current) : resetColor();

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
    answerlst[index] = (new pick(choice));

    function pick(position){
        this.position = position;
    }
}

function nextPage(choice){
    if (index < subjects.length) {
        answer(choice);    
    }
    index++;
    setPage();
}

function previousPage(){
    index--;
    setPage();
}

function setQuestion(){
    displaySwitch(questionform);
    console.log(index);
    document.getElementById("questiontitle").innerHTML = subjects[index].title;
    document.getElementById("text").innerHTML = subjects[index].statement;
}

function setOptions(view){
    displaySwitch(optionsform);
    var optionlst = document.getElementById("optionslist");
    optionlst.innerHTML = "";
    var text;

    if (view == "statements") {
        subjects.forEach(subject => {
            optionlst.innerHTML += "<div><input id='" + subject.title + "'class='w3-check' name='statement' type='checkbox'><label> " + subject.title +"</label></div>";
        });
        text = "Zijn er onderwerpen die u extra belangrijk vindt?";
    }
    else {
        parties.forEach(party => {
            optionlst.innerHTML += "<div><input id='" + party.name + "'class='w3-check' name='party' type='checkbox' checked ='checked'><label> " + party.name +"</label></div>";
        });
        text = "Welke partijen wilt u meenemen in het resultaat?";
    }
    var statements = document.getElementsByName('statement');
    console.log(statements);

    document.getElementById("optionstext").innerHTML = text;
}

function saveOptions(){
    // statementlst = ((stat = document.getElementsByName('statement')) > 0? stat :  );
    // partylst += ((part = document.getElementsByName('party')) > 0? part : []);
    // var impsub = [];
    // var imppar = [];
    // (statementlst < 0)? save(partylst) : save(statementlst);

    // function save(par) {
    //     console.log("u did" + par);
    //     for (let i = 0; i < par.length; i++) {
    //         if(par[i].checked){
    //             impsub += par[i].id;
    //         }
    //     }
    // }

    ((array == "thing")? arrayname : arrayname2).push(item);
}

function setResult(){
    console.log(statementlst, partylst);
    displaySwitch(resultform);
}