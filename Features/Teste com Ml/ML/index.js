//import NeuralNetwork from './NeuralNetwork';

var neural = new NeuralNetwork(4, 20, 4);

//neural.train([2, 3], [1]);


function aprender(){
    let train = true;

    while (train){
        let erro;
        let n = 0
        for(i = 0; i<10000; i++){
            n = Math.floor(Math.random()*4);
            erro = neural.train(dict.inputs[n], dict.outputs[n]);
        }
        if(erro < 0.001 && erro > (-0.001)){
            train = false;
            console.log("teinado, Erro: "+ erro)
        }
    }
}

    
