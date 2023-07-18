<!DOCTYPE html>
<html>
<head>
	<title>JSMpeg Stream Client</title>
	<style type="text/css">
		html, body {
			background-color: #111;
			text-align: center;
		}
	</style>
	
</head>
<body>
	<canvas id="video-canvas"></canvas>
	<script type="text/javascript" src="jsmpeg.min.js"></script>
	<script type="text/javascript">
    var canvas = document.getElementById('video-canvas');
    console.log(document.location.hostname);
		var url = 'ws://localhost:6790/';
		var player = new JSMpeg.Player(url, {canvas: canvas});
	</script>
</body>
</html>