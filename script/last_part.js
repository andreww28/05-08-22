const Last_part = () => {
	const images = document.querySelectorAll('.pic-container > img');
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
		images.forEach((image, index) => {
			if(index != 3){
				index += 1;
				if(index > 3) index -=1;
				gsap.fromTo(image,{y:-200},{duration:2.4, y:0, scale:1, opacity:1, delay:2.5*index, ease: "back.out(4)"})
			}
		})

		gsap.fromTo(images[3], {opacity:0, scale:0}, {duration:3, scale:1, opacity:1, delay:2.5*7.5, ease: "back.out(3)"});
		gsap.fromTo('.lastpart-title', {y:500, opacity:0, scale:0, color: 'pink'}, {duration:1.5, opacity:1, y:0, scale:1, color: '#AEE9FC', delay: 2.5*7.5 +2})
		gsap.to('.small-env', {duration: 0.6, opacity:1, delay: 2.8*7.5})
	}

	return {
		show,
	}
}