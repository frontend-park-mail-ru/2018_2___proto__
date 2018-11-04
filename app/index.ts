import Tarnsform from "./game/entities/transformation/transform"
import Matrix from "./game/entities/transformation/matrix"

class Startup {
    public static main(): number {
        console.log('Hello World');
        return 0;
    }
}

let arr1 = new Array<number>(
    3, -1, 2,
    4, 2, 0,
    -5, 6, 1,
)
let m1 = new Matrix(arr1, 3, 3);

let arr2 = new Array<number>(
    8, 1,
    7, 2,
    2, -3,
)
let m2 = new Matrix(arr2, 2, 3);

console.log(Matrix.Multiply(m1, m2));
console.log(Matrix.Sum(m1, m1));
console.log("asd");