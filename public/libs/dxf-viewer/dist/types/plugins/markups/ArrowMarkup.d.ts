import * as THREE from "three";
import { BaseMarkup } from "../../plugins/markups/BaseMarkup";
import { MarkupType } from "../../plugins/markups/Constants";
export declare class ArrowMarkup extends BaseMarkup {
    type: MarkupType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawArrowLine;
    private drawArrowHead;
    getVertexes(): THREE.Vector3[];
    update(points: THREE.Vector3[]): this;
    isPointInPath(p: THREE.Vector3): boolean;
    getClassType(): string;
}
