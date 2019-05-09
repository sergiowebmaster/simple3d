/*!
 * Simple3D v1.0.0 (http://www.sergiowebmaster.com.br/)
 * Copyright 2019 Sérgio Webmaster
 * Licensed under MIT
 */

var Simple3D = 
{
	formatAngle: function(angle)
	{
		if(angle < 0) return angle + 360;
		else if(angle >= 360) return angle - 360;
		else return angle;
	},
	byId: function(elementId)
	{
		return document.getElementById(elementId);
	},
	Screen: function(elementId)
	{
		this.tag = Simple3D.byId(elementId);
		
		this.setPerspective = function(px)
		{
			this.tag.style.perspective = px + "px";
		};
		
		this.setPerspectiveOrigin = function(xAxis, yAxis)
		{
			this.tag.style.perspectiveOrigin = xAxis + " " + yAxis;
		};
		
		this.moveByMouse = function()
		{
			this.tag.onmousemove = function(event)
			{
				this.style.perspectiveOrigin = (this.offsetWidth - event.clientX) + "px " + (this.offsetHeight - event.clientY) + "px";
				this.style.backgroundPosition = ((this.offsetWidth / 2) - event.clientX) + "px " + ((this.offsetHeight/2) - event.clientY) + "px";
			};
		};
	},
	Element: function(elementId)
	{
		this.obj = Simple3D.byId(elementId);
		this.velocity = 10;
		this.r = 15;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.rx = 0;
		this.ry = 0;
		this.rz = 0;
		this.scale = 1;
		
		this.getV2 = function()
		{
			return Math.round(this.velocity / 2);
		};
		
		this.getV3 = function()
		{
			return Math.round(this.velocity / 3);
		};
		
		this.setOrigin = function(x, y, z)
		{
			this.obj.style.transformOrigin = x + "px " + y + "px " + z + "px";
		};
		
		this.adjustOrigin = function()
		{
			this.setOrigin(-this.x, -this.y, -this.z);
		};
		
		this.onMove = function()
		{
			// Implement in code
		};
		
		this.move = function()
		{
			this.obj.style.transform = "translateX(" + this.x + "px) translateY(" + this.y + "px) translateZ(" + this.z + "px) rotateX(" + this.rx + "deg) rotateY(" + this.ry + "deg) rotateZ(" + this.rz + "deg) scale3d(" + this.scale + "," + this.scale + "," + this.scale + ")";
			this.onMove();
		};
		
		this.moveUp = function()
		{
			switch(this.rz)
			{
				case 15:
					this.x += this.getV3();
					this.y -= this.velocity;
					this.move();
					break;
					
				case 30:
					this.x += this.getV2();
					this.y -= this.velocity;
					this.move();
					break;
					
				case 45:
					this.x += this.velocity;
					this.y -= this.velocity;
					this.move();
					break;
					
				case 60:
					this.x += this.velocity;
					this.y -= this.getV2();
					this.move();
					break;
					
				case 75:
					this.x += this.velocity;
					this.y -= this.getV3();
					this.move();
					break;
					
				case 90:
					this.x += this.velocity;
					this.move();
					break;
					
				case 105:
					this.x += this.velocity;
					this.y += this.getV3();
					this.move();
					break;
					
				case 120:
					this.x += this.velocity;
					this.y += this.getV2();
					this.move();
					break;
					
				case 135:
					this.x += this.velocity;
					this.y += this.velocity;
					this.move();
					break;
					
				case 150:
					this.x += this.getV2();
					this.y += this.velocity;
					this.move();
					break;
					
				case 165:
					this.x += this.getV3();
					this.y += this.velocity;
					this.move();
					break;
					
				case 180:
					this.y += this.velocity;
					this.move();
					break;
					
				case 195:
					this.x -= this.getV3();
					this.y += this.velocity;
					this.move();
					break;
					
				case 210:
					this.x -= this.getV2();
					this.y += this.velocity;
					this.move();
					break;
					
				case 225:
					this.x -= this.velocity;
					this.y += this.velocity;
					this.move();
					break;
					
				case 240:
					this.x -= this.velocity;
					this.y += this.getV2();
					this.move();
					break;
					
				case 255:
					this.x -= this.velocity;
					this.y += this.getV3();
					this.move();
					break;
					
				case 270:
					this.x -= this.velocity;
					this.move();
					break;
					
				case 285:
					this.x -= this.velocity;
					this.y -= this.getV3();
					this.move();
					break;
					
				case 300:
					this.x -= this.velocity;
					this.y -= this.getV2();
					this.move();
					break;
					
				case 315:
					this.x -= this.velocity;
					this.y -= this.velocity;
					this.move();
					break;
					
				case 330:
					this.x -= this.velocity;
					this.y -= this.velocity;
					this.move();
					break;
					
				case 345:
					this.x -= this.getV3();
					this.y -= this.velocity;
					this.move();
					break;
					
				case 0:
					this.y -= this.velocity;
					this.move();
					break;
			}
		};
		
		this.moveDown = function()
		{
			switch(this.rz)
			{
				case 15:
					this.x -= this.getV3();
					this.y += this.velocity;
					this.move();
					break;
					
				case 30:
					this.x -= this.getV2();
					this.y += this.velocity;
					this.move();
					break;
					
				case 45:
					this.x -= this.velocity;
					this.y += this.velocity;
					this.move();
					break;
					
				case 60:
					this.x -= this.velocity;
					this.y += this.getV2();
					this.move();
					break;
					
				case 75:
					this.x -= this.velocity;
					this.y += this.getV3();
					this.move();
					break;
					
				case 90:
					this.x -= this.velocity;
					this.move();
					break;
					
				case 105:
					this.x -= this.velocity;
					this.y -= this.getV3();
					this.move();
					break;
					
				case 120:
					this.x -= this.velocity;
					this.y -= this.getV2();
					this.move();
					break;
					
				case 135:
					this.x -= this.velocity;
					this.y -= this.velocity;
					this.move();
					break;
					
				case 150:
					this.x -= this.getV2();
					this.y -= this.velocity;
					this.move();
					break;
					
				case 165:
					this.x -= this.getV3();
					this.y -= this.velocity;
					this.move();
					break;
					
				case 180:
					this.y -= this.velocity;
					this.move();
					break;
					
				case 195:
					this.x += this.getV3();
					this.y -= this.velocity;
					this.move();
					break;
					
				case 210:
					this.x += this.getV2();
					this.y -= this.velocity;
					this.move();
					break;
					
				case 225:
					this.x += this.velocity;
					this.y -= this.velocity;
					this.move();
					break;
					
				case 240:
					this.x += this.velocity;
					this.y -= this.getV2();
					this.move();
					break;
					
				case 255:
					this.x += this.velocity;
					this.y -= this.getV3();
					this.move();
					break;
					
				case 270:
					this.x += this.velocity;
					this.move();
					break;
					
				case 285:
					this.x += this.velocity;
					this.y += this.getV3();
					this.move();
					break;
					
				case 300:
					this.x += this.velocity;
					this.y += this.getV2();
					this.move();
					break;
					
				case 315:
					this.x += this.velocity;
					this.y += this.velocity;
					this.move();
					break;
					
				case 330:
					this.x += this.getV2();
					this.y += this.velocity;
					this.move();
					break;
					
				case 345:
					this.x += this.getV3();
					this.y += this.velocity;
					this.move();
					break;
					
				case 0:
					this.y += this.velocity;
					this.move();
					break;
			}
		};
		
		this.moveLeft = function()
		{
			switch(this.ry)
			{
				case 15:
					this.x -= this.velocity;
					this.z += this.getV3();
					this.move();
					break;
					
				case 30:
					this.x -= this.velocity;
					this.z += this.getV2();
					this.move();
					break;
					
				case 45:
					this.x -= this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 60:
					this.x -= this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 75:
					this.x -= this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 90:
					this.z += this.velocity;
					this.move();
					break;
					
				case 105:
					this.x += this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 120:
					this.x += this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 135:
					this.x += this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 150:
					this.x += this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 165:
					this.x += this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 180:
					this.x += this.velocity;
					this.move();
					break;
					
				case 195:
					this.x += this.velocity;
					this.z -= this.getV3();
					this.move();
					break;
					
				case 210:
					this.x += this.velocity;
					this.z -= this.getV2();
					this.move();
					break;
					
				case 225:
					this.x += this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 240:
					this.x += this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 255:
					this.x += this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 270:
					this.z -= this.velocity;
					this.move();
					break;
					
				case 285:
					this.x -= this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 300:
					this.x -= this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 315:
					this.x -= this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 330:
					this.x -= this.velocity;
					this.z -= this.getV2();
					this.move();
					break;
					
				case 345:
					this.x -= this.velocity;
					this.z -= this.getV3();
					this.move();
					break;
					
				case 0:
					this.x -= this.velocity;
					this.move();
					break;
			}
		};
		
		this.moveRight = function()
		{
			switch(this.ry)
			{
				case 15:
					this.x += this.velocity;
					this.z -= this.getV3();
					this.move();
					break;
					
				case 30:
					this.x += this.velocity;
					this.z -= this.getV2();
					this.move();
					break;
					
				case 45:
					this.x += this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 60:
					this.x += this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 75:
					this.x += this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 90:
					this.z -= this.velocity;
					this.move();
					break;
					
				case 105:
					this.x -= this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 120:
					this.x -= this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 135:
					this.x -= this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 150:
					this.x -= this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 165:
					this.x -= this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 180:
					this.x -= this.velocity;
					this.move();
					break;
					
				case 195:
					this.x -= this.velocity;
					this.z += this.getV3();
					this.move();
					break;
					
				case 210:
					this.x -= this.velocity;
					this.z += this.getV2();
					this.move();
					break;
					
				case 225:
					this.x -= this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 240:
					this.x -= this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 255:
					this.x -= this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 270:
					this.z += this.velocity;
					this.move();
					break;
					
				case 285:
					this.x += this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 300:
					this.x += this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 315:
					this.x += this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 330:
					this.x += this.velocity;
					this.z += this.getV2();
					this.move();
					break;
					
				case 345:
					this.x += this.velocity;
					this.z += this.getV3();
					this.move();
					break;
					
				case 0:
					this.x += this.velocity;
					this.move();
					break;
			}
		};
		
		this.moveFoward = function()
		{
			switch(this.ry)
			{
				case 15:
					this.x -= this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 30:
					this.x -= this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 45:
					this.x -= this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 60:
					this.x -= this.velocity;
					this.z -= this.getV2();
					this.move();
					break;
					
				case 75:
					this.x -= this.velocity;
					this.z -= this.getV3();
					this.move();
					break;
					
				case 90:
					this.x -= this.velocity;
					this.move();
					break;
					
				case 105:
					this.x -= this.velocity;
					this.z += this.getV3();
					this.move();
					break;
					
				case 120:
					this.x -= this.velocity;
					this.z += this.getV2();
					this.move();
					break;
					
				case 135:
					this.x -= this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 150:
					this.x -= this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 165:
					this.x -= this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 180:
					this.z += this.velocity;
					this.move();
					break;
					
				case 195:
					this.x += this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 210:
					this.x += this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 225:
					this.x += this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 240:
					this.x += this.velocity;
					this.z += this.getV2();
					this.move();
					break;
					
				case 255:
					this.x += this.velocity;
					this.z += this.getV3();
					this.move();
					break;
					
				case 270:
					this.x += this.velocity;
					this.move();
					break;
					
				case 285:
					this.x += this.velocity;
					this.z -= this.getV3();
					this.move();
					break;
					
				case 300:
					this.x += this.velocity;
					this.z -= this.getV2();
					this.move();
					break;
					
				case 315:
					this.x += this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 330:
					this.x += this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 345:
					this.x += this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 0:
					this.z -= this.velocity;
					this.move();
					break;
			}
		};
		
		this.moveBack = function()
		{
			switch(this.ry)
			{
				case 15:
					this.x += this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 30:
					this.x += this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 45:
					this.x += this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 60:
					this.x += this.velocity;
					this.z += this.getV2();
					this.move();
					break;
					
				case 75:
					this.x += this.velocity;
					this.z += this.getV3();
					this.move();
					break;
					
				case 90:
					this.x += this.velocity;
					this.move();
					break;
					
				case 105:
					this.x += this.velocity;
					this.z -= this.getV3();
					this.move();
					break;
					
				case 120:
					this.x += this.velocity;
					this.z -= this.getV2();
					this.move();
					break;
					
				case 135:
					this.x += this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 150:
					this.x += this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 165:
					this.x += this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 180:
					this.z -= this.velocity;
					this.move();
					break;
					
				case 195:
					this.x -= this.getV3();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 210:
					this.x -= this.getV2();
					this.z -= this.velocity;
					this.move();
					break;
					
				case 225:
					this.x -= this.velocity;
					this.z -= this.velocity;
					this.move();
					break;
					
				case 240:
					this.x -= this.velocity;
					this.z -= this.getV2();
					this.move();
					break;
					
				case 255:
					this.x -= this.velocity;
					this.z -= this.getV3();
					this.move();
					break;
					
				case 270:
					this.x -= this.velocity;
					this.move();
					break;
					
				case 285:
					this.x -= this.velocity;
					this.z += this.getV3();
					this.move();
					break;
					
				case 300:
					this.x -= this.velocity;
					this.z += this.getV2();
					this.move();
					break;
					
				case 315:
					this.x -= this.velocity;
					this.z += this.velocity;
					this.move();
					break;
					
				case 330:
					this.x -= this.getV2();
					this.z += this.velocity;
					this.move();
					break;
					
				case 345:
					this.x -= this.getV3();
					this.z += this.velocity;
					this.move();
					break;
					
				case 0:
					this.z += this.velocity;
					this.move();
					break;
			}
		};
		
		this.rotateTop = function()
		{
			this.rx = Simple3D.formatAngle(this.rx - this.r);
			this.move();
		};
		
		this.rotateDown = function()
		{
			this.rx = Simple3D.formatAngle(this.rx + this.r);
			this.move();
		};
		
		this.rotateLeft = function()
		{
			this.ry = Simple3D.formatAngle(this.ry + this.r);
			this.move();
		};
		
		this.rotateRight = function()
		{
			this.ry = Simple3D.formatAngle(this.ry - this.r);
			this.move();
		};
		
		this.setScale = function(scale)
		{
			this.scale = scale;
			this.move();
		}
	},
	Keyboard:
	{
		execute: function(eventType, config)
		{
			document.body.addEventListener(eventType, function(event)
			{
				if(config[event.keyCode]) config[event.keyCode]();
				else console.log("Key pressed: " + event.keyCode);
			});
		},
		onKeyDown: function(config)
		{
			Simple3D.Keyboard.execute("keydown", config);
		},
		onKeyUp: function(config)
		{
			Simple3D.Keyboard.execute("keyup", config);
		},
		onKeyPress: function(config)
		{
			Simple3D.Keyboard.execute("keypress", config);
		}
	}
};