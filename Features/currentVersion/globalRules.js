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
        switch (command) {
            case  'borderLimiterXR' :
                if ( this.lastPlayer.x >= this.WIDTH ) { return true }else { return false }
            case  'borderLimiterXL' :
                if ( this.lastPlayer.x <= 0) { return true }else { return false }
            case  'borderLimiterYT' :
                if (this.lastPlayer.y <= 0) { return true }else { return false }
            case  'borderLimiterYB' :
                if (this.lastPlayer.y >= this.HEIGHT) { return true }else { return false }
               
        }
    }
       
    
    chekForCollision() {
        //console.log()
        //console.log(`${fruitId} X: ${lastPlayer.x} Y: ${lastPlayer.y} Fruit X: ${fruit.x} Y: ${fruit.y} `)
        for( const fruitId in this.fruits ) {
            //console.log(fruitId)
            if( this.fruits[fruitId].x === this.lastPlayer.x && this.fruits[fruitId].y === this.lastPlayer.y ) {
            console.log(`Collision bitween ${fruitId} and ${this.lastPlayerId}`)
            return fruitId
            }
        }
        return false
    }
        
    aceptedKeys(keypressd) {
        switch (keypressd) {
            case 'ArrowUp':
                if ( !this.rulesGame('borderLimiterYT') ) {
                    //console.log(this.lastPlayer)
                    return  { x: this.lastPlayer.x, y: this.lastPlayer.y-1 }
                }else {
                    return { x: this.lastPlayer.x, y: this.lastPlayer.y }
                }
                
            case 'ArrowDown' :
                if ( !this.rulesGame('borderLimiterYB') ) { 
                    return { x: this.lastPlayer.x, y: this.lastPlayer.y+1 } 
                }else {
                    return { x: this.lastPlayer.x, y: this.lastPlayer.y }
                }
                
            case'ArrowRight' : 
                if ( !this.rulesGame('borderLimiterXR') ) { 
                    return { x: this.lastPlayer.x+1, y: this.lastPlayer.y } 
                }else {
                    return { x: this.lastPlayer.x, y: this.lastPlayer.y }
                }
                
            case'ArrowLeft' : 
                if ( !this.rulesGame('borderLimiterXL') ) { 
                    return { x: this.lastPlayer.x-1, y: this.lastPlayer.y } 
                }else {
                    return { x: this.lastPlayer.x, y: this.lastPlayer.y }
                }
                
            default :
                console.log(`wrong key pressed`)
                break
        }
    }
    
    keyDownPress(event) {
        console.log(event.key)
        const keypressd = event.key
        const keyResult = this.aceptedKeys(keypressd)
        const fruitId = this.chekForCollision()
        return {
            keyResult,
            fruitId
        }
        
    }
    

}