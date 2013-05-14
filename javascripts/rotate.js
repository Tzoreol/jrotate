(function($){
  
		function d2r(d) {
			//An half circle (180°) is Pi radians
			return (d * Math.PI) / 180;
		}
		
		function r2d(r) {
			return (r * 180) / Math.PI;
		}
		
		function getAngle(cos, sin)
		{
			if(sin >= 0)
			{
				return Math.acos(cos);
			}
			else
			{
				return (2 * Math.PI) - Math.acos(cos);
			}
		}
		
		//Return 0 if close to it at 1 e-15
		function round(value) {
			if(Math.abs(value * 1000000000000000) < 1)
			{
				return 0;
			}
			else
			{
				return value;
			}
		}
		
		function doTheRotation(angle, rotation, elt) {
		
			if(rotation < 0)
			{
				it = -i;
			}
			else
			{
				it = i;
			}
			
			console.log(d2r(i));
			var cos = round(Math.cos(angle + d2r(it))).toString();
			var sin = round(Math.sin(angle + d2r(it))).toString();

			//Transform values to a css one
			var matrix = 'matrix(' + cos + ',' + sin + ',' + (-sin) + ',' + cos + ',0,0)';
			$(elt).css('transform', matrix);

			i++;
			//Checks if time is off
			var d2 = new Date();
			
			if(d2r(i) >= Math.abs(rotation))
			{
				console.log((angle + d2r(it)));
				clearInterval(timer);
			}
		}
		
		$.fn.rotate = function(v, duration) {

			//Converts value to radians
			var angle = 0;
			var rotation = d2r(v);
			var elt = $(this);
			
			//Getting actual transformation
			var matrix = $(this).css('transform');
			
			//If transformation is not null
			if((matrix != 'none') && (typeof(matrix) != 'undefined'))
			{
				//Change string to get only values
				var  values = matrix.replace('matrix(', '');
				values = values.replace(')', '');
			
				var tab = values.split(',');
			
				//Getting actual angle
				var Xx = parseFloat(tab[0]); //cos(angle)
				var Xy = parseFloat(tab[1]); //sin(angle)
				var angle = getAngle(Xx, Xy);
			}
				
			/* For a rotation, the matrix is like :
			*	[cos(v)  sin(v)]
			* 	[-sin(v) cos(v)]
			* So we have to calculate the new value (in radians)
			* http://www.eleqtriq.com/2010/05/css-3d-matrix-transformations/
			*/
			var scale = Math.round((duration / v));
			
			var d = new Date();
			t = d.getTime();
			i = 0;
			
			timer = setInterval(function(){doTheRotation(angle, rotation, elt);}, scale);
		};
	})(jQuery);
