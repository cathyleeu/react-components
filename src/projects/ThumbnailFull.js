
import React, {useEffect, useRef, forwardRef, createRef} from 'react';
import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import ThumbnailAnimation from '../js/thumbnail';
import {Cursor, CursorDot} from '../components/CursorDot';

import './ThumbnailFull.scss';


const DATA = {
  thumb : [
    {
      num: 7,
      src: process.env.PUBLIC_URL + '/img/3.jpg',
      title: 'Into Light'
    },
    {
      num: 2,
      src: process.env.PUBLIC_URL + '/img/4.jpg',
      title: 'Surrender'
    },
  ]
}

const Thumb = forwardRef((props, ref) => {
  const {num, src, title} = props;
  return (
    <div className="thumb" ref={ref}>
      <span className="thumb__number">{num}</span>
      <div className="thumb__img" style={{'backgroundImage':`url(${src})`}}></div>
      <span className="thumb__title">{title}</span>
    </div>
  )
})
const ThumbnailFull = () => {
  /*
    TODO
      0) slide !! 
        - scroll horizontal 
        - slide images 
      1) Refactoring
  */ 
  const thumbRefs = useRef([createRef(), createRef()]);
  const cursorRef = useRef(null);
  useEffect(() => {
    const cursor = new Cursor(cursorRef.current);
    const thumbAnimation = new ThumbnailAnimation();
    const thumbs = thumbRefs.current.map(thumb => thumb.current);
    thumbAnimation.on('enter', () => {
      cursor.enter();
      // debugger
      // Slightly move the side thumbs away
      gsap.to(thumbs, {
          duration: 1,
          ease: 'expo',
          opacity: 0.8,
          x: i => i ? '25%' : '-25%',
          //scale: 1.1,
          rotateY: i => i ? -15 : 15,
          z: 40
      });
    });

    thumbAnimation.on('leave', () => {
      cursor.leave();

      // Move the side thumbs back into its original position
      gsap.to(thumbs, {
          duration: 1,
          ease: 'expo',
          opacity: 1,
          x: '0%',
          //scale: 1
          rotateY: 0,
          z: 0
      });
    });

    thumbAnimation.on('start', () => {
      cursor.leave();

      // Move the side thumbs away
      gsap.to(thumbs, {
          duration: 0.8,
          ease: 'power3.inOut',
          opacity: 0,
          x: i => i ? '150%' : '-150%',
          //scale: 0.6
          rotateY: i => i ? -45 : 45,
          z: 200
      });
    });

    thumbAnimation.on('scrollready', () => {
      // Initialize the Locomotive scroll
      // 전반적으로 부드럽게 스크롤링이 될 수 있도록 한다.... 
      // 오.. 개 좋은데? 
      new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
      });
    });
  }, [])
  return (
    <>
      <main data-scroll-container>
        <section className="content">
          <div className="inner">
            <header className="content__header">
              {/* meta */}
              <div className="content__meta">
                <span className="content__meta-number">01</span>
                <span className="content__meta-title">Gnostic Love</span>
              </div>
              {/* title */}
              <h2 data-scroll="" data-scroll-speed="2" data-scroll-delay="0.1" data-scroll-position="top" className="content__title anim-block-wrap">
                <span className="anim-block">Gnostic Love</span>
              </h2>
              {/* subtitle */}
              <p data-scroll="" data-scroll-speed="1" data-scroll-delay="0.1" data-scroll-position="top" className="content__subtitle anim-block-wrap">
                <span className="anim-block">What is wanted is not the will to believe, but the wish <br /> to find out, which is its exact opposite.</span>
              </p>
              {/* content image */}
              <div className="content__intro content__breakout">
                <div className="content__intro-imgWrap">
                  <img data-scroll="" data-scroll-speed="1" data-scroll-delay="0.1" data-scroll-position="top" className="content__intro-img" src={process.env.PUBLIC_URL + '/img/1.jpg'} alt="random" />
                </div>
              </div>
            </header>

            {/* content body */}
            <div className="content__body">
              <p className="content__body-para text-right cell--1-2">Then they opened the firmaments and the Light descended below to the lower regions and to those who were without form, having no true likeness. It was thus that they got the likeness of the Light for themselves. Some rejoiced because the Light had come to them, and that they had been made rich thereby. Others mourned because they were made poor and that which they thought they had was taken away from them. Thus came He, who went forth full of grace, and was taken captive with a captiviy. A light of glory was given to the æons who had received the Spark, and guardian spirits were sent to them who are Gamanêl, Etrempsouchos, and Agramas, and those who are with them. They bring help to those who have believed in the Spark of Light.</p>
              <p data-scroll="" data-scroll-offset="130" className="content__body-para cell--3 anim-show"><strong>The Crown that the Deathless pray for</strong></p>
              <div className="content__body-imgwrap cell--1-3">
                <div data-scroll="" data-scroll-speed="0.7" data-scroll-delay="0.1" className="content__body-image" style={{'backgroundImage':`url(${process.env.PUBLIC_URL}/img/2.jpg)`}}></div>
              </div>
              <p className="content__body-para cell--2-3">Now in the Space of the Indivisible Atom are twelve Founts, above which are the twelve Paternities who surround the Indivisible [Queen] like Deeps or like Skies and make for Her a crown in which is every kind of life: all modes of Triple-powered life, of Uncontainable life, of Infinite life, of Ineffable life, of Silent life, of Unknown life, of Solitary life, of Unshakable life, of First-manifested life, of Self-born life, of True life. All is therein. Every species is in it, all Gnôses and every power which has received the Light, yea, all Mind manifests itself therein. This is the Crown which the Father of the Universe has placed upon the Indivisible [Queen] with three hundred and sixty-five kinds in it, brilliant and filling the Universe with an incorruptible and unfailing light.</p>
            </div>
          </div>
        </section>
        
        <section className="thumbs">
          {DATA.thumb.map((t, index) => <Thumb key={t.num} ref={thumbRefs.current[index]} {...t}/>)}
        </section>
      </main>
      <CursorDot ref={cursorRef} size={30} />
    </>
  )
}

export default ThumbnailFull;