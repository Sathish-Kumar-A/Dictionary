let resultContainer=document.createElement('div');

let bodybox=document.querySelector(".outer");
bodybox.append(resultContainer);

async function search(){
    try{
        let word=document.getElementById("searchbox").value;
    
        const fetchData=await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
        const getData=await fetchData.json();
        detailBox(getData)
    }
    catch{
        window.alert("Sorry no word exists")
    }
    
}

function detailBox(letterArray){
    resultContainer.innerHTML=``;
    resultContainer.setAttribute('class','resultBox');

    let wordSpeak=document.createElement('div');
    wordSpeak.setAttribute('class','wordSpeaker');
    wordSpeak.innerHTML=`
    <button class="speakerbtn" onclick="speak(${letterArray[0].phonetics[0].audio})"><img src="speaker.jpg" class="speakerimg" alt=""></button>
    <h4>${letterArray[0].word} (${letterArray[0].phonetic})</h4>`

    resultContainer.append(wordSpeak);
    
    let meaningtitle=document.createElement('div');
    meaningtitle.setAttribute('class','meanTitle');
    meaningtitle.innerHTML=`<h2>Meanings</h2>`
    resultContainer.append(meaningtitle)
    meaningParts(letterArray[0].meanings)

    
}

function meaningParts(array){
    for(var x of array){
        let meaning=document.createElement('div');
        meaning.setAttribute('class','meaningBox');
        meaning.innerHTML=`
        <h3>${x.partOfSpeech}</h3>
        <p>${x.definitions[0].synonyms.join(", ")}</p>
        <p>${x.definitions[0].antonyms.join(", ")}</p>
        <h5>definition: </h5><p>${x.definitions[0].definition}</p>`
        resultContainer.append(meaning)
    }
}
function speak(audio){
    
}

document.onkeydown=function enter(event){
    if(event.keyCode==13){
        search()
    }
}