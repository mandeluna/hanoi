Instructions for presenting Towers of Hanoi

I. Ensure software is set up

	1. Sublime Text
	2. Python 2.7
	3. Google Chrome

II. Introduce recursion (see also comments in hanoi.py)

	1. Explain problem
	2. Walk through 1, 2, 3 disks, ensuring students understand recursive nature of solution 
	3. Present the python code

III. Introduce JavaScript

	1. Show JavaScript equivalent of Python code (console.log instead of print)
	2. Show minimal index.html
	3. Add script tags
	4. Show how python -m SimpleHTTPServer can serve up the Hello world
	5. Show console logging in Chrome (inspect element)

IV. JavaScript Arrays

	1. Convert JavaScript code to collect instructions in an array
	2. Introduce basic model of pins using array with 0-origin indexing
	3. Create draw_hanoi() function to log the console to separate logic from presentation
	4. Briefly review Array documentation on MDN to illustrate other possibilities

V. Introduce HTML Canvas

	1. Update HTML file to use canvas element
	2. Update draw_hanoi() function to obtain canvas drawing context
	3. Create loaded() function, as canvas needs to be ready to draw the output
	4. Write messages to the canvas instead of the console
