const Scene_1 = (ctx, canvas_width, canvas_height, solo) => {

	let game_speed = 15;
	let x = 0;
	let x2 = canvas_width;
	let motor_x = -100;

	const background_layer1 = new Image();
	const road = new Image();
	const solo_motor = new Image();
	const couple_motor = new Image();
	const releived_emoji = new Image();

	background_layer1.src = './assets/img/scenery_canvas.png';
	road.src = './assets//img/road.png';
	solo_motor.src = './assets/img/solo_motor.png';
	couple_motor.src = './assets/img/couple_motor.png';
	releived_emoji.src = './assets/img/emoji/emoji9.png';

	function display_instruction(first_instruc) {
		ctx.fillStyle = '#fff';
		first_instruc_width = ctx.measureText(first_instruc).width
		ctx.fillText(first_instruc, ((canvas_width + first_instruc_width) / 2) - first_instruc_width , canvas_height - 20);
	}

	function draw_travel(time_gap) {
		ctx.drawImage(background_layer1, 0, 0, canvas_width, canvas_height);

		ctx.drawImage(road, x, canvas_height-200, canvas_width, 200);
		ctx.drawImage(road, x2, canvas_height-200, canvas_width, 200);

		if(solo) {
			ctx.drawImage(solo_motor, motor_x, canvas_height-220, 100, 110);
		} else if(!solo) {
			ctx.drawImage(couple_motor, motor_x, canvas_height-220, 100, 110);
			if(time_gap >= 5000 && time_gap <= 8000) {
				ctx.drawImage(releived_emoji, motor_x + 35, canvas_height - 230, 30, 30);
			} 
		}
	}

	function scene1_moving(time_gap) {
		if(x < -1000) x = 1000 + x2 - game_speed;
		else x -= game_speed;

		if(x2 < -1000) {
			x2 = 1000 + x - game_speed;
		}
		else x2 -= game_speed;

		if(motor_x < 100) {
			motor_x++;
		}

		if(solo && time_gap >= 6000) {
			motor_x += 3.5;
		} else if (!solo && time_gap >= 8000) {
			motor_x += 3.5;
		}


	}

	return {
		draw_travel, 
		scene1_moving,
		display_instruction
	}
}