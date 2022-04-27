
const Home_event = () => {
	const start_btn = document.querySelector('.start-btn');
	const about_btn = document.querySelector('.about-btn');
	const back_btn = document.querySelector('.back-btn');
	const show_envelope_btn = document.querySelector('.open-envelope-btn');
		
	about_btn.addEventListener('click', () => {
	gsap.fromTo('.about', {y:100, opacity:0}, {duration:1, y: 0, opacity: 1});
	gsap.to('.home', {duration:1, y: 1000, opacity: 0});		
	})

	back_btn.addEventListener('click', () => {
		gsap.fromTo('.home', {y:100, opacity:0}, {duration:1, y: 0, opacity: 1});
		gsap.to('.about', {duration:1, y: 1000, opacity: 0});		
	})

	start_btn.addEventListener('click', (e) => {
		Canvas().animate();

		gsap.to('.home', {duration:1, y: 1000, opacity: 0});		
		gsap.to('.bottom-border', {duration: 0.3, y: 100})
		gsap.fromTo('.blur-bg', {opacity: 0, filter: 'blur(0px)'}, {delay: 0.2, duration: 0.4, opacity: 1, filter: 'blur(8px)'})

		gsap.fromTo('.canvas-div', {zIndex:0}, {delay: 0.4, duration:0.8, zIndex:999});
		gsap.fromTo('.greeting-title', {color: '#fff', opacity: 0, y:-50}, {duration: 1.4, delay: 1, color: '#AEE9FC', opacity: 1, y: 0});
		gsap.fromTo('canvas', {opacity: 0, scale: .4, zIndex:0}, {delay: 0.4, duration: 0.8, opacity: 1, scale: 1, zIndex: 999});
	})

	show_envelope_btn.addEventListener('click', ()=> {
		Envelope().show()
		gsap.to('.open-envelope-btn', {duration: 0.5, y: 100, opacity:0})
	})
};


const Canvas = () => {
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
	const height_ratio = 0.6;

	canvas.width = 1000;
	canvas.height = canvas.width * height_ratio;
	ctx.font = "30px Arial";
	window.addEventListener('keydown', canvas_event.bind(event), true)
	
	let click_key = false;
	let fadein_bool = false;

	let scene_timer_last = undefined;
	let currentTime = undefined;
	let time_gap = undefined;
	let first_instruc_width = undefined;
	let instruc_width = 0;

	let scene_count = 1;
	let opacity = 1;
	
	let instructions = {
		first: "Press 's' to start!",
		second: "Press 't' to take the cake.",
		third: "Press 'g' to get the envelope."
	} 


	let scene_1 = Scene_1(ctx, canvas.width, canvas.height, solo=true);
	let scene_2 = Scene_2(ctx, canvas.width, canvas.height);
	let scene_3 = Scene_3(ctx, canvas.width, canvas.height);
	let scene_4 = Scene_4(ctx, canvas.width, canvas.height, instructions);
	let scene_5 = Scene_1(ctx, canvas.width, canvas.height, solo=false);
	let scene_6 = Scene_6(ctx, canvas.width, canvas.height, instructions);


	function play_audio(audio) {
		new Audio(audio).play();
	}

	function change_scene(scene_no) {
		ctx.fillStyle = '#AEE9FC';
		ctx.fillRect(0,0,canvas.width, canvas.height);

		if (scene_no == 1 ) {
			scene_2.draw_front_home();
		} else if (scene_no == 2) {
			scene_3.draw_inside_home();
		} else if(scene_no == 3) {
			scene_4.draw_outside_home(new Date().getTime() - currentTime);		
		} else if(scene_no == 4) {
			scene_5.draw_travel(solo=false, null);
		} else if (scene_no == 5) {
			scene_6.draw_beach();
		}
		

		scene_timer_last = new Date().getTime();
	}


	function transition() {
		if(opacity > 0.01 && !fadein_bool){
			opacity -= .02;
		}else if(opacity <= 0){  //if less than 0.01 then, clear rect, and turn off scene 1
			fadein_bool = true;
		}
	}


	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		currentTime = new Date().getTime();
		time_gap = currentTime - scene_timer_last;

		if(scene_count == 1) {
			scene_1.draw_travel(time_gap);	

			if(time_gap >= 8000) {
				window.removeEventListener('keydown', canvas_event.bind(event), true)
				transition();
			}

			if(click_key) {
				scene_1.scene1_moving(time_gap);
			}else if(!click_key) {
				scene_1.display_instruction(instructions.first)
			} 
		}	


		if(scene_count == 2) {
			scene_2.draw_front_home();
			scene_2.check();

			if(scene_2.getBoy_x() >= 370 && (time_gap >= 7000) ) {
				transition();
			}
		}


		if(scene_count == 3){
			scene_3.draw_inside_home(currentTime, scene_timer_last);
			if(time_gap >= 3200) {
				transition();
			}
		}

		if(scene_count == 4) {
			scene_4.draw_outside_home(time_gap, currentTime) 

			if(scene_4.getLocal_time_gap() >= 18000) {
				transition();
			}
		}

		if(scene_count == 5) {
			scene_5.draw_travel(time_gap);
			scene_5.scene1_moving(time_gap);

			if(time_gap >= 10000) {
				transition();
			}
		}

		if(scene_count == 6) {
			scene_6.draw_beach(time_gap, currentTime);
		}


		if(fadein_bool) { //fade_in
			if (opacity <= 1) opacity += 0.009;
			if(opacity > 1) {
				opacity = 1;
				fadein_bool = false;
				scene_count += 1;
			}
			change_scene(scene_count);
		}


		ctx.globalAlpha = opacity;
		requestAnimationFrame(animate);					
	}


	function canvas_event(e) {
		if (e.keyCode == 83 && !click_key && scene_count == 1){
			click_key = true;
			scene_timer_last = new Date().getTime();
			play_audio('./assets/sound/make_you_mine.mp4')
		} else if(e.keyCode == 84 && scene_count == 4) {
			scene_4.giving_cake()
		} else if(e.keyCode == 71 && scene_count == 6) {
			scene_6.set_envelope_received(true);
		}
	} 

	return {
		animate,
	}

};


const Envelope = () => {
	const open_envelope_btn = document.querySelector('.open-it-circle');
	let is_envelope_open = false;

	function show() {
		gsap.to('.envelope', {duration: 1, y:0, opacity: 1, scale: 1, ease: "slow(0.5, 0.7, false)"});
	}

	function open() {
		is_envelope_open = true;
		gsap.to('.envelope', {duration: 1, y: 90, ease: "slow(0.5, 0.7, false)"});
		gsap.to('.top-side', {duration:1, rotationX: 0, zIndex: 3, ease: "sine.out"});
		gsap.set('.open-it-circle', {rotationX: 360})
		gsap.to('.envelope-content', {duration:1.5, delay: 0.9, y: -140, zIndex: 3, ease: "back.out(3)"});
		open_envelope_btn.textContent = "Close";
	}

	function close() {
		is_envelope_open = false;
		gsap.to('.envelope', {duration: 1, delay: 1.6, y: 0, ease: "slow(0.5, 0.7, false)"});
		gsap.to('.top-side', {duration:1, delay: 1.6, rotationX: 160, zIndex: 6, ease: "sine.out"});
		gsap.to('.envelope-content', {duration:1.5, y: 0, zIndex: 3, ease: "back.in(3)"});
		gsap.set('.open-it-circle', {delay: 2, rotationX: 160});
		open_envelope_btn.textContent = "Open";
		gsap.to('.envelope', {duration: 1, delay: 2.5, y: 1000, opacity: 0, scale: 0.5, ease: "slow(0.5, 0.7, false)"});
	}


	function _event() {
		open_envelope_btn.addEventListener('click', () => {
			if(is_envelope_open) {
				close();
			}else if(!is_envelope_open) {
				open();
			}
		});
	}

	return {
		show,
		_event,
	}
}


(function () {
	gsap.set('.envelope', {y:1000, opacity: 0, scale: 0.5,});	
	gsap.set('.about', {y: 1000, opacity: 0});	
	gsap.set('.open-envelope-btn', {y: 100, opacity:0});
	Home_event();
	Envelope()._event();
})();