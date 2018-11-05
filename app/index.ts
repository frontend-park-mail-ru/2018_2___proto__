import Matrix3x3 from "./game/entities/transformation/matrix3x3";
import Vector3 from "./game/entities/transformation/vector3";

// это нельзя называть тестами

function TestBasicMatrix() {
    let arr1: Array<number> = new Array<number>(
        2, 3, 4,
        5, 1, 2,
        2, 3, 0
    );
    let mat1: Matrix3x3 = new Matrix3x3(arr1);

    let arr2: Array<number> = new Array<number>(
        1, 7, 8,
        2, 3, 3,
        5, 4, 1
    );
    let mat2: Matrix3x3 = new Matrix3x3(arr2);

    console.log(Matrix3x3.Multiply(mat1, mat2));
    console.log("");
}

function TestTransformation() {
    let matrix: Matrix3x3 = Matrix3x3.One();
    let vector: Vector3 = Vector3.CreateVector(-1, -1, 1);
    console.log(Matrix3x3.MultiplyMatrixToVector(matrix, vector));

    let transition: Vector3 = Vector3.CreateVector(2, 2, 0);
    console.log(matrix.Transition(transition));
    console.log(Matrix3x3.MultiplyMatrixToVector(matrix, vector));

    console.log("");
}

TestTransformation();