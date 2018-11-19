import GameScene from "../engine/core/gameScene";
import IServer from "./iserver";

export default class LocalGameServer implements IServer {
	public StartGame(scene: GameScene): void {
		const gameTimer = setInterval(() => {
			alert("Ticking...");
		}, 1000);

		setTimeout(() => {
			clearInterval(gameTimer);
			alert("Stopping game timer...");
		}, 10000);
	}

	public Connect(server: string): void {}

	public SendCommandToServer(): void {}
}
