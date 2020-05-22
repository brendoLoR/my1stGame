import ProgressBar from './ML/ProgressBar.js'

export default class createGame {
    constructor() {
        this.state = {
                players: {},
                fruits: {}
            };
    }
    print(){
        console.table(this.state)
    }
    addPlayer(command) {
        this.state.players[command.playerId] = {
            playerId: command.playerId,
            nick: command.nick,
            x: command.playerX,
            y: command.playerY,
            color: 'white',
            score: command.score,
            IA: command.IA

        }
        return command.playerId
    }
    
    removePlayer(command) {
        try{
            delete this.state.players[command.playerId]
        }catch(e){
            console.log(e)
        }
    }

    removeAllPlayers(){
        for(const playerId in this.state.players){
            try{
                delete this.state.players[playerId]
            }catch(e){
                console.log(e)
            }
        }
    }

    addFruit(command) {
        this.state.fruits[command.fruitId] = {
            x: command.fruitX,
            y: command.fruitY
        }
    }

    removeFruit(command) {
        try{
            delete this.state.fruits[command.fruitId]
        }catch(e){
            console.log(e)
        }
    }
    scoreIncrement(command) {
        var temp = this.state.players[command.playerId].score + command.score
        this.state.players[command.playerId]={
            playerId: this.state.players[command.playerId].playerId,
            nick: this.state.players[command.playerId].nick,
            x: this.state.players[command.playerId].x,
            y: this.state.players[command.playerId].y,
            color: this.state.players[command.playerId].color,
            score: temp,
            IA: this.state.players[command.playerId].IA
        }
    }
    getBestScore(){
        let bestScore = 0;
        let bestPlayer = null;
        for(const playerId in this.state.players){
            let temp = this.state.players[playerId].score
            if(temp > bestScore){
                bestScore = temp
                bestPlayer = playerId
            }
        }
        return bestPlayer
    }
    movePlayer(command) {
        this.state.players[command.playerId] = {
                playerId: this.state.players[command.playerId].playerId,
                nick: this.state.players[command.playerId].nick,
                x: command.x,
                y: command.y,
                color: this.state.players[command.playerId].color,
                score: this.state.players[command.playerId].score,
                IA: this.state.players[command.playerId].IA
        }
    }
    trainMovement(command){
        let player = this.state.players[command.playerId]
        let fruit = {x: Math.floor(Math.random() * 98), y: Math.floor(Math.random() * 98)}
        let erro = 0
        let Bar = new ProgressBar()

        let keys = [0, 0, 0, 0] // [up, down, right, left]

        let train = true
        let progress = 0
        let distance = [0, 0]
        for(let x = 0; x <= 150; x++){
           
            console.clear()

            progress = (100*x)/150
            console.log(`${progress} %  erro: ${erro}`)
            
            train = true
            //console.log(keys)
            
            for(let y = 0; y <= 150; y++){
                distance =[player.x - x, player.y - y]
                keys = [0, 0, 0, 0]
                if(distance[0] == 0 && distance[1] == 0){
                    keys = [0, 0, 0, 0]
                }else if(distance[0] == 0 && distance[1] < 0){
                    keys[1] = 1
                }else if(distance[0] == 0 && distance[1] > 0){
                    keys[0] = 1
                }else if(distance[1] == 0 && distance[0] < 0){
                    keys[2] = 1
                }else if(distance[1] == 0 && distance[0] > 0){
                    keys[3] = 1
                }else{
                    if(distance[1] < 0 ){
                        keys[2] = 1
                    }else{
                        keys[3] = 1
                    }
                    if(distance[0] < 0){
                        keys[1] = 1
                    }else{
                        keys[0] = 1
                    }
                } 
                
                //console.log(distance)
                while(train){
                    erro = player.IA.train(distance, keys)
                    //console.log(erro)
                    if(erro < 0.01 && erro > (-0.01)){
                        train = false;
                        //console.log("teinado, Erro: "+ erro)
                        
                    }
                }
            }
        }
    }
    predictMovement(command){
        let playerId = command.playerId
        let player = this.state.players[playerId]
        let fruit = this.state.fruits[command.fruitId]


        let distance = [player.x - fruit.x, player.y - fruit.y]
        
        //console.table(player)
        //console.table(fruit)

        let output = player.IA.predict(distance)
        let key = this.max_array_element(output)
        //console.table(output)
        switch(key){
            case 0:
                return this.simulateKeyPress("ArrowUp", playerId)
            
            case 1:
                return this.simulateKeyPress("ArrowDown", playerId)
            
            case 2:
                return this.simulateKeyPress("ArrowRight", playerId)

            
            case 3:
                return this.simulateKeyPress("ArrowLeft", playerId)
                 
        }
        
    }
    simulateKeyPress(character, playerId) {
        let keyevent = new CustomEvent('keydownIA', {'detail': {'key': character, 'playerId': playerId}})
        return keyevent
    }

    max_array_element(arr) {
        let maior = 0
        let elem = 0;
        for(let i = 0; i <= arr.length; i++){
            //console.log(Math.abs(arr[i]))
            if (Math.abs(arr[i]) > maior){
                maior = Math.abs(arr[i])
                elem = i
            }
        }
        return elem
    }
}