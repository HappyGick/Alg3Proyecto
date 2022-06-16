import { Scene } from "excalibur";
import { Player } from "../actors/player";

export class GameScene extends Scene {
    constructor() {
        super();
        let player: Player = new Player();
        this.add(player);
    }
}