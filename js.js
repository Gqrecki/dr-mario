"use strict";

alert(
    "Sterowanie:\nruch w lewo - strzałka w lewo / a\nruch w prawo - strzałka w prawo / d\nobrót w lewo - strzałka do góry / w\nobrót w prawo - shift\nlose/win - enter"
)

let game = {

    tab: [],
    element: "",
    elements: ["bl_dot", "bl_down", "bl_left", "bl_o", "bl_right", "bl_up", "bl_x", "br_dot", "br_down", "br_left", "br_o", "br_right", "br_up", "br_x", "yl_dot", "yl_down", "yl_left", "yl_o", "yl_right", "yl_up", "yl_x", "bl_covid_blue", "br_covid_brown", "yl_covid_yellow"],
    virus: 0,
    virusbase: 4,
    pom: "",
    pom2: 0,
    pom3: 0,
    pomtab: [],
    pomtab2: [],
    pom4: 0,
    a: 0,
    b: 0,
    level: 1,
    score: 0,
    pomtab3: [],
    pom4: 0,
    xkurwad: 0,
    lose: 0,

    generowanie: function(){
        document.getElementById("background").innerHTML = ""
        if(game.level % 3 == 0){
            var element = document.createElement("img")
            element.src = "img/pf3.png"
            document.getElementById("background").appendChild(element)
        }else if(game.level % 3 == 1){
            var element = document.createElement("img")
            element.src = "img/pf.png"
            document.getElementById("background").appendChild(element)
        }else{
            var element = document.createElement("img")
            element.src = "img/pf2.png"
            document.getElementById("background").appendChild(element)
        }
        virus.blue = 0
        virus.brown = 0
        virus.yellow = 0
        virus.score()
        virus.level()
        virus.top()
        game.virus = game.virusbase
        game.a = 0
        game.b = 0
        game.pom4 = 0
        game.tab = []
        virus.virus()
        document.getElementById("board").innerHTML = ""
        for(let i=0;i<18;i++){
            game.tab.push([])
            for(let o=0;o<8;o++){
                if((i==0 && o==0) 
                || (i==0 && o==1)
                || (i==0 && o==2)
                || (i==0 && o==5)
                || (i==0 && o==6)
                || (i==0 && o==7)
                || (i==1 && o==0)
                || (i==1 && o==1)
                || (i==1 && o==2)
                || (i==1 && o==5)
                || (i==1 && o==6)
                || (i==1 && o==7)){
                    game.tab[i].push(1)
                }else{
                    game.tab[i].push(0)
                }
            }
        }
        game.pom4 = Math.floor(Math.random() * 3)
        for(let p=0;p<game.virus;p++){
            game.a = Math.floor(Math.random() * 12) + 6
            game.b = Math.floor(Math.random() * 8)
            if(game.tab[game.a][game.b] == 0){
                if(game.pom4 % 3 == 0){
                    virus.blue++
                    game.tab[game.a][game.b] = "bl_covid_blue"
                }else if(game.pom4 % 3 == 1){
                    virus.brown++
                    game.tab[game.a][game.b] = "br_covid_brown"
                }else if(game.pom4 % 3 == 2){
                    virus.yellow++
                    game.tab[game.a][game.b] = "yl_covid_yellow"
                }
                game.pom4++
            }else{
                p--
            }
        }
        virus.dance()
        document.getElementById("dance").innerHTML = ""
            for(let i=0;i<8;i++){
                for(let o=0;o<11;o++){
                    var element = document.createElement("div")
                    element.classList.add("div")
                    document.getElementById("dance").appendChild(element)
                    if(virus.blue != 0){
                        if(i==virus.tab[virus.pom%18][0] && o==virus.tab[virus.pom%18][1]){
                            var element = document.createElement("img")
                            element.src = "img/lupa/bl/1.gif"
                            document.getElementById("dance").lastChild.appendChild(element)
                        }
                    }
                    if(virus.brown != 0){
                        if(i==virus.tab[(virus.pom+6)%18][0] && o==virus.tab[(virus.pom+6)%18][1]){
                            var element = document.createElement("img")
                            element.src = "img/lupa/br/1.gif"
                            document.getElementById("dance").lastChild.appendChild(element)
                        }
                    }
                    if(virus.yellow != 0){
                        if(i==virus.tab[(virus.pom+12)%18][0] && o==virus.tab[(virus.pom+12)%18][1]){
                            var element = document.createElement("img")
                            element.src = "img/lupa/yl/1.gif"
                            document.getElementById("dance").lastChild.appendChild(element)
                        }
                    }
                }
            }
            virus.pom++
    },

    refresh: function(){
        document.getElementById("board").innerHTML = ""
        for(let i=0;i<18;i++){
            for(let o=0;o<8;o++){
                var element = document.createElement("div")
                element.classList.add("div")
                document.getElementById("board").appendChild(element)
                var element = document.createElement("img")
                if(game.tab[i][o] == "1"){
                    element.src = "img/null.png"
                }else if(game.tab[i][o] == "0"){
                    element.src = ""
                }else{
                    for(var p=0;p<25;p++){
                        if(game.tab[i][o] == game.elements[p]){
                            element.src = "img/"+game.elements[p]+".png"
                        }
                    }
                }
                document.getElementById("board").lastChild.appendChild(element)   
            }
        }
    },

    fall: function(){
        const godown = setInterval(() => {
            game.pomtab3 = []
            for(let i=0;i<18;i++){
                game.pomtab3.push([])
                for(let o=0;o<8;o++){
                    if((i==0 && o==0) 
                    || (i==0 && o==1)
                    || (i==0 && o==2)
                    || (i==0 && o==5)
                    || (i==0 && o==6)
                    || (i==0 && o==7)
                    || (i==1 && o==0)
                    || (i==1 && o==1)
                    || (i==1 && o==2)
                    || (i==1 && o==5)
                    || (i==1 && o==6)
                    || (i==1 && o==7)){
                        game.pomtab3[i].push(1)
                    }else{
                        game.pomtab3[i].push(0)
                    }
                }
            }
            for(let n=17;n>-1;n--){
                for(let m=7;m>-1;m--){
                    if(n==17){
                        game.pomtab3[n][m] = game.tab[n][m]
                    }else if(String(game.tab[n][m]).substr(3,5) == "covid"){
                        game.pomtab3[n][m] = game.tab[n][m]
                    }
                }
            }
            for(let j=16;j>-1;j--){
                for(let k=7;k>-1;k--){ 
                    if(String(game.tab[j][k]).substr(3,5) == "dot"
                        || String(game.tab[j][k]).substr(3,5) == "down"
                        || String(game.tab[j][k]).substr(3,5) == "up"){
                        if(game.pomtab3[j+1][k] == 0){
                            game.pomtab3[j+1][k] = game.tab[j][k] 
                        }else{
                            game.pomtab3[j][k] = game.tab[j][k]
                        }
                    }else if(String(game.tab[j][k]).substr(3,5) == "right"){
                        if(game.pomtab3[j+1][k] == 0 && game.pomtab3[j+1][k-1] == 0){
                            game.pomtab3[j+1][k] = game.tab[j][k] 
                        }else{
                            game.pomtab3[j][k] = game.tab[j][k]
                        }    
                    }else if(String(game.tab[j][k]).substr(3,5) == "left"){
                        if(game.pomtab3[j+1][k] == 0 && String(game.pomtab3[j+1][k+1]).substr(3,5) == "right"){
                            game.pomtab3[j+1][k] = game.tab[j][k] 
                        }else{
                            game.pomtab3[j][k] = game.tab[j][k]
                        }  
                    }
                }
            }
            game.xkurwad = 0
            for(let v=0;v<18;v++){
                for(let b=0;b<8;b++){
                    if(game.tab[v][b] == game.pomtab3[v][b]){
                    }else{
                        game.xkurwad++
                    }
                }
            }
            if(game.xkurwad == 0){
                clearInterval(godown)
                game.check()
                game.refresh()
            }else{
                game.tab = game.pomtab3
                game.refresh()
            }
        },100)  
    },

    check: function(){
        game.pomtab2 = []
        for(let i=0;i<18;i++){
            for(let o=0;o<5;o++){
                game.pom2 = 0
                game.pom3 = 0
                game.pom = ""
                game.pomtab = []
                if(game.tab[i][o] != 0 && game.tab[i][o] != 1){
                    game.pom = game.tab[i][o].substr(0, 2)
                    game.pomtab.push([i,o])
                    while(game.pom2 == 0){
                        game.pom3++
                        if(game.pom3 + o == 7){
                            if(String(game.tab[i][7]).substr(0, 2) == game.pom){
                                game.pomtab.push([i,7])
                            }
                            game.pom2 = 1
                        }else if(game.tab[i][o + game.pom3] == 0 || game.tab[i][o + game.pom3] == 1){
                            game.pom2 = 1
                        }else{
                            if(game.tab[i][o + game.pom3].substr(0, 2) == game.pom){
                                game.pomtab.push([i, o + game.pom3])
                            }else{
                                game.pom2 = 1
                            }
                        }
                    }
                    if(game.pomtab.length >= 4){
                        for(let p=0;p<game.pomtab.length;p++){
                            game.pomtab2.push(game.pomtab[p])
                        }
                    }

                }
            }
        }
        for(let i=0;i<15;i++){
            for(let o=0;o<8;o++){
                game.pom2 = 0
                game.pom3 = 0
                game.pom = ""
                game.pomtab = []
                if(game.tab[i][o] != 0 && game.tab[i][o] != 1){
                    game.pom = game.tab[i][o].substr(0, 2)
                    game.pomtab.push([i,o])
                    while(game.pom2 == 0){
                        game.pom3++
                        if(game.pom3 + i == 17){
                            if(String(game.tab[17][o]).substr(0, 2) == game.pom){
                                game.pomtab.push([17,o])
                            }
                            game.pom2 = 1
                        }else if(game.tab[i + game.pom3][o] == 0 || game.tab[i + game.pom3][o] == 1){
                            game.pom2 = 1
                        }else{
                            if(game.tab[i + game.pom3][o].substr(0, 2) == game.pom){
                                game.pomtab.push([i + game.pom3, o])
                            }else{
                                game.pom2 = 1
                            }
                        }
                    }
                    if(game.pomtab.length >= 4){
                        for(let p=0;p<game.pomtab.length;p++){
                            game.pomtab2.push(game.pomtab[p])
                        }
                    }

                }
            }
        }
        for(let i=0;i<game.pomtab2.length;i++){
            if(game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] == "bl_covid_blue"){
                game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] = "bl_x"
                game.virus--
                game.score++
                virus.blue--
                virus.blkill = 1
            }else if(game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] == "br_covid_brown"){
                game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] = "br_x"
                game.virus--
                game.score++
                virus.brown--
                virus.brkill = 1
            }else if(game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] == "yl_covid_yellow"){
                game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] = "yl_x"
                game.virus--
                game.score++
                virus.yellow--
                virus.ylkill = 1
            }else if(game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]].substr(0, 2) == "bl"){
                game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] = "bl_o"
            }else if(game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]].substr(0, 2) == "br"){
                game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] = "br_o"
            }else if(game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]].substr(0, 2) == "yl"){
                game.tab[game.pomtab2[i][0]][game.pomtab2[i][1]] = "yl_o"
            }
            game.refresh()

            setTimeout(function(){
                for(let i=0;i<18;i++){
                    for(let o=0;o<8;o++){
                        if(String(game.tab[i][o]).substr(3,4) == "o" || String(game.tab[i][o]).substr(3,4) == "x"){
                            game.tab[i][o] = 0
                        }
                    }
                }
                for(let i=0;i<18;i++){
                    for(let o=0;o<8;o++){
                        if(String(game.tab[i][o]).substr(3,6) == "dot"){
                        }else if(String(game.tab[i][o]).substr(3,5) == "down"){
                            if(game.tab[i-1][o] == 0){
                                game.tab[i][o] =  game.tab[i][o].substr(0,2) + "_dot" 
                            }
                        }else if(String(game.tab[i][o]).substr(3,5) == "up"){
                            if(game.tab[i+1][o] == 0){
                                game.tab[i][o] =  game.tab[i][o].substr(0,2) + "_dot" 
                            }
                        }else if(String(game.tab[i][o]).substr(3,5) == "left"){
                            if(game.tab[i][o+1] == 0){
                                game.tab[i][o] =  game.tab[i][o].substr(0,2) + "_dot" 
                            }
                        }else if(String(game.tab[i][o]).substr(3,5) == "right"){
                            if(game.tab[i][o-1] == 0){
                                game.tab[i][o] =  game.tab[i][o].substr(0,2) + "_dot" 
                            }
                        }
                    }
                }        
                game.refresh()       
            }, 200)

        }
       setTimeout(function(){
            if(game.pomtab2 == 0){
                virus.score()
                virus.virus()
                game.next()
            }else{
                virus.score()
                virus.virus()
                game.fall()
            }
       }, 205)
       
    },

    next: function(){
        if(game.tab[0][3] != 0 || game.tab[0][4] != 0){  //gameover
            game.lose = 1
            game.virusbase = 4
            game.level = 1
            if(game.score > localStorage.getItem("top")){
                localStorage.setItem("top", game.score)
            }
            game.score = 0
            document.getElementById("animation1").innerHTML = ""
            var element = document.createElement("img")
            element.src = "img/go_dr.png"
            element.id = "mario"
            document.getElementById("end").appendChild(element)
            var element = document.createElement("img")
            element.src = "img/go.png"
            element.id = "over"
            document.getElementById("end").appendChild(element)
            document.onkeyup = asciii
            function asciii(key){
                if(key.keyCode == 13){
                    document.onkeyup = null
                    game.lose = 0
                    virus.pom = 0
                    document.getElementById("end").innerHTML = ""
                    game.generowanie()
                    game.refresh()
                    pill.pillpom()
                    pill.pillanimation()
                }
            }
        }else if(game.virus == 0){ //win
            game.level++
            virus.pom = 0
            game.virusbase = game.virusbase + 2
            if(game.virusbase > 96){
                game.virusbase = 96
            }
            var element = document.createElement("img")
            element.src = "img/sc.png"
            element.id = "win"
            document.getElementById("end").appendChild(element)
            document.onkeyup = asciii
            function asciii(key){
                if(key.keyCode == 13){
                    document.onkeyup = null
                    document.getElementById("end").innerHTML = ""
                    game.generowanie()
                    game.refresh()
                    pill.pillpom()
                    pill.pillanimation()
                }
            }
        }else{
            pill.pillanimation()   
        }
    }
    
}

let pill = {

    pillX: 3,
    pillY: 0,
    pillZ: "side", //side-up
    pom: 0,
    pom2: 0,
    pom3: 0,
    element: "",
    tab: [[3,10,"left",3,11,"right"],
        [3,10,"down",2,10,"up"],
        [2,10,"right",2,9,"left"],
        [1,9,"up",2,9,"down"],
        [1,8,"left",1,9,"right"],
        [1,8,"down",0,8,"up"],
        [1,8,"right",1,7,"left"],
        [0,7,"up",1,7,"down"],
        [1,6,"left",1,7,"right"],
        [1,6,"down",0,6,"up"],
        [1,6,"right",1,5,"left"],
        [0,5,"up",1,5,"down"],
        [1,4,"left",1,5,"right"],
        [1,4,"down",0,4,"up"],
        [1,4,"right",1,3,"left"],
        [0,3,"up",1,3,"down"],
        [1,2,"left",1,3,"right"],
        [1,2,"down",0,2,"up"],
        [2,2,"right",2,1,"left"],
        [1,1,"up",2,1,"down"],
        [2,0,"left",2,1,"right"],
        [3,0,"left",3,1,"right"]
    ],
    pom4: 0,
    pom5: 0,
    pom6: 0,
    pom7: 0,


    pillpom: function(){
        pill.pom = Math.floor(Math.random() * 3)
        pill.pom2 = Math.floor(Math.random() * 3)
    },

    pillanimation: function(){
        pill.pom6 = pill.pom
        pill.pom7 = pill.pom2
    const pixa = setInterval(() => {    
        document.getElementById("animation1").innerHTML = ""
        for(let i=0;i<8;i++){
            for(let o=0;o<12;o++){
                var element = document.createElement("div")
                element.classList.add("div")
                document.getElementById("animation1").appendChild(element)
                var element = document.createElement("img")
                if(i==pill.tab[pill.pom3][0] && o==pill.tab[pill.pom3][1]){
                    if(pill.pom==0){
                        element.src = "img/bl_"+pill.tab[pill.pom3][2]+".png"
                    }else if(pill.pom==1){
                        element.src = "img/br_"+pill.tab[pill.pom3][2]+".png"
                    }else if(pill.pom==2){
                        element.src = "img/yl_"+pill.tab[pill.pom3][2]+".png"
                    } 
                }else if(i==pill.tab[pill.pom3][3] && o==pill.tab[pill.pom3][4]){
                    if(pill.pom2==0){
                        element.src = "img/bl_"+pill.tab[pill.pom3][5]+".png"
                    }else if(pill.pom2==1){
                        element.src = "img/br_"+pill.tab[pill.pom3][5]+".png"
                    }else if(pill.pom2==2){
                        element.src = "img/yl_"+pill.tab[pill.pom3][5]+".png"
                    } 
                }else if(pill.pom3<4){
                    if(i==4 && o==11){
                        element.src = "img/hands/up_1.png"
                    }else if(i==5 && o==11){
                        element.src = "img/hands/up_2.png"
                    }else if(i==6 && o==11){
                        element.src = "img/hands/up_3.png"
                    }else{
                        element.src = "img/null.png"
                    }
                }else if(pill.pom3<8){
                    if(i==5 && o==10){
                        element.src = "img/hands/middle11.png"
                    }else if(i==5 && o==11){
                        element.src = "img/hands/middle12.png"
                    }else if(i==6 && o==10){
                        element.src = "img/hands/middle21.png"
                    }else if(i==6 && o==11){
                        element.src = "img/hands/middle22.png"
                    }else{
                        element.src = "img/null.png"
                    }
                }else if(pill.pom3<23){
                    if(i==6 && o==11){
                        element.src = "img/hands/down_1.png"
                    }else if(i==7 && o==11){
                        element.src = "img/hands/down_2.png"
                    }else{
                        element.src = "img/null.png"
                    }
                }else{
                    element.src = "img/null.png"
                }
            
                document.getElementById("animation1").lastChild.appendChild(element)
            }
        }
        pill.pom3++
        if(pill.pom3 == 22){
            clearInterval(pixa)
            pill.pom3 = 0
            pill.makepill()
            const clear = setTimeout(() => { 
                pill.pillpom()
                document.getElementById("animation1").innerHTML = ""
                for(let i=0;i<8;i++){
                    for(let o=0;o<12;o++){
                        var element = document.createElement("div")
                        element.classList.add("div")
                        document.getElementById("animation1").appendChild(element)
                        var element = document.createElement("img")
                        if(i==pill.tab[pill.pom3][0] && o==pill.tab[pill.pom3][1]){
                            if(pill.pom==0){
                                element.src = "img/bl_"+pill.tab[pill.pom3][2]+".png"
                            }else if(pill.pom==1){
                                element.src = "img/br_"+pill.tab[pill.pom3][2]+".png"
                            }else if(pill.pom==2){
                                element.src = "img/yl_"+pill.tab[pill.pom3][2]+".png"
                            } 
                        }else if(i==pill.tab[pill.pom3][3] && o==pill.tab[pill.pom3][4]){
                            if(pill.pom2==0){
                                element.src = "img/bl_"+pill.tab[pill.pom3][5]+".png"
                            }else if(pill.pom2==1){
                                element.src = "img/br_"+pill.tab[pill.pom3][5]+".png"
                            }else if(pill.pom2==2){
                                element.src = "img/yl_"+pill.tab[pill.pom3][5]+".png"
                            } 
                        }else if(i==4 && o==11){
                            element.src = "img/hands/up_1.png"
                        }else if(i==5 && o==11){
                            element.src = "img/hands/up_2.png"
                        }else if(i==6 && o==11){
                            element.src = "img/hands/up_3.png"
                        }else{
                            element.src = "img/null.png"
                        }
                        document.getElementById("animation1").lastChild.appendChild(element)
                    }
                }    
            },20)
        }
    },20)
    },

    makepill: function(){
        if(pill.pom == 0){
            game.tab[0][3] = "bl_left"
        }else if(pill.pom == 1){
            game.tab[0][3] = "br_left"
        }else if(pill.pom == 2){
            game.tab[0][3] = "yl_left"
        }
        if(pill.pom2 == 0){
            game.tab[0][4] = "bl_right"
        }else if(pill.pom2 == 1){
            game.tab[0][4] = "br_right"
        }else if(pill.pom2 == 2){
            game.tab[0][4] = "yl_right"
        }
        game.refresh()
        pill.start()
    },

    start: function(){
        document.onkeyup = ascii
        function ascii(key){
            if(key.keyCode == 37 || key.keyCode == 65){ //lewo
                if(pill.pillZ == "side"){
                    if(game.tab[pill.pillY][pill.pillX - 1] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY][pill.pillX + 1]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY][pill.pillX + 1] = 0
                        game.tab[pill.pillY][pill.pillX - 1] = pill.pom4
                        game.tab[pill.pillY][pill.pillX] = pill.pom5
                        pill.pillX--
                        game.refresh()
                    }
                }else if(pill.pillZ == "up"){
                    if(game.tab[pill.pillY][pill.pillX - 1] == 0 && game.tab[pill.pillY - 1][pill.pillX - 1] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY - 1][pill.pillX] = 0
                        game.tab[pill.pillY][pill.pillX - 1] = pill.pom4
                        game.tab[pill.pillY - 1][pill.pillX - 1] = pill.pom5
                        pill.pillX--
                        game.refresh()
                    }
                }
            }else if(key.keyCode == 39 || key.keyCode == 68){ //prawo
                if(pill.pillZ == "side"){
                    if(game.tab[pill.pillY][pill.pillX + 2] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY][pill.pillX + 1]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY][pill.pillX + 1] = 0
                        game.tab[pill.pillY][pill.pillX + 1] = pill.pom4
                        game.tab[pill.pillY][pill.pillX + 2] = pill.pom5
                        pill.pillX++
                        game.refresh()
                    }
                }else if(pill.pillZ == "up"){
                    if(game.tab[pill.pillY][pill.pillX + 1] == 0 && game.tab[pill.pillY - 1][pill.pillX + 1] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY - 1][pill.pillX] = 0
                        game.tab[pill.pillY][pill.pillX + 1] = pill.pom4
                        game.tab[pill.pillY - 1][pill.pillX + 1] = pill.pom5
                        pill.pillX++
                        game.refresh()
                    }
                }
            }else if(key.keyCode == 38 || key.keyCode == 87){ //obrót w lewo
                if(pill.pillZ == "side"){
                    if(pill.pillY == 0 || 
                        (pill.pillY == 2 && pill.pillX == 0) ||
                        (pill.pillY == 2 && pill.pillX == 1) ||
                        (pill.pillY == 2 && pill.pillX == 2) ||
                        (pill.pillY == 2 && pill.pillX == 5) ||
                        (pill.pillY == 2 && pill.pillX == 6)){
                    }else if(game.tab[pill.pillY - 1][pill.pillX] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY][pill.pillX + 1]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY][pill.pillX + 1] = 0
                        if(pill.pom4 == "bl_left"){
                            pill.pom6 = "bl_down"
                        }else if(pill.pom4 == "br_left"){
                            pill.pom6 = "br_down"
                        }else if(pill.pom4 == "yl_left"){
                            pill.pom6 = "yl_down"
                        }
                        if(pill.pom5 == "bl_right"){
                            pill.pom7 = "bl_up"
                        }else if(pill.pom5 == "br_right"){
                            pill.pom7 = "br_up"
                        }else if(pill.pom5 == "yl_right"){
                            pill.pom7 = "yl_up"
                        }
                        game.tab[pill.pillY][pill.pillX] = pill.pom6
                        game.tab[pill.pillY - 1][pill.pillX] = pill.pom7
                        pill.pillZ = "up"
                        game.refresh()
                    }
                }else if(pill.pillZ == "up"){
                    if(pill.pillX == 7){
                        if(game.tab[pill.pillY][pill.pillX - 1] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY - 1][pill.pillX] = 0
                        if(pill.pom4 == "bl_down"){
                            pill.pom6 = "bl_right"
                        }else if(pill.pom4 == "br_down"){
                            pill.pom6 = "br_right"
                        }else if(pill.pom4 == "yl_down"){
                            pill.pom6 = "yl_right"
                        }
                        if(pill.pom5 == "bl_up"){
                            pill.pom7 = "bl_left"
                        }else if(pill.pom5 == "br_up"){
                            pill.pom7 = "br_left"
                        }else if(pill.pom5 == "yl_up"){
                            pill.pom7 = "yl_left"
                        }
                        game.tab[pill.pillY][pill.pillX - 1] = pill.pom7
                        game.tab[pill.pillY][pill.pillX] = pill.pom6
                        pill.pillX = pill.pillX - 1
                        pill.pillZ = "side"
                        game.refresh()
                        }
                    }else if(game.tab[pill.pillY][pill.pillX + 1] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY - 1][pill.pillX] = 0
                        if(pill.pom4 == "bl_down"){
                            pill.pom6 = "bl_right"
                        }else if(pill.pom4 == "br_down"){
                            pill.pom6 = "br_right"
                        }else if(pill.pom4 == "yl_down"){
                            pill.pom6 = "yl_right"
                        }
                        if(pill.pom5 == "bl_up"){
                            pill.pom7 = "bl_left"
                        }else if(pill.pom5 == "br_up"){
                            pill.pom7 = "br_left"
                        }else if(pill.pom5 == "yl_up"){
                            pill.pom7 = "yl_left"
                        }
                        game.tab[pill.pillY][pill.pillX] = pill.pom7
                        game.tab[pill.pillY][pill.pillX + 1] = pill.pom6
                        pill.pillZ = "side"
                        game.refresh()
                    }
                }
            }else if(key.keyCode == 16){ //obrót prawo
                if(pill.pillZ == "side"){
                    if(pill.pillY == 0 || 
                        (pill.pillY == 2 && pill.pillX == 0) ||
                        (pill.pillY == 2 && pill.pillX == 1) ||
                        (pill.pillY == 2 && pill.pillX == 2) ||
                        (pill.pillY == 2 && pill.pillX == 5) ||
                        (pill.pillY == 2 && pill.pillX == 6)){
                    }else if(game.tab[pill.pillY - 1][pill.pillX] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY][pill.pillX + 1]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY][pill.pillX + 1] = 0
                        if(pill.pom4 == "bl_left"){
                            pill.pom6 = "bl_up"
                        }else if(pill.pom4 == "br_left"){
                            pill.pom6 = "br_up"
                        }else if(pill.pom4 == "yl_left"){
                            pill.pom6 = "yl_up"
                        }
                        if(pill.pom5 == "bl_right"){
                            pill.pom7 = "bl_down"
                        }else if(pill.pom5 == "br_right"){
                            pill.pom7 = "br_down"
                        }else if(pill.pom5 == "yl_right"){
                            pill.pom7 = "yl_down"
                        }
                        game.tab[pill.pillY][pill.pillX] = pill.pom7
                        game.tab[pill.pillY - 1][pill.pillX] = pill.pom6
                        pill.pillZ = "up"
                        game.refresh()
                    }
                }else if(pill.pillZ == "up"){
                    if(pill.pillX == 7){
                        if(game.tab[pill.pillY][pill.pillX - 1] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY - 1][pill.pillX] = 0
                        if(pill.pom4 == "bl_down"){
                            pill.pom6 = "bl_right"
                        }else if(pill.pom4 == "br_down"){
                            pill.pom6 = "br_right"
                        }else if(pill.pom4 == "yl_down"){
                            pill.pom6 = "yl_right"
                        }
                        if(pill.pom5 == "bl_up"){
                            pill.pom7 = "bl_left"
                        }else if(pill.pom5 == "br_up"){
                            pill.pom7 = "br_left"
                        }else if(pill.pom5 == "yl_up"){
                            pill.pom7 = "yl_left"
                        }
                        game.tab[pill.pillY][pill.pillX - 1] = pill.pom7
                        game.tab[pill.pillY][pill.pillX] = pill.pom6
                        pill.pillX = pill.pillX - 1
                        pill.pillZ = "side"
                        game.refresh()
                        }
                    }else if(game.tab[pill.pillY][pill.pillX + 1] == 0){
                        pill.pom4 = game.tab[pill.pillY][pill.pillX]
                        pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                        game.tab[pill.pillY][pill.pillX] = 0
                        game.tab[pill.pillY - 1][pill.pillX] = 0
                        if(pill.pom4 == "bl_down"){
                            pill.pom6 = "bl_left"
                        }else if(pill.pom4 == "br_down"){
                            pill.pom6 = "br_left"
                        }else if(pill.pom4 == "yl_down"){
                            pill.pom6 = "yl_left"
                        }
                        if(pill.pom5 == "bl_up"){
                            pill.pom7 = "bl_right"
                        }else if(pill.pom5 == "br_up"){
                            pill.pom7 = "br_right"
                        }else if(pill.pom5 == "yl_up"){
                            pill.pom7 = "yl_right"
                        }
                        game.tab[pill.pillY][pill.pillX] = pill.pom6
                        game.tab[pill.pillY][pill.pillX + 1] = pill.pom7
                        pill.pillZ = "side"
                        game.refresh()
                    }
                }
            }else if(key.keyCode == 40 || key.keyCode == 83){ //dół
                clearInterval(fall)
                const falll = setInterval(() => {
                    if(pill.pillZ == "side"){ 
                        if(pill.pillY == 17){
                            document.onkeyup = null
                            clearInterval(falll)
                            pill.pillX = 3
                            pill.pillY = 0
                            pill.pillZ = "side"
                            game.check()
                        }else if(game.tab[pill.pillY + 1][pill.pillX] == 0 && game.tab[pill.pillY + 1][pill.pillX + 1] == 0){
                            pill.pom4 = game.tab[pill.pillY][pill.pillX]
                            pill.pom5 = game.tab[pill.pillY][pill.pillX + 1]
                            game.tab[pill.pillY][pill.pillX] = 0
                            game.tab[pill.pillY][pill.pillX + 1] = 0
                            game.tab[pill.pillY + 1][pill.pillX] = pill.pom4
                            game.tab[pill.pillY + 1][pill.pillX + 1] = pill.pom5
                            pill.pillY++
                            game.refresh()
                        }else{
                            document.onkeyup = null
                            clearInterval(falll)
                            pill.pillX = 3
                            pill.pillY = 0
                            pill.pillZ = "side"
                            game.check()
                        }
                    }else if(pill.pillZ == "up"){
                        if(pill.pillY == 17){
                            document.onkeyup = null
                            clearInterval(falll)
                            pill.pillX = 3
                            pill.pillY = 0
                            pill.pillZ = "side"
                            game.check()
                        }else if(game.tab[pill.pillY + 1][pill.pillX] == 0){
                            pill.pom4 = game.tab[pill.pillY][pill.pillX]
                            pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                            game.tab[pill.pillY][pill.pillX] = 0
                            game.tab[pill.pillY - 1][pill.pillX] = 0
                            game.tab[pill.pillY + 1][pill.pillX] = pill.pom4
                            game.tab[pill.pillY][pill.pillX] = pill.pom5
                            pill.pillY++
                            game.refresh()
                        }else{
                            document.onkeyup = null
                            clearInterval(falll)
                            pill.pillX = 3
                            pill.pillY = 0
                            pill.pillZ = "side"
                            game.check()
                        }
                    }
                }, 10)
            }
        }
        const fall = setInterval(() => {
            if(pill.pillZ == "side"){ 
                if(pill.pillY == 17){
                    document.onkeyup = null
                    clearInterval(fall)
                    pill.pillX = 3
                    pill.pillY = 0
                    pill.pillZ = "side"
                    game.check()
                }else if(game.tab[pill.pillY + 1][pill.pillX] == 0 && game.tab[pill.pillY + 1][pill.pillX + 1] == 0){
                    pill.pom4 = game.tab[pill.pillY][pill.pillX]
                    pill.pom5 = game.tab[pill.pillY][pill.pillX + 1]
                    game.tab[pill.pillY][pill.pillX] = 0
                    game.tab[pill.pillY][pill.pillX + 1] = 0
                    game.tab[pill.pillY + 1][pill.pillX] = pill.pom4
                    game.tab[pill.pillY + 1][pill.pillX + 1] = pill.pom5
                    pill.pillY++
                    game.refresh()
                }else{
                    document.onkeyup = null
                    clearInterval(fall)
                    pill.pillX = 3
                    pill.pillY = 0
                    pill.pillZ = "side"
                    game.check()
                }
            }else if(pill.pillZ == "up"){
                if(pill.pillY == 17){
                    document.onkeyup = null
                    clearInterval(fall)
                    pill.pillX = 3
                    pill.pillY = 0
                    pill.pillZ = "side"
                    game.check()
                }else if(game.tab[pill.pillY + 1][pill.pillX] == 0){
                    pill.pom4 = game.tab[pill.pillY][pill.pillX]
                    pill.pom5 = game.tab[pill.pillY - 1][pill.pillX]
                    game.tab[pill.pillY][pill.pillX] = 0
                    game.tab[pill.pillY - 1][pill.pillX] = 0
                    game.tab[pill.pillY + 1][pill.pillX] = pill.pom4
                    game.tab[pill.pillY][pill.pillX] = pill.pom5
                    pill.pillY++
                    game.refresh()
                }else{
                    document.onkeyup = null
                    clearInterval(fall)
                    pill.pillX = 3
                    pill.pillY = 0
                    pill.pillZ = "side"
                    game.check()
                }
            }
        },1000)
    }
}

let virus = {

    blue: 0,
    brown: 0,
    yellow: 0,
    tab: [[2,0],[2,0],[3,0],[4,1],[5,1],[5,2],[5,3],[5,4],[5,5],[4,6],[3,6],[2,6],[1,6],[0,5],[0,4],[0,3],[0,2],[1,1]],
    pom: 0,
    blkill: 0,
    brkill: 0,
    ylkill: 0,

    level: function(){
        if(game.level > 47){
            game.level = 47
        }
        document.getElementById("level").innerHTML = ""
        if(((game.level).toString()).length == 1){
            var element = document.createElement("img")
            element.src = "img/cyfry/0.png"
            document.getElementById("level").appendChild(element)
            var element = document.createElement("img")
            element.src = "img/cyfry/" + game.level + ".png"
            document.getElementById("level").appendChild(element)
        }else{
            var element = document.createElement("img")
            element.src = "img/cyfry/" + (game.level).toString()[0] + ".png"
            document.getElementById("level").appendChild(element)
            var element = document.createElement("img")
            element.src = "img/cyfry/" + (game.level).toString()[1] + ".png"
            document.getElementById("level").appendChild(element)
        }

    },

    virus: function(){
        document.getElementById("virus").innerHTML = ""
        if(((game.virus).toString()).length == 1){
            var element = document.createElement("img")
            element.src = "img/cyfry/0.png"
            document.getElementById("virus").appendChild(element)
            var element = document.createElement("img")
            element.src = "img/cyfry/" + game.virus + ".png"
            document.getElementById("virus").appendChild(element)
        }else{
            var element = document.createElement("img")
            element.src = "img/cyfry/" + (game.virus).toString()[0] + ".png"
            document.getElementById("virus").appendChild(element)
            var element = document.createElement("img")
            element.src = "img/cyfry/" + (game.virus).toString()[1] + ".png"
            document.getElementById("virus").appendChild(element)
        }
    },

    score: function(){
        document.getElementById("score").innerHTML = ""
        if(((game.score).toString()).length == 1){
            for(let i=0;i<4;i++){
                var element = document.createElement("img")
                element.src = "img/cyfry/0.png"
                document.getElementById("score").appendChild(element)
            }
            var element = document.createElement("img")
            element.src = "img/cyfry/" + (game.score).toString()[0] + ".png"
            document.getElementById("score").appendChild(element)
        }else if(((game.score).toString()).length == 2){
            for(let i=0;i<3;i++){
                var element = document.createElement("img")
                element.src = "img/cyfry/0.png"
                document.getElementById("score").appendChild(element)
            }
            for(let o=0;o<2;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (game.score).toString()[o] + ".png"
                document.getElementById("score").appendChild(element) 
            }
        }else if(((game.score).toString()).length == 3){
            for(let i=0;i<2;i++){
                var element = document.createElement("img")
                element.src = "img/cyfry/0.png"
                document.getElementById("score").appendChild(element)
            }
            for(let o=0;o<3;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (game.score).toString()[o] + ".png"
                document.getElementById("score").appendChild(element) 
            }
        }else if(((game.score).toString()).length == 4){
            var element = document.createElement("img")
            element.src = "img/cyfry/0.png"
            document.getElementById("score").appendChild(element)
            for(let o=0;o<4;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (game.score).toString()[o] + ".png"
                document.getElementById("score").appendChild(element) 
            }
        }else if(((game.score).toString()).length == 5){
            for(let o=0;o<5;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (game.score).toString()[o] + ".png"
                document.getElementById("score").appendChild(element) 
            }
        }
    },

    top: function(){
        document.getElementById("top").innerHTML = ""
        if(localStorage.getItem("top") == null){
            for(let i=0;i<5;i++){
                var element = document.createElement("img")
                element.src = "img/cyfry/0.png"
                document.getElementById("top").appendChild(element)
            }
        }else if(((localStorage.getItem("top")).toString()).length == 1){
            for(let i=0;i<4;i++){
                var element = document.createElement("img")
                element.src = "img/cyfry/0.png"
                document.getElementById("top").appendChild(element)
            }
            var element = document.createElement("img")
            element.src = "img/cyfry/" + (localStorage.getItem("top")).toString()[0] + ".png"
            document.getElementById("top").appendChild(element)
        }else if(((localStorage.getItem("top")).toString()).length == 2){
            for(let i=0;i<3;i++){
                var element = document.createElement("img")
                element.src = "img/cyfry/0.png"
                document.getElementById("top").appendChild(element)
            }
            for(let o=0;o<2;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (localStorage.getItem("top")).toString()[o] + ".png"
                document.getElementById("top").appendChild(element) 
            }
        }else if(((localStorage.getItem("top")).toString()).length == 3){
            for(let i=0;i<2;i++){
                var element = document.createElement("img")
                element.src = "img/cyfry/0.png"
                document.getElementById("top").appendChild(element)
            }
            for(let o=0;o<3;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (localStorage.getItem("top")).toString()[o] + ".png"
                document.getElementById("top").appendChild(element) 
            }
        }else if(((localStorage.getItem("top")).toString()).length == 4){
            var element = document.createElement("img")
            element.src = "img/cyfry/0.png"
            document.getElementById("top").appendChild(element)
            for(let o=0;o<4;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (localStorage.getItem("top")).toString()[o] + ".png"
                document.getElementById("top").appendChild(element) 
            }
        }else if(((glocalStorage.getItem("top")).toString()).length == 5){
            for(let o=0;o<5;o++){
                var element = document.createElement("img")
                element.src = "img/cyfry/" + (localStorage.getItem("top")).toString()[o] + ".png"
                document.getElementById("top").appendChild(element) 
            }
        }
    },

    dance: function(){
        const dance = setInterval(() => {    
            document.getElementById("dance").innerHTML = ""
            for(let i=0;i<8;i++){
                for(let o=0;o<11;o++){
                    var element = document.createElement("div")
                    element.classList.add("div")
                    document.getElementById("dance").appendChild(element)

                    if(game.lose == 1){
                        clearInterval(dance)
                        if(virus.blue != 0){
                            if(i==virus.tab[virus.pom%18][0] && o==virus.tab[virus.pom%18][1]){
                                var element = document.createElement("img")
                                element.src = "img/lupa/bl/3.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                            }
                        }
                        if(virus.brown != 0){
                            if(i==virus.tab[(virus.pom+6)%18][0] && o==virus.tab[(virus.pom+6)%18][1]){
                                var element = document.createElement("img")
                                element.src = "img/lupa/br/3.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                            }
                        }
                        if(virus.yellow != 0){
                            if(i==virus.tab[(virus.pom+12)%18][0] && o==virus.tab[(virus.pom+12)%18][1]){
                                var element = document.createElement("img")
                                element.src = "img/lupa/yl/3.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                            }
                        }
                    }else{
                        if(virus.blkill == 1){
                            if(i==virus.tab[virus.pom%18][0] && o==virus.tab[virus.pom%18][1]){
                                clearInterval(dance)
                                var element = document.createElement("img")
                                element.src = "img/lupa/bl/2.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                                setTimeout(function(){
                                    virus.blkill = 0
                                    virus.dance()
                                },1000)
                            }
                        }else if(virus.blue != 0){
                            if(i==virus.tab[virus.pom%18][0] && o==virus.tab[virus.pom%18][1]){
                                var element = document.createElement("img")
                                element.src = "img/lupa/bl/1.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                            }
                        }
                        if(virus.brkill == 1){
                            if(i==virus.tab[(virus.pom+6)%18][0] && o==virus.tab[(virus.pom+6)%18][1]){
                                clearInterval(dance)
                                var element = document.createElement("img")
                                element.src = "img/lupa/br/2.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                                setTimeout(function(){
                                    virus.brkill = 0
                                    virus.dance()
                                },1000)
                            }
                        }else if(virus.brown != 0){
                            if(i==virus.tab[(virus.pom+6)%18][0] && o==virus.tab[(virus.pom+6)%18][1]){
                                var element = document.createElement("img")
                                element.src = "img/lupa/br/1.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                            }
                        }
                        if(virus.ylkill == 1){
                            if(i==virus.tab[(virus.pom+12)%18][0] && o==virus.tab[(virus.pom+12)%18][1]){
                                clearInterval(dance)
                                var element = document.createElement("img")
                                element.src = "img/lupa/yl/2.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                                setTimeout(function(){
                                    virus.ylkill = 0
                                    virus.dance()
                                },1000)
                            }
                        }else if(virus.yellow != 0){
                            if(i==virus.tab[(virus.pom+12)%18][0] && o==virus.tab[(virus.pom+12)%18][1]){
                                var element = document.createElement("img")
                                element.src = "img/lupa/yl/1.gif"
                                document.getElementById("dance").lastChild.appendChild(element)
                            }
                        }
                    }
                }
            }
            virus.pom++
        },1000)
    }
}

game.generowanie()
game.refresh()
pill.pillpom()
pill.pillanimation()