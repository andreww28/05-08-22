const Last_part = () => {
	const images = document.querySelectorAll('.pic-container > .img-div');
	const envelope = document.querySelector('.small-envelope');

	envelope.addEventListener('click', () => {
		Envelope().show()
	})

	images.forEach(img => {
		img.addEventListener('mouseenter', ()=> {
			gsap.to(img, {duration:0.6, scale:1.3, zIndex:999})
		});

		img.addEventListener('mouseleave', ()=> {
			gsap.to(img, {duration:0.6, scale:1, zIndex:5})
		});
	});


	function show() {
		gsap.fromTo(images[1],{y:-300, x:80},{duration:2.4, y:0, x:0, scale:1, opacity:1, delay:2.5 *1,  ease: "expo.out"})
		gsap.fromTo(images[6],{y:-300, x:-80},{duration:2.4, y:0, x:0, scale:1, opacity:1, delay:2.5*2,  ease: "expo.out"})
		gsap.fromTo(images[2],{y:-300, x:80},{duration:2.4, y:0, x:0, scale:1, opacity:1, delay:2.5*3,  ease: "expo.out"})
		gsap.fromTo(images[4],{y:-300, x:-80},{duration:2.4, y:0, x:0, scale:1, opacity:1, delay:2.5*4,  ease: "expo.out"})
		gsap.fromTo(images[0],{y:-300, x:80},{duration:2.4, y:0, x:0, scale:1, opacity:1, delay:2.5*5,  ease: "expo.out"})
		gsap.fromTo(images[5],{y:-300, x:-80},{duration:2.4, y:0, x:0, scale:1, opacity:1, delay:2.5*6,  ease: "expo.out"})


		gsap.fromTo(images[3], {opacity:0, scale:0}, {duration:3, scale:1, opacity:1, delay:2.5*7.5, ease: "back.out(3)"});
		gsap.fromTo('.lastpart-title', {y:500, opacity:0, scale:0, color: 'pink'}, {duration:1.5, opacity:1, y:0, scale:1, color: '#AEE9FC', delay: 2.5*7.5 +2})
		gsap.to('.small-env', {duration: 0.6, opacity:1, delay: 2.8*7.5})
	}

	return {
		show,
	}
}