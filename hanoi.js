/*
 * hanoi.js - generate move instructions for towers of hanoi game
 *
 * 2014-02-14 Steven Wart created this file
 */

/* examples
 * n = 1
 *   move disk from pin 1 to pin 3
 *
 * n = 2
 *   move disk from pin 1 to pin 2
 *   move disk from pin 1 to pin 3
 *   move disk from pin 2 to pin 3
 *
 * n > 1
 *   move n-1 disks from pin 1 to pin 2
 *   move disk from pin 1 to pin 3
 *   move n-1 disks from pin 2 to pin 3
 */

/*
 * do_hanoi - recursive implementation that actually does the work
 *
 * This differs from the python version in that we don't actually
 * have a print statement in JavaScript, so we need to prepare the
 * list of instructions for a GUI to display the movement of the disks.
 *
 * Each instruction in the list is just a pair of integers (src, dest)
 *
 * JavaScript is also usually called from HTML and hosted on a web server.
 *
 * n = num disks
 * from = source pin [1,2,3]
 * to = target pin [1,2,3]
 * using = spare pin for temporary movements [1,2,3]
 * Daniel was here
 */
function do_hanoi(n, src, dest, using) {
	if (n == 1) {
		//console.log("move from pin " + src + " to pin " + dest);
		return [[src, dest]];
	}
	
	var instructions = do_hanoi(n-1, src, using, dest);
	instructions = instructions.concat(do_hanoi(1, src, dest, using));
	instructions = instructions.concat(do_hanoi(n-1, using, dest, src));

	return instructions;
}

/*
 * JavaScript functions cannot have optional arguments, so this is a
 * wrapper function to use to invoke the recursive function.
 */
function hanoi(n) {
	return do_hanoi(n, 1, 3, 2);
}

function draw_hanoi(n, pins) {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.font = "bold 12px sans-serif";
	context.fillStyle = "black";
	context.fillText("n = " + n, 60, 40);

	var disk_height = 20;
	var pin_x = 220;
	var pin_y = 20;
	var pin_width = 5;
	var pin_height = disk_height * n + 40;

	for (var pin=0; pin < 3; pin++) {
		// draw the pins
		context.fillStyle = "black";
		context.fillRect(pin_x, (canvas.height - pin_height) + pin_y, pin_width, pin_height);

		var disk_y = 20;
		var stack = pins[pin];
		var disk = stack.slice(1, stack.length);

		stack.forEach(function(disk) {
			context.fillStyle = disk.style;
			var x = pin_x - disk.width / 2;
			var y = (canvas.height - disk_height - 20) + disk_y;
			context.fillRect(x, y, disk.width, disk_height);
			context.fillStyle = "black";
			context.fillText(disk.id, pin_x-4, y+14);
			disk_y -= 20;
		});
		pin_x = pin_x + 220;
	}
}

function animate_instructions(n, instructions, pins) {

	draw_hanoi(n, pins);

	if (instructions.length == 0)
		return;

	var instruction = instructions.shift();
	var src = instruction[0];
	var dest = instruction[1];

	var disk = pins[src-1].pop();
	pins[dest-1].push(disk);

	setTimeout(function() {
		animate_instructions(n, instructions, pins);
	}, 500);
}

function loaded() {
	// color categories from d3.js -- d3.scale.category20()
	var categories = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
					  '#98df8a','#d62728', '#ff9896', '#9467bd', '#c5b0d5',
					  '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
					  '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];

	var n = 32;
	var disks = [];
	var width = 200;
	for (var i=0; i < n; i++) {
		width -= 10;
		disks.push({id:i, style:categories[i % categories.length], width:width});
	}

	var pins = [disks, [], []];

	// this can take a long time if n is large
	// if n is more than about 10, the disks won't draw correctly
	var instructions = hanoi(n);

	animate_instructions(n, instructions, pins);
}