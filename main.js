function setup()
{
    canvas = createCanvas(280, 200);
    canvas.center();
    background("white");
    canvas.mouseReleased(ClassifyCanvas);
    man = window.speechSynthesis;
}

function clearCanvas()
{
    background("white");
}

function preload() {
    Classifier = ml5.imageClassifier("DoodleNet");
}

function draw() 
{
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX , pmouseY , mouseX, mouseY);
    }
}

function ClassifyCanvas() 
{
    Classifier.classify(canvas , gotResult);
}

function gotResult (error, results)
{
    if(error)
    {
        console.error("error");
    }
    console.log(results);

    document.getElementById("label").innerHTML = 'Label: ' + results[0].label;
    document.getElementById("confidence").innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + "%";
    speech = SpeechSynthesisUtterance(results[0].label);
    man.speak(speech);
}