import Tarnsform from "./game/entities/transformation/transform"
import Matrix from "./game/entities/transformation/matrix"
import Vector3 from "./game/entities/transformation/vector3"
import Matrix3x3 from "./game/entities/transformation/matrix3x3"


//basic matrix calculations tests
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

let vec1 = new Vector3(1, 2, 3, true);
console.log(Matrix.Multiply(m1, vec1));


//transformation calculation tests
let localToWorldMatrix: Matrix3x3 = Matrix3x3.One();
let dot: Vector3 = new Vector3(-1, -1, 1, true);
let transition: Vector3 = new Vector3(1, 0, 1, true);

console.log(Matrix.Multiply(localToWorldMatrix, dot));

localToWorldMatrix.Transition(transition);
console.log(Matrix.Multiply(localToWorldMatrix, dot));
console.log("")