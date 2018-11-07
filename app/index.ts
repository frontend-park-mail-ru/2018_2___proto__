import Matrix3x3 from "./game/entities/transformation/matrix3x3";
import Vector3 from "./game/entities/transformation/vector3";
import Transform2d from "./game/entities/transformation/transform";
import GameObject from "./game/entities/gameObject";

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
    console.log(Matrix3x3.MultiplyToVector(matrix, vector));

    let transition: Vector3 = Vector3.CreateVector(2, 2, 0);
    matrix.Transition(transition);
    console.log(matrix);
    console.log(Matrix3x3.MultiplyToVector(matrix, vector));

    console.log("");
}

function TestTrasform() {
    let transformParent: Transform2d = new GameObject().Transform;
    let transformChild: Transform2d = new GameObject().Transform;;
    let dot: Vector3 = Vector3.CreateVector(1, 1, 1);

    transformParent.AddChild(transformChild);
    let translateRU: Vector3 = Vector3.CreateVector(1, 1, 1); // move up-rigth
    let translateL: Vector3 = Vector3.CreateVector(-2, 0, 1); // move left
    let translateD: Vector3 = Vector3.CreateVector(0, -3, 1); // move down

    console.log(transformChild.CalcGlobalVectorCoords(dot));

    transformChild.Move(translateRU);
    console.log(transformChild.CalcGlobalVectorCoords(dot));

    transformParent.Move(translateRU);
    console.log(transformChild.CalcGlobalVectorCoords(dot));

    transformParent.Move(translateL);
    console.log(transformChild.CalcGlobalVectorCoords(dot));

    transformChild.Move(translateD);
    console.log(transformChild.CalcGlobalVectorCoords(dot));
}

function TestChilds() {
    let transformParent: Transform2d = new GameObject().Transform;
    let transformChild: Transform2d = new GameObject().Transform;

    transformChild.SetParent(transformParent);

    if (transformParent != transformChild.Parent)
        throw new Error("wrong parent setting");

    transformParent.RemoveChild(transformChild)
    if (transformParent == transformChild.Parent)
        throw new Error("wrong child deleting");
}

//TestTransformation();
//TestTrasform();
TestChilds();
console.log("");