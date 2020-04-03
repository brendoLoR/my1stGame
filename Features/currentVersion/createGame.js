export default class createGame {
    constructor(){
        this.state = {
                players: {},
                fruits: {}
            };
    }

    addPlayer(command) {
        this.state.players[command.playerId] = {
            nick: command.nick,
            x: command.playerX,
            y: command.playerY,
            score: command.score
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
            nick: this.state.players[command.playerId].nick,
            x: this.state.players[command.playerId].x,
            y: this.state.players[command.playerId].y,
            score: temp
        }
    }
    movePlayer(command){
        this.state.players[command.playerId] = {
                nick: this.state.players[command.playerId].nick,
                x: command.x,
                y: command.y,
                score: this.state.players[command.playerId].score
        }
    }
}