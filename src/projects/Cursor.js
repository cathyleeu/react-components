import React, {useEffect} from 'react';
import { gsap } from 'gsap';
import { lerp, getMousePos, getSiblings } from '../Helper';
import './Cursor.scss';

let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

class Cursor {
  constructor(el, targetItem) {
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.Item = document.querySelectorAll(targetItem);
    this.bounds = this.Cursor.getBoundingClientRect();
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.2 },
      y: { previous: 0, current: 0, amt: 0.2 },
    };
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y;

      // Set cursor opacity to 1 when hovered on screen
      gsap.to(this.Cursor, {
        duration: 1,
        ease: "Power3.easeOut",
        opacity: 1,
      });
      // Execute scale function
      this.onScaleMouse();

      // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
      requestAnimationFrame(() => this.render());
      // Clean up function
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };
    // Scale cursor animation
    window.addEventListener("mousemove", this.onMouseMoveEv);
  }
  onScaleMouse() {
    // Loop through all items
    this.Item.forEach((link) => {
      // If I am hovering on the item for on page load I want to scale the cursor media
      if (link.matches(":hover")) {
        this.setVideo(link);
        this.ScaleCursor(this.Cursor.children[0], 0.8);
      }
      //On mouse enter scale the media-cursor to .8
      link.addEventListener("mouseenter", () => {
        this.setVideo(link);
        this.ScaleCursor(this.Cursor.children[0], 0.8);
      });
      //On mouse enter scale the media-cursor to 0
      link.addEventListener("mouseleave", () => {
        this.ScaleCursor(this.Cursor.children[0], 0);
      });
      //Hover on a tag to expand to 1.2
      link.children[1].addEventListener("mouseenter", () => {
        this.Cursor.classList.add("media-blend");
        this.ScaleCursor(this.Cursor.children[0], 1.2);
      });
      // Bring scale back down .8
      link.children[1].addEventListener("mouseleave", () => {
        this.Cursor.classList.remove("media-blend");
        this.ScaleCursor(this.Cursor.children[0], 0.8);
      });
    });
  }
  ScaleCursor(el, amount) {
    gsap.to(el, {
      duration: 0.6,
      scale: amount,
      ease: "Power3.easeOut",
    });
  }
  setVideo(el) {
    let src = el.getAttribute("data-video-src");
    let video = document.querySelector(`#${src}`);
    let siblings = getSiblings(video);

    if (video.id === src) {
      gsap.set(video, { zIndex: 4, opacity: 1 });
      siblings.forEach((i) => {
        gsap.set(i, { zIndex: 1, opacity: 0 });
      });
    }
  }
  render() {
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    // lerp
    for (const key in this.cursorConfigs) {
      // key will be x & y
      // WTF IS LERP?
      // Lerp - A lerp returns the value between two numbers at a specified, decimal midpoint:
      this.cursorConfigs[key].previous = lerp(
        this.cursorConfigs[key].previous,
        this.cursorConfigs[key].current,
        this.cursorConfigs[key].amt
      );
    }
    // Setting the cursor x and y to our cursoer html element
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;
    // RAF
    requestAnimationFrame(() => this.render());
  }
}

const CursorComponent = (props) => {
  const {name, link, children} = props;
  return (
    <div data-video-src={name} className="hero-inner-link-item">
      <div className="hero-inner-link-item-padding"></div>
      <a href={link}> <span>{children}</span></a>
    </div>
  )
}
const CursorExample = () => {
  useEffect(() => {
    new Cursor(document.querySelector(".cursor"), ".hero-inner-link-item");
  })
  const data = [
    {name: "websites", content:"A", src: "/videos/websites.mp4", link:"/"},
    {name: "branding", content:"B", src: "/videos/branding.mp4", link:"/"},
    {name: "apps", content:"C", src: "/videos/apps.mp4", link:"/"},
  ];
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner-links">
            {data.map((d, i) => <CursorComponent key={i} {...d}>{d.content}</CursorComponent>)}
          </div>
        </div>
      </section>
      <div className="cursor">
        <div className="cursor-media">
        {data.map((d, i) => 
          <video
            key={i}
            src={process.env.PUBLIC_URL + d.src}
            preload="auto"
            autoPlay
            muted
            loop
            id={d.name}></video>
          )}
        </div>
      </div>
    </>
  )
}


export default CursorExample