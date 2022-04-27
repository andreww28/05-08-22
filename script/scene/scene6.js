const Scene_6 = (ctx, canvas_width, canvas_height, instructions) => {

	let empty_beach = new Image();
	let boy_character = new Image();
	let girl_character = new Image();
	let envelope = new Image();

	let shy_emoji = new Image();
	let happy_emoji = new Image();
	let thankful_emoji = new Image();

	empty_beach.src = './assets/img/empty_beach.jpg';
	boy_character.src = './assets/img/main_anime_boy1.png';
	girl_character.src = './assets/img/main_anime_girl2.png';
	envelope.src = './assets/img/envelope_letter.png';
	shy_emoji.src = './assets/img/emoji/emoji10.png'
	happy_emoji.src = './assets/img/emoji/emoji11.png'
	thankful_emoji.src = './assets/img/emoji/emoji7.png'


	let local_time_last = undefined;
	let local_time_gap = undefined;
	let envelope_received = false;
	let show_btn = false;
	let envelope_open = false;

	function display_instruction(instruc) {
		ctx.fillStyle = '#fff';
		instruc_width = ctx.measureText(instruc).width;
		ctx.fillText(instruc, ((canvas_width + instruc_width) / 2) - instruc_width , canvas_height - 20);
	}

	function draw_beach(time_gap, currentTime) { 
		ctx.drawImage(empty_beach, 0, 0, canvas_width, canvas_height);

		if(time_gap >= 3000) {
			if(!envelope_received){
				ctx.drawImage(envelope, 355, canvas_height - 190, 50, 30);			
				local_time_last = new Date().getTime();		
					
			}else if(envelope_received) {
				if(!envelope_open) {
					ctx.drawImage(envelope, 480, canvas_height - 170, 50, 30);								
				} 
			}	
		}

		ctx.drawImage(boy_character, 300, canvas_height - 350, 90, 450);
		ctx.drawImage(girl_character, 500, canvas_height - 300, 80, 330);

		local_time_gap = currentTime - local_time_last;
		draw_emoticons(time_gap);
		(!envelope_received && time_gap >= 3000) && display_instruction(instructions.third);
	}

	function draw_emoticons(time_gap) {
		if((time_gap >= 3500 && time_gap <= 5000) && !envelope_received) {
			ctx.drawImage(shy_emoji, 300, canvas_height - 350, 100, 100);	
		}

		if(envelope_received){
			if(local_time_gap <= 2500) {
				ctx.drawImage(happy_emoji, 500, canvas_height - 300, 80, 80);	
			} else if(local_time_gap > 3000 && local_time_gap <= 6000) {
				ctx.drawImage(thankful_emoji, 500, canvas_height - 300, 80, 80);	

				if(!show_btn){
					gsap.to('.open-envelope-btn', {duration: 0.7, y:0, opacity: 1})
					show_btn = true;
				}
			}	
		}
	}

	return {
		draw_beach,
		set_envelope_received : (bool) => envelope_received = bool
	}
}