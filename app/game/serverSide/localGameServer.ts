import GameScene from "../engine/core/gameScene";
import IServer from "./iserver";

export default class LocalGameServer implements IServer {
	public StartGame(scene: GameScene): void {}

	public Connect(server: string): void {}

	public SendCommandToServer(): void {}
}
