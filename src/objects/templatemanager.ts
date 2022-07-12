import { vec, Vector } from 'excalibur';
import templates from '../res/pieceTemplates.json';
import { PartialTemplate, PieceTemplate } from '../types';

export class TemplateManager {
    public static templates: PieceTemplate[] = [];

    public static initialize() {
        for(let i in templates) {
            let t: PartialTemplate = templates[i];
            let p: Vector[] = [];
            let head: number = 0;
            for(let j = 0; j < 6; j++) {
                if (t.cells[j]) {
                    let index = (p.push(vec(j % 3, Math.floor(j / 3)))) - 1;
                    if (t.head === j) {
                        head = index;
                    }
                }
            }

            this.templates.push({ points: p, headPiece: head});
        }
    }

    public static randomTemplate() {
        let t = Math.floor(Math.random() * this.templates.length);
        return this.templates[t];
    }
}