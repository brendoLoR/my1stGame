export default function createKeyBoardListener (state, lastPlayer){
            function rulesGame(){
                function borderLimiterXR (){
                    if (lastPlayer.x >= 280){ return true } else{ return false }
                }
                function borderLimiterXL (){
                    if (lastPlayer.x <= 0){ return true } else{ return false }
                }
                function borderLimiterYT (){
                    if (lastPlayer.y <= 0){ return true } else{ return false }
                }
                function borderLimiterYB (){
                    if (lastPlayer.y >= 280){ return true } else{ return false }
                }
                function chekForCollision () {
                    for( const fruitId in state.fruits) {
                        const fruit = state.fruits[fruitId]
                        console.log(`Player X: ${lastPlayer.x} Y: ${lastPlayer.y} Fruit X: ${fruit.x} Y: ${fruit.y} `)
                        if( fruit.x === lastPlayer.x && fruit.y === lastPlayer.y){
                            console.log(`Collision bitween ${fruitId} and ${lastPlayer.playerId}`)
                            game.removeFruit({fruitId: fruitId})
                        }
                    }
                }
                return{
                    chekForCollision,
                    borderLimiterXR,
                    borderLimiterXL,
                    borderLimiterYT,
                    borderLimiterYB
                }

            }
            
            const aceptedKeys = {
                'ArrowUp' : function () {
                    if (!rulesGame().borderLimiterYT()) {
                        console.log(lastPlayer)
                        return {x: lastPlayer.x, y: lastPlayer.y-1};
                    }
                },'ArrowDown' : function () {
                    if (!rulesGame().borderLimiterYB()) {
                        return {x: lastPlayer.x, y: state.players[player].y+1}
                    }
                },'ArrowRight' : function () {
                    if (!rulesGame().borderLimiterXR()) {
                        return {x: lastPlayer.x+1, y: lastPlayer.y}
                    }
                },'ArrowLeft' : function () {
                    if (!rulesGame().borderLimiterXL()) {
                        return {x: lastPlayer.x-1, y: lastPlayer.y}
                    }
                },
            }
            
            function keyDownPress(event) {
                console.log(event.key)
                const keypressd = event.key
                aceptedKeys[keypressd]()
                rulesGame().chekForCollision()
                
            }
            return {
                rulesGame,
                keyDownPress,
                aceptedKeys
            }

        }