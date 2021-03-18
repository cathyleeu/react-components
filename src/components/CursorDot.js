import React, {forwardRef} from 'react';
import { gsap } from 'gsap';
import { lerp, getMousePos } from '../Helper';

let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', ev => mouse = getMousePos(ev));

export class Cursor {
  constructor(el) {
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.bounds = this.Cursor.getBoundingClientRect();
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.2 },
      y: { previous: 0, current: 0, amt: 0.2 },
      scale: {previous: 1, current: 1, amt: 0.15},
    };

    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x - this.bounds.width/2;
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y - this.bounds.height/2;
      gsap.to(this.Cursor, {duration: 0.9, ease: 'Power3.easeOut', opacity: 1});
      requestAnimationFrame(() => this.render());
      window.removeEventListener('mousemove', this.onMouseMoveEv);
    };
    window.addEventListener('mousemove', this.onMouseMoveEv);
  }
  enter() {
    this.cursorConfigs['scale'].current = 4.5;
    //this.cursorConfigs['opacity'].current = 0.5;
  }
  leave() {
    this.cursorConfigs['scale'].current = 1;
    //this.cursorConfigs['opacity'].current = 1;
  }
  render() {
    this.cursorConfigs['x'].current = mouse.x - this.bounds.width/2;
    this.cursorConfigs['y'].current = mouse.y - this.bounds.height/2;

    for (const key in this.cursorConfigs ) {
        this.cursorConfigs[key].previous = lerp(this.cursorConfigs[key].previous, this.cursorConfigs[key].current, this.cursorConfigs[key].amt);
    }
                
    this.Cursor.style.transform = `translateX(${(this.cursorConfigs['x'].previous)}px) translateY(${this.cursorConfigs['y'].previous}px) scale(${this.cursorConfigs['scale'].previous})`;
    //this.Cursor.style.opacity = this.cursorConfigs['opacity'].previous;

    requestAnimationFrame(() => this.render());
  }
}

export const CursorDot = forwardRef((props, ref) => {
  const {size} = props;
  const circle = size*0.5;
  const radius = circle*0.5;
  return (
    <svg className="cursor" ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			<circle className="cursor__inner" cx={circle} cy={circle} r={radius}/>
		</svg>
  )
})