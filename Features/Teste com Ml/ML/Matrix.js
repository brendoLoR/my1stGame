class Matrix{
    constructor(rows, cols){
        this.cols = cols;
        this.rows = rows;

        this.data = [];

        for(let i = 0; i<rows; i++){
            let arr = [];
            for(let j = 0; j<cols; j++){
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    // FUNÇÕES ÚTEIS

    sigmoid(){
        this.map((num, i, j) => {
            return  (1 / (1 + Math.exp(-this.data[i][j])));
        });
    }
    dsigmoid(){
        this.map((num, i, j) => {
            return this.data[i][j] * (1 - this.data[i][j]);
        })
    }
    print(){
        console.table(this.data);
    }
    randomize(){
        this.map((num, i, j) => {
            return Math.random()* 2 - 1;
        }); 
    }
    static randomize_base(A, B, mult){
        let m = new Matrix(A.rows, A.cols)
        m.map((num, i, j) => {
            let min = B.data[i][j]+(Math.random()*(-mult))
            let max = B.data[i][j]+(Math.random()*(min+mult)) + min
            A.data[i][j] =  Math.random() * (max - min) + min
        });
        return A
    }
    static arrayToMatrix(arr){
        let m = new Matrix(arr.length, 1);

        m.map((num, i, j) => {
            return arr[i];
        })
        return m;
    }
    static matrixToArray(A){
        let m = new Matrix(A.rows, A.cols)
        let arr = []

        m.map((num, i, j) => {
           // console.log(A.data[i][j])
            arr.push(A.data[i][j])
        })
        //console.log(arr)
        return arr
    }
    static transpose(A){
        let m = new Matrix(A.cols, A.rows);

        m.map((num, i, j) => {
            return A.data[j][i];
        });
        return m;
    }

    // MAPEAMENTOS DE MATRIZ

    map (func){
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            });
        });
    }
    static map (A, func){
        let m = new Matrix(A.rows, A.cols);
        m.data = A.data;
        m.data = m.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            });
        });
        return m
    }
    
    // FUNÇÕES ARITIMETRICAS

    static escalar_mult(mA, mB){
        let m = new Matrix(mA.rows, mA.cols);

        m.map((num, i, j) => {
            return mA.data[i][j] * mB;
        });
        return m;
    }
    static hadamard(mA, mB){
        let m = new Matrix(mA.rows, mA.cols);

        m.map((num, i, j) => {
            return mA.data[i][j] * mB.data[i][j]
        });
        return m;
    }
    static sum(mA, mB){
        let m = new Matrix(mA.rows, mA.cols);

        m.map((num, i, j) => {
            return mA.data[i][j] + mB.data[i][j]
        });
        return m;
    }
    static subtract(mA, mB){
        let m = new Matrix(mA.rows, mA.cols);

        m.map((num, i, j) => {
            return mA.data[i][j] - mB.data[i][j]
        });
        return m;
    }
    static mult(mA, mB){
        let m = new Matrix(mA.rows, mB.cols);
        
        m.map((num, i, j) => {
            let sum = 0;

            for (let k = 0; k < mA.cols; k++){
                let elem1 = mA.data[i][k];
                let elem2 = mB.data[k][j];

                sum += elem1*elem2;
            }
            return sum;
        });
        return m;
    }
    static sum_all(A){
        let m = new Matrix(A.rows, A.cols)
        var erro = 0;
        m.map((num, i, j) => {
            erro += A.data[i][j];
        })
        return erro;
    }
    
}