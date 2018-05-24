function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds

    return time;
}

function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}

function initProgressBar() {
    var player = document.getElementById('player');
    var length = player.duration
    var current_time = player.currentTime;

    // calculate total length of value
    var totalLength = calculateTotalValue(length)
    jQuery(".end-time").html(totalLength);

    // calculate current value time
    var currentTime = calculateCurrentValue(current_time);
    jQuery(".start-time").html(currentTime);

    var progressbar = document.getElementById('seekObj');
    progressbar.value = (player.currentTime / player.duration);
    progressbar.addEventListener("click", seek);

    if (player.currentTime == player.duration) {
        $('#play-btn').removeClass('pause');
    }

    function seek(evt) {
        var percent = evt.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        progressbar.value = percent / 100;
    }
};

function initPlayers(num) {
    // pass num in if there are multiple audio players e.g 'player' + i

    for (var i = 0; i < num; i++) {
        (function() {

            // Variables
            // ----------------------------------------------------------
            // audio embed object
            var playerContainer = document.getElementById('player-container'),
                player = document.getElementById('player'),
                isPlaying = false,
                playBtn = document.getElementById('play-btn');

            // Controls Listeners
            // ----------------------------------------------------------
            if (playBtn != null) {
                playBtn.addEventListener('click', function() {
                    togglePlay()
                });
            }

            // Controls & Sounds Methods
            // ----------------------------------------------------------
            function togglePlay() {
                if (player.paused === false) {
                    player.pause();
                    isPlaying = false;
                    $('#play-btn').removeClass('pause');

                } else {
                    player.play();
                    $('#play-btn').addClass('pause');
                    isPlaying = true;
                }
            }
        }());
    }
}

initPlayers(jQuery('#player-container').length);




/*
function removeName(itemid){
    var item = document.getElementById(itemid);
    item.parentNode.removeChild(item);
}*/
function removeName(itemid){
    var item = document.getElementById(itemid);
    //document.getElementById(itemid).outerHTML='';
    if (item.parentNode){
        item.parentNode.removeChild(item);
    }
}


/* choose button */////////////////////////////////////////////////

document.querySelector("#selectFile").addEventListener('change', function (ev) {

    // TO SEE THE NAME OF THE FILE IN THE CONSOLE BUT IS TRASH CODE BECAUSE A NORMAL USER DON'T HAVE THE CONSOLE OPEN.
    // console.log(ev.target.files[0].name);

    document.querySelector("[for='selectFile']").innerHTML = ev.target.files[0].name;

});

/////////////////////////////////////////////////////////////////////////////////// hasta ui button choose
function existeID(num)
{
    var el = document.getElementById("lista").getElementsByTagName("LI");
    for (var i=0; i<el.length; i++)
    {
        if(el[i].firstElementChild.id==num)
            return true;
    }
    return false;
}
//// Añadir a la lista ///////////////////////////////////////////////////////////////
function add_li()
{
    // var file = document.forms['formName']['inputName'].files[0];
    var nuevoLi = document.getElementById('selectFile').files[0].name;
    //var nuevoLi=document.getElementById("selectFile").value;
    var el = document.getElementById("lista").getElementsByTagName("li");
    //var id = el.length + 1;
    var id=Math.floor(Math.random()*65535+1);
    while (existeID(id)===true){
        id = Math.floor(Math.random()*65535+1);
    }
    var aux= "";
    var final = "";
    /*var audio = document.createElement('audio');
    audio.src = "nuevoLi";
    var duracion = audio.duration;*/
    /*var audio = new Audio("cosa.mp3");
    audio.src=document
    duracion = audio.duration;*/
    /*var sound = document.createElement("audio");
    debugger;
    sound.src=window.URL.createObjectURL(document.getElementById('selectFile').files[0]);
    sound.load();
    debugger;
    var duracion = sound.duration;
    debugger;
    window.URL.revokeObjectURL(sound.src);+/
    /*var reader =new FileReader();
    var file = document.getElementById('selectFile').files[0];
    reader.readAsDataURL(file);
    var duracion=reader.duration;*/
    //var duracion=document.getElementById('selectFile').files[0].id3.TLEN;
    var duracion = document.getElementById('selectFile').files[0].duration;
    debugger;
    for (i=0; i<nuevoLi.length; i++){
        if (nuevoLi[i] == '\\'){
            aux = "";
        } else if (nuevoLi[i] == '.'){
            final = aux;
        } else {
            aux = aux + nuevoLi[i];
        }
    }
    nuevoLi = final;
    if(nuevoLi.length>0)
    {
        if(find_li(nuevoLi))
        {
            var li=document.createElement('li');
            li.id=id;
            debugger;
            li.innerHTML="<span>"+nuevoLi+"</span> <span>Instant<input type=\"time\" id=\"" +id+"inst"+  "\" min=\"00:00:00\" max=\"08:00:00\" step=\"1\"><label for=\"" +id+"inst"+  "\"></label></span><span>Panning <input type=\"range\" id=\"" +id+"pan"+  "\" min=\"0\" max=\"100\" step=\"1\"/><label for=\"" +id+"pan"+  "\"></label></span><span>"+duracion+"  &nbsp;&nbsp;<input type=\"checkbox\" id=\"" +id+"l"+  "\"/> <label for=\"" +id+"l"+ "\">Play</label> <button class=\"erasebutton\" onclick= \"removeName(" +id+ ")\"> ❌ </button> </span>";
            debugger;
            document.getElementById("lista").appendChild(li);
        } else {
            // error de archivo ya existe
        }
    }

    return false;
}


function find_li(contenido)
{
    var el = document.getElementById("lista").getElementsByTagName("LI");
    for (var i=0; i<el.length; i++)
    {
        if(el[i].firstElementChild.innerHTML==contenido)
            return false;
    }
    return true;
}


////////////////////////////////////////////////////generar lista pistas////////////////////////////////////////////////


/*
 function loadPro() {
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
 myFunction(this);
 }
 };
 xmlhttp.open("POST", "http://127.0.0.1:5000/getProjectsUser", true);
 xmlhttp.send();
 }

 function myFunction(xml) {
 var i;
 var xmlDoc = xml.responseXML;

 /*
 var list="<div class=\"container\">"+
 "<h1 style=\"color: rgba(177,79,7,0.69)\">Project1</h1>"+
 "<div class=\"dropdown\">"+
 "<button class=\"dropbtn\">Info</button>"+
 "<div class=\"dropdown-content\">"+
 "<a href=\"#myModal1\" data-toggle=\"modal\">Users</a>"+
 "<a href=\"#myModal1\" data-toggle=\"modal\">Description</a>"+
 "<a href=\"#myModal1\" data-toggle=\"modal\">Style</a>"+
 "</div>"+
 "</div>"+
 "<div class=\"modal fade\" id=\"myModal1\" role=\"dialog\">"+
 "<div class=\"modal-dialog\">
 "<div class=\"modal-content\">"+
 "<div class=\"modal-header\">"+
 "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
 "<h4 class=\"modal-title\">Modal Header</h4>"+
 "</div>"+
 "<div class=\"modal-body\">"
 <p>Some text in the modal.</p>
 </div>
 <div class="modal-footer">
 <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
 </div>
 </div>

 </div>
 </div>
 <img src="https://image.freepik.com/free-vector/circle-made-of-music-instruments_23-2147509304.jpg" style="width:100%" style="border-radius:50%;">
 <button class="btn1">Entrar</button>
 <button class="btn">Eliminar</button>
 </div>";*/
/*
 var list = "<span>"+nuevoLi+"</span> <span>"+duracion+"  &nbsp;&nbsp;<input type=\"checkbox\" id=\"" +id+"l"+
 "\"/> <label for=\"" +id+"l"+ "\">Play</label> <button class=\"erasebutton\" onclick= \"removeName(" +id+
 ")\"> ❌ </button> </span>";
 var x = xmlDoc.getElementsByTagName("CD");
 for (i = 0; i <x.length; i++) {
 table += "<tr><td>" +
 x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
 "</td><td>" +
 x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
 "</td></tr>";
 }
 document.getElementById("listaProyectos").innerHTML = list;
 }
 */











