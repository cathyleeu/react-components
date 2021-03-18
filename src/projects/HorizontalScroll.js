import React, { useEffect, useRef } from 'react';
import {Cursor, CursorDot} from '../components/CursorDot';
import {clamp, map} from '../Helper';
import LocomotiveScroll from 'locomotive-scroll';
import './HorizontalScroll.scss';
const DATA = {
  item : [
    {src : '/img/demo3/1.jpg', title: 'Moonraker'},
    {src : '/img/demo3/2.jpg', title: 'Nacarat'},
    {src : '/img/demo3/3.jpg', title: 'Selkie'},
    {src : '/img/demo3/4.jpg', title: 'Thalassic'},
    {src : '/img/demo3/5.jpg', title: 'Uroboros'},
    {src : '/img/demo3/6.jpg', title: 'Waitron'},
    {src : '/img/demo3/7.jpg', title: 'Soucouyant'},
    {src : '/img/demo3/8.jpg', title: 'Periapt'},
    {src : '/img/demo3/9.jpg', title: 'Cyanic'},
    {src : '/img/demo3/10.jpg', title: 'Martlet'},
    {src : '/img/demo3/11.jpg', title: 'Eurhythmic'},
    {src : '/img/demo3/12.jpg', title: 'Dariole'},
  ]
}


const ScrollItem = (props) => {
  const {src, title, index} = props;
  return (
    <figure className="gallery__item">
      <div className="gallery__item-img">
        <div className="gallery__item-imginner" style={{'backgroundImage': `url(${process.env.PUBLIC_URL}${src})`}} data-scroll data-scroll-speed="-0.8">
        </div>
      </div>
      <figcaption className="gallery__item-caption">
        <h2 className="gallery__item-title" data-scroll data-scroll-speed="1">{title}</h2>
        <span className="gallery__item-number" data-scroll data-scroll-speed="1.5">{index}</span>
        <a className="gallery__item-link" href="/">explore</a>
      </figcaption>
    </figure>
  )
}
const HorizontalScroll = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const lscroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      direction: 'horizontal'
    });
    lscroll.on('scroll', (obj) => {
      for (const key of Object.keys(obj.currentElements)) {
        if ( obj.currentElements[key].el.classList.contains('gallery__item-imginner') ) {
            let progress = obj.currentElements[key].progress;
            const scaleVal = progress < 0.5 ? clamp(map(progress,0,0.5,0.2,1),0.2,1) : clamp(map(progress,0.5,1,1,0.2),0.2,1);
            obj.currentElements[key].el.parentNode.style.transform = `scale(${scaleVal})`
        }
      }
    });
    lscroll.update();
  }, [])
  useEffect(() => {
    const cursor = new Cursor(cursorRef.current);
    [...document.querySelectorAll('a,.gallery__item-img,.gallery__item-number')].forEach(link => {
      link.addEventListener('mouseenter', () => cursor.enter());
      link.addEventListener('mouseleave', () => cursor.leave());
    });
  }, [])
  return (
    <>
      <main data-scroll-container>
				<div className="content">
					<div className="gallery">
						<div className="gallery__text"><span className="gallery__text-inner" data-scroll data-scroll-speed="1">Must</span><span data-scroll data-scroll-speed="-1.5" className="gallery__text-inner">ache</span></div>
            {DATA.item.map((d, index) => <ScrollItem key={index} {...d} index={index}/>)}
						<div className="gallery__text"><span className="gallery__text-inner" data-scroll data-scroll-speed="1">Cómp</span><span data-scroll data-scroll-speed="3" className="gallery__text-inner">lice</span></div>
					</div>
				</div>
			</main>
      <CursorDot ref={cursorRef} size={20} />
    </>
  )
}

export default HorizontalScroll;