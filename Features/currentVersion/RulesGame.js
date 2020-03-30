class RulesGame {
    constructor(state, lastPlayer) {
        this.state = state
        this.lastPlayer = lastPlayer
    }

    borderLimiterXR() {
        if (this.lastPlayer.x >= 280)
            return true
        return false
    }

    borderLimiterXL() {
        if (this.lastPlayer.x <= 0)
            return true
        return false
    }

    borderLimiterYT() {
        if (this.lastPlayer.y <= 0)
            return true
        return false
    }

    borderLimiterYB() {
        if (this.lastPlayer.y >= 280)
            return true
        return false
    }

    chekForCollision(fruit, fruitId) {
        //console.log()
        //console.log(`${fruitId} X: ${lastPlayer.x} Y: ${lastPlayer.y} Fruit X: ${fruit.x} Y: ${fruit.y} `)
        if (fruit.x === this.lastPlayer.x && fruit.y === this.lastPlayer.y) {
            console.log(`Collision bitween ${fruitId} and ${this.lastPlayer.playerId}`)
            return true
        }
        return false
    }

    checkKyes(keypressed) {
        console.log(keypressed);
        switch (keypressed) {
            case "ArrowUp":
                if (borderLimiterYT()) {
                    console.log(this.lastPlayer)
                    return {
                        x: this.lastPlayer.x, y: this.lastPlayer.y - 1
                    }
                }
                break;
            case 'ArrowDown':
                if (borderLimiterYB()) {
                    return {
                        x: this.lastPlayer.x, y: this.lastPlayer.y + 1
                    }
                }
                break;
            case 'ArrowRight':
                if (borderLimiterXR()) {
                    return {
                        x: this.lastPlayer.x + 1, y: this.lastPlayer.y
                    }
                }
                break;
            case 'ArrowLeft':
                if (borderLimiterXL()) {
                    return {
                        x: this.lastPlayer.x - 1, y: this.lastPlayer.y
                    }
                }
                break;
        }
    }
}

function keyDownPress(event) {
    console.log(event.key);
    const keypressed = event.key;
    const temp = checkKyes(keypressed);
    //chekForCollision();
    return temp;
}