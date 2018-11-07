import IServer from "./iserver";
import GameScene from "../engine/core/gameScene";

export default class LocalGameServer implements IServer {
    public StartGame(scene: GameScene): void {}

    public Connect(server: string): void {}

    public SendCommandToServer(): void {}
}