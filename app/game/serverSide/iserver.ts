import GameScene from "../engine/core/gameScene";

// TODO допродумать этот интерфейс
// он будет применяться для реализации локальной и мультиплеерной игры
// в процесс он будет меняться
// при мультиплеера будет применяться мультиплеерная имлементация этого интерфейса, которая будет общаться с бэком
// при сингле вся логика будет работать на клиенте
export default interface IServer {
    StartGame(scene: GameScene): void;

    Connect(server: string): void;

    SendCommandToServer(): void;
}