
import { createComponent, createTemplate, clamp } from '../../externals.js';
import { WebPrimitive3D } from './primitive.js';

const styles = `
    :host {
        --radius: 50px;
        --height: 100px;
        --sides: 16;

        height: calc(var(--height) * 1em);
        width: calc(var(--width) * 1em);
        transform-style: preserve-3d;
    }
    #faces {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
    }
    .face {
        position: absolute;
        left: 50%; top: 50%;
        height: 100%;
        width: calc(var(--l) * 1em);

        transform: 
            translate(-50%,-50%)
            rotateY( calc(var(--a) * var(--i)) )
            translateZ( calc(var(--off) * 1em) );
    }
    .cap {
        height: calc(var(--width) * 1em);
        width: calc(var(--width) * 1em);
        border-radius: 50%;
    }
    #top {
        transform: 
            translate(-50%,-50%) 
            rotateX(90deg) 
            translateZ( calc( (var(--height) / 2) * 1em) );
    }
    #bottom {
        transform: 
            translate(-50%,-50%) 
            rotateX(-90deg) 
            translateZ( calc( (var(--height) / 2) * 1em) );
    }
`;
const html = `
    <div id="faces">
    </div>
`;

class Cylinder3D extends WebPrimitive3D {
    static get tagName() { return 'cylinder-3d'; }

    static get attributes() {
        return {
            ...super.attributes,
            'sides': {type: Number, default: 16}
        }
    }

    get sides() { return this._sides; }
    set sides(val) {
        if (val != this._sides) {
            // Lets keep the number of sides sane
            val = clamp(val, 8, 32);
            this._sides = this.attributes.sides.type(val);
            this._genFaces(this._faces);
            this.setAttribute('sides', val);
        }
    }
}

const template = createTemplate(html, styles);
createComponent(Cylinder3D, template);
