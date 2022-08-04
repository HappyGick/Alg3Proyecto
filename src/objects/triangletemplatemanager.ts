import { vec, Vector } from 'excalibur';
import templates from '../res/trianglePieceTemplates.json';
import { PartialTemplate, TrianglePieceTemplate } from '../types';
import { PieceTemplateManagerBase } from './abstract/base/piecetemplatemanagerbase';

export class TriangleTemplateManager extends PieceTemplateManagerBase<TrianglePieceTemplate> {
    public initialize() {
        for(let i in templates) {
            this.templates.push(this.importTemplate(templates[i]));
        }
    }

    public rotated(id: number): TrianglePieceTemplate {
        return this.rotateTemplate(this.templates[id].originalTemplate);
    }

    public rotateTemplate(template: PartialTemplate): TrianglePieceTemplate {
        let newHead: number = 0;
        switch (template.head) {
            case 0:
                newHead = 1;
                break;
            case 1:
                newHead = 2;
                break;
            case 2:
                newHead = 5;
                break;
            case 3:
                newHead = 0;
                break;
            case 4:
                newHead = 3;
                break;
            case 5:
                newHead = 4;
                break;
        }
        let newTemplate: PartialTemplate = {
            cells: [
                template.cells[3], template.cells[0], template.cells[1],
                template.cells[4], template.cells[5], template.cells[2]
            ],
            head: newHead
        }

        return this.importTemplate(newTemplate);
    }

    public importTemplate(template: PartialTemplate): TrianglePieceTemplate {
        let p: Vector[] = [];
        let head: number = 0;
        for(let j = 0; j < 6; j++) {
            if (template.cells[j]) {
                let index = (p.push(vec(j % 3, Math.floor(j / 3)))) - 1;
                if (template.head === j) {
                    head = index;
                }
            }
        }

        return {
            points: p, headPiece: head, originalTemplate: template
        }
    }
}