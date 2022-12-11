prediction_1 = "";
prediction_2 = "";
Webcam.set({
    height:300,
    width:350,
    image_format: 'jpeg',
    jpeg_quality:100
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version: ", ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LFZjqnXDn/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model has Loaded!");
}


function check(){
    img= document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result-emotion-name1").innerHTML = results[0].label;
        document.getElementById("result-emotion-name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update-emoji1").innerHTML = "&#128515;"
        }

        if(results[0].label == "Sad"){
            document.getElementById("update-emoji1").innerHTML = "&#128532;"
        }

        if(results[0].label == "Angry"){
            document.getElementById("update-emoji1").innerHTML = "&#128545;"
        }

        if(results[0].label == "Surprised"){
            document.getElementById("update-emoji1").innerHTML = "&#128558;"
        }


        if(results[1].label == "Happy"){
            document.getElementById("update-emoji2").innerHTML = "&#128515;"
        }

        if(results[1].label == "Sad"){
            document.getElementById("update-emoji2").innerHTML = "&#128532;"
        }

        if(results[1].label == "Angry"){
            document.getElementById("update-emoji2").innerHTML = "&#128545;"
        }

        if(results[1].label == "Surprised"){
            document.getElementById("update-emoji2").innerHTML = "&#128558;"
        }
    }

}

function speak(){
    var synth = window.speechSynthesis;
    speakdata_1 = "The first prediction is " + prediction_1;
    speakdata_2 = "And the second prediction is " + prediction_2;
    var UtterThis = new SpeechSynthesisUtterance (speakdata_1 + speakdata_2);
    synth.speak(UtterThis);
}
