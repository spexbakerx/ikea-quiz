//handles background image skew

document.addEventListener("mousemove", function (event) {

	const x = event.pageX
	const y = event.pageY

	const target = document.querySelector(".skew")
	const targetCoords = target.getBoundingClientRect()

	const targetX = targetCoords.left + (target.offsetWidth / 2)
	const targetY = targetCoords.top + (target.offsetHeight / 2)

	const angleX = (targetY - y) / 70	
	const angleY = (targetX - x) / -70

	target.style.transform = "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)"


})