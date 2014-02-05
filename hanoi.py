#
# hanoi.py - generate move instructions for towers of hanoi game
#
# 2014-02-14 Steven Wart created this file
#

# examples
# n = 1
#   move disk from pin 1 to pin 3
#
# n = 2
#   move disk from pin 1 to pin 2
#   move disk from pin 1 to pin 3
#   move disk from pin 2 to pin 3
#
# n > 1
#   move n-1 disks from pin 1 to pin 2
#   move disk from pin 1 to pin 3
#   move n-1 disks from pin 2 to pin 3

# n = num disks
# from = source pin [1,2,3]
# to = target pin [1,2,3]
# using = spare pin for temporary movements [1,2,3]
#
def hanoi(n, src=1, dest=3, using=2):
	if (n == 1):
		print("move from pin %d to pin %d" % (src, dest))
		return
	
	hanoi(n-1, src, using, dest)
	hanoi(1, src, dest, using)
	hanoi(n-1, using, dest, src)

print("n = 1")
hanoi(1)

print("n = 2")
hanoi(2)

print("n = 6")
hanoi(6)