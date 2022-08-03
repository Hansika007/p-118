timer_counter = 0;
timer_check = "";
answer_holder = "";
drawn_sketch = "";
quick_draw_data_set = "";

function updateCanvas() 
{
    background("white");
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) +1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById("sketch").innerHTML = 'Sketch To be Drawn: '+ sketch;
}

function preload() 
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() 
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw() 
{
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed)
    {
        line(pmouseX , pmouseY , mouseX , mouseY);
    }

    check_sketch();
    if(drawn_sketch == sketch)
    {
    answer_holder = "set"
    score++;
    document.getElementById('score').innerHTML = 'Score: ' + score;
    }
}

function check_sketch()
{
    timer_counter++;
    document.getElementById("timer").innerHTML = 'Timer: ' + timer_counter;
    console.log(timer_counter);
    if(timer_counter > 400)
    {
    timer_check = "completed";
    }
    if(timer_check =="completed" || answer_holder == "set")
    {
        updateCanvas();
    }
}


function classifyCanvas()
{
    classifier.classify(canvas , gotResult);
}

function gotResult(error , results)
{
    if(error)
    {
        console.log(error);
    }

    else
    {
        console.log(results);
        document.getElementById("label").innerHTML = 'Label : ' + results[0].label;
        document.getElementById("confidence").innerHTML = 'Confidence : ' + Math.round(results[0].confidence * 100) + "%";

        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}
  