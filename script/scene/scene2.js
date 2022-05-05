const Scene_2 = (ctx, canvas_width, canvas_height) => {
	const front_house = new Image();
	const boy_side_view = new Image();
	const boy_back_view = new Image();
	const emoji_1 = new Image();
	const bush = new Image();

	front_house.src = './assets/img/front-house.png'
	bush.src = './assets/img/bush.png'
	boy_side_view.src = './assets/img/main_anime_boy1.png'
	boy_back_view.src = './assets/img/main_anime_boy2.png'
	emoji_1.src = './assets/img/emoji/emoji1.png'

	let boy_x = -100;
	let boy_speed = 3;
	let boy_y = canvas_height - 220;

	function get_img_obj() {
		return [front_house,bush, boy_side_view, boy_back_view, emoji_1];
	}


	function draw_front_home() {
		ctx.drawImage(front_house, 0, 0, canvas_width, canvas_height);
		draw_boy();
		ctx.drawImage(bush, -150, canvas_height - 120, canvas_width / 1.2, 300);
	}

	function draw_boy() {
		if(boy_x < 370) {
			ctx.drawImage(boy_side_view, boy_x, boy_y, 50, 200);
		}else {
			ctx.drawImage(boy_back_view, boy_x, boy_y, 50, 200);
		}
	}

	function check() {
		if(boy_x <= 370) {
			boy_x += boy_speed;
			if(boy_y > 340){
				boy_y -= .5;	
			}		
		}

		if(boy_x >= 150 && boy_x < 280) {
			boy_speed = 1;
			ctx.drawImage(emoji_1, boy_x, boy_y, 70, 50);
		}
	}

	return {
		draw_front_home,
		check,
		get_img_obj,
		getBoy_x : () => boy_x,
	}
}