export default class globalRules {
    constructor(state, lastPlayer, lastPlayerId, HEIGHT, WIDTH) {
        this.state = state
        this.players = state.players
        this.fruits = state.fruits
        this.lastPlayer = lastPlayer
        this.lastPlayerId = lastPlayerId
        this.HEIGHT = HEIGHT
        this.WIDTH = WIDTH
        //console.log(this.fruits)
    }
    setState(newState, lastPlayerId) {
        this.state = newState
        this.lastPlayer = newState.players[lastPlayerId]
    }
    rulesGame(command) {
        switch (command.rule) {
            case  'borderLimiterXR' :
                if ( command.player.x >= this.WIDTH ) { return true }else { return false }
            case  'borderLimiterXL' :
                if ( command.player.x <= 0) { return true }else { return false }
            case  'borderLimiterYT' :
                if (command.player.y <= 0) { return true }else { return false }
            case  'borderLimiterYB' :
                if (command.player.y >= this.HEIGHT) { return true }else { return false }
               
        }
    }
       
    
    chekForCollision(player) {
        //console.log()
        //console.log(`${fruitId} X: ${lastPlayer.x} Y: ${lastPlayer.y} Fruit X: ${fruit.x} Y: ${fruit.y} `)
        for( const fruitId in this.fruits ) {
            //console.log(fruitId)
            if( this.fruits[fruitId].x === player.x && this.fruits[fruitId].y === player.y ) {
            console.log(`Collision bitween ${fruitId} and ${player.playerId}`)
            return fruitId
            }
        }
        return false
    }
        
    aceptedKeys(keypressd, player) {
        //console.log(keypressd)

        switch (keypressd) {
            case 'ArrowUp':
                if ( !this.rulesGame({rule: 'borderLimiterYT', player: player}) ) {
                    //console.log(this.lastPlayer)
                    return  { x: player.x, y: player.y-1 }
                }else {
                    return false
                }
                
            case 'ArrowDown' :
                if ( !this.rulesGame({rule: 'borderLimiterYB', player: player}) ) { 
                    return { x: player.x, y: player.y+1 } 
                }else {
                    return false
                }
                
            case'ArrowRight' : 
                if ( !this.rulesGame({rule: 'borderLimiterXR', player: player}) ) { 
                    return { x: player.x+1, y: player.y } 
                }else {
                    return false
                }
                
            case'ArrowLeft' : 
                if ( !this.rulesGame({rule: 'borderLimiterXL', player: player}) ) { 
                    return { x: player.x-1, y: player.y } 
                }else {
                    return false
                }
                
            default :
                console.log(`wrong key pressed ${keypressd}`)
                break
        }
    }
    
    keyDownPress(event, player) {
       //console.log(event.detail)
        const keypressd = event.detail.key
        const keyResult = this.aceptedKeys(keypressd, player)
        const fruitId = this.chekForCollision(player)
        return {
            keyResult,
            fruitId
        }
        
    }
    

}