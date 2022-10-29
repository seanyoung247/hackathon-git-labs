
import { createComponent, createTemplate } from '../../externals.js';
import { WebPrimitive3D } from './primitive.js'


const faces = [
    {label: 'front', width: '--width', height: '--height', 
        transform: 'rotateY(0deg) translateZ(calc(var(--depth) / 2))'},
    {label: 'back', width: '--width', height: '--height', 
        transform: 'rotateY(180deg) translateZ(calc(var(--depth) / 2))'},
    {label: 'left', width: '--depth', height: '--height', 
        transform: 'rotateY(-90deg) translateZ(calc(var(--width) / 2))'},
    {label: 'right', width: '--depth', height: '--height', 
        transform: 'rotateY(90deg) translateZ(calc(var(--width) / 2))'},
    {label: 'top', width: '--width', height: '--depth', 
        transform: 'rotateX(90deg) translateZ(calc(var(--height) / 2))'},
    {label: 'bottom', width: '--width', height: '--depth', 
        transform: 'rotateX(-90deg) translateZ(calc(var(--height) / 2))'}
];

const styles = `
    :host {
        transform-style: preserve-3d;
    }
    #faces {
        position: relative;
        width: var(--width);
        height: var(--height);
        transform-style: preserve-3d;
    }
    .face {
        position: absolute;
        left: 50%; top: 50%;
    }
    ${
        faces.map(e => (
            `#${e.label} {
                width: var(${e.width});
                height: var(${e.height});
                transform: translate(-50%,-50%) ${e.transform};
            }`
        )).join('\n')
    }
`;

const html = `
    <div id="faces">
        ${faces.map(e => `
            <div id="${e.label}" part="face ${e.label}" class="face">
                <slot name="${e.label}">
                </slot>
            </div>`).join('\n')}
    </div>
`;


createComponent(
    class extends WebPrimitive3D {
        static get tagName() { return 'cuboid-3d'; }
        static get attributes() {
            return {
                ...super.attributes,
                'depth': {type: Number, default: 100},
                'sides': {type: Number, default: 4}
            }
        }

        get depth() { return this._depth; }
        set depth(val) {
            this._depth = this.attributes.depth.type(val);
            this._faces.style.setProperty('--depth', `${this._depth}${this._unit}`);
            this.setAttribute('depth', val);
        }

        connectedCallback() {
            super.connectedCallback();
            this._faces.style.setProperty('--depth', `${this._depth}${this._unit}`);
        }
    },
createTemplate(html, styles));
