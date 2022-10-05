let quistCount = document.querySelector(".count span");
let bullitsCount = document.querySelector('.spans');
let quizArea = document.querySelector('.Quiz_area');
let answerArea = document.querySelector('.answer_area');
let submitBtn = document.querySelector('.submit_btn');
let bullits = document.querySelector('.bullits');
let theResults = document.querySelector('.result');
// setting
let quistnum = 0;
let rightAnswers = 0;

// create get quistions function
function getQustions  (){
    let myRequest = new XMLHttpRequest();
    
    myRequest.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            let quisobj = JSON.parse (this.responseText);

            let quistlength = quisobj.length;

            creatBullits(quistlength);

            addQustionData(quisobj[quistnum],quistlength);

            submitBtn.onclick = () =>{
                let rAnswer = quisobj[quistnum].right_answer;
                
                // increase the currint index
                quistnum++;

                checkAnswer(rAnswer,quistnum);
                // next quistion
                quizArea.innerHTML='';
                answerArea.innerHTML='';
                addQustionData(quisobj[quistnum],quistlength);

                // handle bullts
                handlBullts();
                // show results
                showResults(quistlength);


            }

        }
    }

    myRequest.open("GET","htmle-quistions.json",true);
    myRequest.send();
}

getQustions();

const creatBullits = (num)=> {
quistCount.innerHTML=num;

for(i=0;i<num;i++){
    let bullits = document.createElement('span');
    bullitsCount.appendChild(bullits);

    if(i===0){
        bullits.className="on"
    }
}
}


let  addQustionData = (obj,count)=>{

    if( quistnum < count){

        let title=document.createTextNode(obj.title) ;
    
    let H2 = document.createElement('h2');

    H2.appendChild(title);

    quizArea.appendChild(H2);

    for(i=1;i<=4;i++){
        // create main div
        let mainDiv = document.createElement('div');

        // create claas for main div
        mainDiv.className = 'answer';

        // create radio input
        let radioInput = document.createElement('input');

        // add id + name + type + data-atribute
        radioInput.name = 'quistion';
        
        radioInput.id = `answer_${i}`;

        radioInput.type = 'radio';

        radioInput.dataset.answer = obj[`answer_${i}`];    
        
        if(i===1){
            radioInput.checked=true;
        }

        // create lable
        let theLable = document.createElement('label');

        // create for lable
        theLable.htmlFor = `answer_${i}`;

        // create text lable
        let answerText = document.createTextNode(obj[`answer_${i}`]);

        // append the answer div to answeer area
        answerArea.appendChild(mainDiv);

        // append the input to the div answer
        mainDiv.appendChild(radioInput);

        // append the lable to the answer div
        mainDiv.appendChild(theLable);

        // append the text answer to the lable
        theLable.appendChild(answerText)
    }

    }

    
}

let checkAnswer = (rAnswer,quistnum) => {

    let answers = document.getElementsByName('quistion');
    let choosenAnswer;

    for(let i = 0;i < 4 ;i++){

        if(answers[i].checked){
            choosenAnswer = answers[i].dataset.answer; 
        }
    }
    if(choosenAnswer === rAnswer){
        rightAnswers++;
    }

}


let handlBullts = ()=> {
    let bullitsSpans = document.querySelectorAll('.bullits .spans span');
    let arraySpans = Array.from(bullitsSpans);

    arraySpans.forEach((span,index)=>{
        if(quistnum === index){
            span.className='on'
        };

    });
};


let showResults = (count)=> {
    let result;
    if(quistnum === count){
        quizArea.remove();
        answerArea.remove();
        submitBtn.remove();
        bullits.remove();
    
        if(rightAnswers > (count / 2) && rightAnswers < count){
            result = `<span class= 'good'>  Good</span><br/> <span class= 'res'> you answerd  ${rightAnswers} from ${count}</span>`
        }else if(rightAnswers === count){
            result =  `<span class= 'perfect'>  Perfect </span> <br/> <span class= 'res'> You answerd all the Quistions</span>`
        }else{
            result = `<span class= 'bad'>  Bad</span> <br/> <span class= 'res'>  you answerd  ${rightAnswers} from ${count} </span>`
        }
        
        theResults.innerHTML = result;
    }
}