
import React from 'react';
import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';

const ThumbnailFull = () => {
  return (
    <>
      <section class="content">
				<div class="inner">
					<header class="content__header">
						<div class="content__meta">
							<span class="content__meta-number">01</span>
							<span class="content__meta-title">Gnostic Love</span>
						</div>
						<h2 data-scroll="" data-scroll-speed="2" data-scroll-delay="0.1" data-scroll-position="top" class="content__title anim-block-wrap">
							<span class="anim-block">Gnostic Love</span>
						</h2>
						<p data-scroll="" data-scroll-speed="1" data-scroll-delay="0.1" data-scroll-position="top" class="content__subtitle anim-block-wrap">
							<span class="anim-block">What is wanted is not the will to believe, but the wish <br /> to find out, which is its exact opposite.</span>
						</p>
						<div class="content__intro content__breakout">
							<div class="content__intro-imgWrap">
								<img data-scroll="" data-scroll-speed="1" data-scroll-delay="0.1" data-scroll-position="top" class="content__intro-img" src="1.dc197a9a.jpg" alt="random" />
							</div>
						</div>
					</header>

					<div class="content__body">
						<p class="content__body-para text-right cell--1-2">Then they opened the firmaments and the Light descended below to the lower regions and to those who were without form, having no true likeness. It was thus that they got the likeness of the Light for themselves. Some rejoiced because the Light had come to them, and that they had been made rich thereby. Others mourned because they were made poor and that which they thought they had was taken away from them. Thus came He, who went forth full of grace, and was taken captive with a captivity. A light of glory was given to the æons who had received the Spark, and guardian spirits were sent to them who are Gamanêl, Etrempsouchos, and Agramas, and those who are with them. They bring help to those who have believed in the Spark of Light.</p>
						<p data-scroll="" data-scroll-offset="130" class="content__body-para cell--3 anim-show"><strong>The Crown that the Deathless pray for</strong></p>
						<div class="content__body-imgwrap cell--1-3">
							<div data-scroll="" data-scroll-speed="0.7" data-scroll-delay="0.1" class="content__body-image" style={{'background-image':'url(2.3ca6bb44.jpg)'}}></div>
						</div>
						<p class="content__body-para cell--2-3">Now in the Space of the Indivisible Atom are twelve Founts, above which are the twelve Paternities who surround the Indivisible [Queen] like Deeps or like Skies and make for Her a crown in which is every kind of life: all modes of Triple-powered life, of Uncontainable life, of Infinite life, of Ineffable life, of Silent life, of Unknown life, of Solitary life, of Unshakable life, of First-manifested life, of Self-born life, of True life. All is therein. Every species is in it, all Gnôses and every power which has received the Light, yea, all Mind manifests itself therein. This is the Crown which the Father of the Universe has placed upon the Indivisible [Queen] with three hundred and sixty-five kinds in it, brilliant and filling the Universe with an incorruptible and unfailing light.</p>
					</div>
				</div>
			</section>
      
      <section class="thumbs">
        <div class="thumb">
          <span class="thumb__number">07</span>
          <div class="thumb__img" style={{'background-image':'url(3.a433b89d.jpg)'}}></div>
          <span class="thumb__title">Into Light</span>
        </div>
        <div class="thumb">
          <span class="thumb__number">02</span>
          <div class="thumb__img" style={{'background-image':'url(4.c6d96be5.jpg)'}}></div>
          <span class="thumb__title">Surrender</span>
        </div>
      </section>
    </>
  )
}

export default ThumbnailFull;