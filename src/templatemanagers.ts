import { PieceTemplateManagerBase } from "./objects/abstract/base/piecetemplatemanagerbase";
import { TriangleTemplateManager } from "./objects/triangletemplatemanager";

export const TemplateManagers: {[name: string]: PieceTemplateManagerBase<any>} = {
    triangle: new TriangleTemplateManager()
};