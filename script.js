
gsap.set('.about', {y: 1000, opacity: 0});		

const Home_event = () => {
	const start_btn = document.querySelector('.start-btn');
	const about_btn = document.querySelector('.about-btn');
	const back_btn = document.querySelector('.back-btn');
		
	about_btn.addEventListener('click', () => {
	gsap.fromTo('.about', {y:100, opacity:0}, {duration:1, y: 0, opacity: 1});
	gsap.to('.home', {duration:1, y: 1000, opacity: 0});		
	})

	back_btn.addEventListener('click', () => {
		gsap.fromTo('.home', {y:100, opacity:0}, {duration:1, y: 0, opacity: 1});
		gsap.to('.about', {duration:1, y: 1000, opacity: 0});		
	})
};

var mouse = {
		x: undefined,
		y: undefined
}

const Canvas_style = () => {
	const canvas = document.querySelector("canvas");
	const context = canvas.getContext('2d');
	const height_ratio = 0.6;
	canvas.height = canvas.width * height_ratio;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const particlesarray = [];

	canvas.addEventListener('mousemove', (e) => {
		draw_heart(context, e.layerX, e.layerY, 50, 50 )	})

	function draw_heart(x, y, width, height){
        context.save();
        context.beginPath();
        var topCurveHeight = height * 0.3;
        context.moveTo(x, y + topCurveHeight);
        // top left curve
        context.bezierCurveTo(
          x, y, 
          x - width / 2, y, 
          x - width / 2, y + topCurveHeight
        );
                
        // bottom left curve
        context.bezierCurveTo(
          x - width / 2, y + (height + topCurveHeight) / 2, 
          x, y + (height + topCurveHeight) / 2, 
          x, y + height
        );
                
        // bottom right curve
        context.bezierCurveTo(
          x, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + topCurveHeight
        );
                
        // top right curve
        context.bezierCurveTo(
          x + width / 2, y, 
          x, y, 
          x, y + topCurveHeight
        );
                
        context.closePath();
        context.fillStyle = "red";
        context.fill();
        context.restore();
    }


    function handleParticles() {
	for(let i =0; i < particlesarray.length; i++) {
		particlesarray[i].update();
		particlesarray[i].draw();
		if (particlesarray[i].sizse <= .3) {
			particlesarray.splice(i,1);
		}
	}
}

	function animate() {
		context.fillStyle = 'rgba(0,0,0,.1)';
		context.fillRect(0,0, canvas.width, canvas.height);
		handleParticles();
		requestAnimationFrame(animate);
	}

	
	canvas.addEventListener('mousemove', (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;

		for(let i = 0; i< 10; i++) {
			particlesarray.push(new Particles())
		}
	})

	return {
		draw_heart,
	}
};


class Particles {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.width = Math.random() * 15 + 1;
		this.height = this.width + 2;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;

		if(this.size > .2) {
			this.sizse -=.1;
		}
	}

	draw() {
		Canvas_style().draw_heart(this.x, this.y, this.width, this.height);
	}
}




(function () {
	const canvas = Canvas_style();
	Home_event();
})();





