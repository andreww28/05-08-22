const Scene_4 = (ctx, canvas_width, canvas_height, instructions) => {

	const front_house = new Image();
	const boy_back_view = new Image();
	const  girl_front_view = new Image();
	const boy_side_view = new Image();
	const girl_side_view = new Image();

	const thumbs_down_emoji = new Image();
	const cute_angry_emoji = new Image();
	const look_down_emoji = new Image();
	const smile_emoji = new Image();
	const float_heart_emoji = new Image();
	const feeling_love_emoji = new Image();


	const cake = new Image();

	front_house.src = './assets/img/front-house.png'
	boy_back_view.src = './assets/img/main_anime_boy2.png'
	girl_front_view.src = './assets/img/main_anime_girl1.png'
	boy_side_view.src = './assets/img/main_anime_boy1.png'
	girl_side_view.src = './assets/img/main_anime_girl2.png'

	thumbs_down_emoji.src = './assets/img/emoji/emoji5.png';
	cute_angry_emoji.src = './assets/img/emoji/emoji4.png';
	look_down_emoji.src = './assets/img/emoji/emoji8.png';
	smile_emoji.src = './assets/img/emoji/emoji6.png';
	float_heart_emoji.src = './assets/img/emoji/emoji3.png';
	feeling_love_emoji.src = './assets/img/emoji/emoji7.png';


	cake.src = './assets/img/cake.png';


	let take_cake = false;
	let time_last = undefined;
	let local_time_gap = undefined;

	function display_instruction(second_instruc) {
		ctx.fillStyle = '#fff';
		second_instruc_width = ctx.measureText(second_instruc).width
		ctx.fillText(second_instruc, ((canvas_width + second_instruc_width) / 2) - second_instruc_width , canvas_height - 20);
	}

	function draw_outside_home(time_gap, currentTime){
		ctx.drawImage(front_house, 0, 0, canvas_width, canvas_height);

		if(time_gap <= 3000) {
			ctx.drawImage(boy_back_view, 370, 349, 50, 200);
			ctx.drawImage(girl_front_view, 420, 350, 45, 150);
		}else if(time_gap > 3000){
			draw_cake(time_gap);
			ctx.drawImage(boy_side_view, 300, canvas_height - 350, 90, 450);
			ctx.drawImage(girl_side_view, 500, canvas_height - 300, 80, 330);

			(time_gap > 4000 && !take_cake) && display_instruction(instructions.second);
		}
		
		draw_emoji(time_gap, currentTime);
	}

	function draw_emoji(time_gap, currentTime) {
		if(time_gap >= 1000 &&  time_gap <= 3000) {
			ctx.drawImage(thumbs_down_emoji, 420, 350, 40, 40);
		}

		if(take_cake) {
			local_time_gap = currentTime - time_last;

			if(local_time_gap <= 3000){
				ctx.drawImage(look_down_emoji, 300, canvas_height - 350, 100, 100);	
			}

			if(local_time_gap > 3000 && local_time_gap <= 6000) {
				ctx.drawImage(cute_angry_emoji, 500, canvas_height - 310, 80, 80);	
			}

			if(local_time_gap > 6000 && local_time_gap <= 9500) {
				ctx.drawImage(smile_emoji, 500, canvas_height - 310, 80, 80);	
			}

			if(local_time_gap > 9500 && local_time_gap <= 13000) {
				ctx.drawImage(float_heart_emoji, 500, canvas_height - 310, 80, 80);	
			}

			if(local_time_gap > 11000 && local_time_gap <= 15000) {
				ctx.drawImage(feeling_love_emoji, 300, canvas_height - 350, 100, 100);	
			}

			
		}
	}

	function draw_cake(time_gap) {
		if(time_gap > 4000 && !take_cake) {
			ctx.drawImage(cake, 330, canvas_height - 190, 100, 70);	
			time_last = new Date().getTime();		
		}else if(take_cake && local_time_gap <= 16000) {
			ctx.drawImage(cake, 450, canvas_height - 190, 100, 70);		
		}
	}

	return {
		draw_outside_home,
		giving_cake: () => take_cake = true,
		getLocal_time_gap : () => local_time_gap
	}
}