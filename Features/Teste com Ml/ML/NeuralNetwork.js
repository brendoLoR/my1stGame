//var Matrix = require('./Matrix').default.default;
//import Matrix from './Matrix.js'

function sigmoid(x){
    return (1 / (1 + Math.exp(-x)));
}
function dsigmoid(x){
    return x * (1 - x);
}


class NeuralNetwork{
    constructor(i_nodes, h_nodes, o_nodes, base, neural_base, mult){
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        if(!base){
            this.weight_ih = new Matrix(this.h_nodes, this.i_nodes);
            this.weight_ih.randomize();
            this.weight_ho = new Matrix(this.h_nodes, this.o_nodes);
            this.weight_ho.randomize();

            this.bias_ih = new Matrix(this.h_nodes, 1);
            this.bias_ho = new Matrix(this.o_nodes, 1);
            this.bias_ih.randomize();
            this.bias_ho.randomize();
        }
        
        if(base){
            this.weight_ih = new Matrix(this.h_nodes, this.i_nodes);
            this.weight_ih = Matrix.randomize_base(this.weight_ih, neural_base.weight_ih, mult);
            this.weight_ho = new Matrix(this.h_nodes, this.o_nodes);
            this.weight_ho = Matrix.randomize_base(this.weight_ho, neural_base.weight_ho, mult);

            this.bias_ih = new Matrix(this.h_nodes, 1);
            this.bias_ho = new Matrix(this.o_nodes, 1);
            this.bias_ih = Matrix.randomize_base(this.bias_ih, neural_base.bias_ih, mult);
            this.bias_ho = Matrix.randomize_base(this.bias_ho, neural_base.bias_ho, mult);
        }
        

        this.learning_rate = 0.1;

    }
    train(input, target){

        //INPUT LAYER
        let inputs = Matrix.arrayToMatrix(input);

        //HIDDEN LAYER
        let h = Matrix.mult(this.weight_ih, inputs);
        let hidden = Matrix.sum(h, this.bias_ih);
        hidden.map(sigmoid);
        
        //OUTPUT LAYER
        let output = Matrix.mult(this.weight_ho, hidden);
        output = Matrix.sum(this.bias_ho, output);
        output.map(sigmoid);


        // BACKPROPAGATION

        //OUTPUT -->> HIDDEN

        let expect = Matrix.arrayToMatrix(target);
        let output_erro = Matrix.subtract(expect, output);
        let all_erro = Matrix.sum_all(output_erro);

        let d_outout = Matrix.map(output, dsigmoid);
        let gradient = Matrix.hadamard(d_outout, output_erro);
        gradient = Matrix.escalar_mult(gradient, this.learning_rate);
        
        this.bias_ho = Matrix.sum(this.bias_ho, gradient);
        
        let t_hidden = Matrix.transpose(hidden);
       
        let weight_ho_deltas = Matrix.mult(gradient, t_hidden);
        weight_ho_deltas = Matrix.transpose(weight_ho_deltas)
        
        this.weight_ho = Matrix.sum(this.weight_ho, weight_ho_deltas);

        //HIDDEN -->> INPUT
       
        let t_input = Matrix.transpose(inputs);
        let d_hidden = Matrix.map(hidden, dsigmoid);
        
        let h_gradient = Matrix.hadamard(d_hidden, weight_ho_deltas);
        h_gradient = Matrix.escalar_mult(h_gradient, this.learning_rate);
        
        this.bias_ih = Matrix.sum(this.bias_ih, h_gradient);
        
        let weight_ih_deltas = Matrix.mult(h_gradient, t_input);
        this.weight_ih = Matrix.sum(this.weight_ih, weight_ih_deltas);        

       // console.log(all_erro)
        return all_erro;
  
    }

    predict(input){
        //INPUT LAYER
        let inputs = Matrix.arrayToMatrix(input);

        //HIDDEN LAYER
        let h = Matrix.mult(this.weight_ih, inputs);
        let hidden = Matrix.sum(h, this.bias_ih);
        hidden.map(sigmoid);
        
        //OUTPUT LAYER
        let output = Matrix.mult(this.weight_ho, hidden);
        output = Matrix.sum(this.bias_ho, output);
        output.map(sigmoid);
        //output.print()

        output = Matrix.matrixToArray(output)
        
        return output
    }
}