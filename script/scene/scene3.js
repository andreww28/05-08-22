const Scene_3 = (ctx, canvas_width, canvas_height) => {
	const girl_inside = new Image();
	const inside_house = new Image();
	const angry_emoji = new Image();

	girl_inside.src = './assets/img/main_anime_girl2.png';
	inside_house.src = './assets/img/inside_house.jpg';
	angry_emoji.src = './assets/img/emoji/emoji_2.png';

	let time_gap;

	function get_img_obj() {
		return [girl_inside, inside_house, angry_emoji];
	}

	function draw_inside_home(currentTime, scene_timer_last) {
		ctx.drawImage(inside_house, 0,0, canvas_width, canvas_height);
		ctx.drawImage(girl_inside, canvas_width - 300, canvas_height - 430, 150, 450)

		time_gap = currentTime - scene_timer_last;

		if(time_gap >= 1500 && time_gap <= 2500){
			ctx.drawImage(angry_emoji, canvas_width - 300, canvas_height - 435, 150, 130);	
		}	
	}

	return {
		draw_inside_home,
		get_img_obj
	}
}