import { Color, Engine, Scene, vec } from "excalibur";
import { TriangleBoardGenerator } from "../objects/generators/triangleboardgenerator";
import { TrianglePieceGenerator } from "../objects/generators/trianglepiecegenerator";
import { HammerPowerUp } from "../objects/hammerpowerup";
import { GameSystem } from "../objects/system";
import { TrashPowerUp } from "../objects/trashpowerup";
import { TrianglePieceManager } from "../objects/trianglepiecemanager";
import { UIBuilder } from "../objects/util/uibuilder";
import { Images } from "../resources";
import { SceneHelper } from "../scenehelper";
import { TemplateManagers } from "../templatemanagers";
import { UIIconButton } from "../ui/iconButton";

export class GameScene extends Scene {
    constructor() {
        super();
    }

    private setupUI() {
        let builder = new UIBuilder(this);

        builder.placeButton(
            new UIIconButton(
                vec(SceneHelper.screenWidth - 75, 75),
                75,
                Images.HouseIcon.toSprite()
            ),
            () => {
                SceneHelper.goToScene("mainMenu");
            }
        );
        builder.placeButton(
            new UIIconButton(
                vec(SceneHelper.screenWidth - 75, SceneHelper.screenHeight - 75),
                75,
                Images.HammerIcon.toSprite()
            ),
            () => {
                GameSystem.setPowerUp(new HammerPowerUp());
            }
        );
        builder.placeButton(
            new UIIconButton(
                vec(SceneHelper.screenWidth - 175, SceneHelper.screenHeight - 75),
                75,
                Images.TrashIcon.toSprite()
            ),
            () => {
                GameSystem.setPowerUp(new TrashPowerUp());
            }
        )
        let scoreLabel = builder.placeLabel("Score: 0", 125, 50, 32, Color.White);
        GameSystem.bindScore(scoreLabel);
        let poweruplabel = builder.placeLabel("Power up: None", 175, SceneHelper.screenHeight - 50, 32, Color.White);
        GameSystem.bindPowerUpName(poweruplabel);

        let gen = new TriangleBoardGenerator(3);
        gen.generate(vec(380, 90), this);
        let piecegen = new TrianglePieceGenerator(TemplateManagers.triangle.templates[0], 'green', this);
        let pieceman = new TrianglePieceManager(piecegen);
        pieceman.generatePieces();
    }

    public onInitialize(_engine: Engine): void {
        this.setupUI();
    }
}