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
	byID: function(elementId)
	{
		return document.getElementById(elementId);
	},
	Screen: function(elementId)
	{
		this.bkg = {x:0, y:0, v:50};
		this.tag = Simple3D.byID(elementId);
		
		var ref = this;
		
		this.updateBkgSize = function(zoom)
		{
			this.tag.style.backgroundSize = "auto " + zoom + "%";
		};
		
		this.updateBkgPos = function()
		{
			this.tag.style.backgroundPosition = this.bkg.x + "px " + this.bkg.y + "px";
		};
		
		this.moveBkgToUp = function()
		{
			this.bkg.y += this.bkg.v;
			this.updateBkgPos();
		};
		
		this.moveBkgToDown = function()
		{
			this.bkg.y -= this.bkg.v;
			this.updateBkgPos();
		};
		
		this.moveBkgToLeft = function()
		{
			this.bkg.x -= this.bkg.v;
			this.updateBkgPos();
		};
		
		this.moveBkgToRight = function()
		{
			this.bkg.x += this.bkg.v;
			this.updateBkgPos();
		};
		
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
				ref.setPerspectiveOrigin((this.offsetWidth - event.clientX) + "px", (this.offsetHeight - event.clientY) + "px");
				ref.bkg.x = (this.offsetWidth / 2) - event.clientX;
				ref.bkg.y = (this.offsetHeight/2) - event.clientY;
				ref.updateBkgPos();
			};
		};
	},
	Element: function(elementId)
	{
		this.obj = Simple3D.byID(elementId);
		this.velocity = 10;
		this.r = 15;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.rx = 0;
		this.ry = 0;
		this.rz = 0;
		this.scale = 1;
		
		var tf = new Array();
		
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
		
		this.setClass = function(className)
		{
			this.obj.className = className;
		};
		
		this.addClass = function(className)
		{
			this.obj.className = this.obj.className + " " + className;
		};
		
		this.centralize = function()
		{
			this.obj.style.left = "-" + (this.obj.offsetWidth / 2) + "px";
		}
		
		this.transform = function()
		{
			this.obj.style.transform = tf.join(" ");
		};
		
		this.clearTransform = function()
		{
			tf = new Array();
		};
		
		this.addTranslateX = function(x)
		{
			tf.push("translateX(" + x + "px)");
		};
		
		this.addTranslateY = function(y)
		{
			tf.push("translateY(" + y + "px)");
		};
		
		this.addTranslateZ = function(z)
		{
			tf.push("translateZ(" + z + "px)");
		};
		
		this.addRotateX = function(rx)
		{
			tf.push("rotateX(" + Simple3D.formatAngle(rx) + "deg)");
		};
		
		this.addRotateY = function(ry)
		{
			tf.push("rotateY(" + Simple3D.formatAngle(ry) + "deg)");
		};
		
		this.addRotateZ = function(rz)
		{
			tf.push("rotateZ(" + Simple3D.formatAngle(rz) + "deg)");
		};
		
		this.addScale3D = function(scale)
		{
			tf.push("scale3d(" + scale + "," + scale + "," + scale + ")");
		};
		
		this.onMove = function()
		{
			// Implement in your script.
		};
		
		this.move = function()
		{
			this.clearTransform();
			this.addTranslateX(this.x);
			this.addTranslateY(this.y);
			this.addTranslateZ(this.z);
			this.addRotateY(this.ry);
			this.addRotateX(this.rx);
			this.addRotateZ(this.rz);
			this.addScale3D(this.scale);
			this.transform();
			this.onMove();
		};
		
		function checkParams(params, item)
		{
			return params && params[item]? params[item] : 0;
		}
		
		this.moveByCamera = function(camera, params)
		{
			this.x = -camera.x;
			this.y = -camera.y;
			this.z = -camera.z;
			this.rx = -camera.rx;
			this.ry = -camera.ry;
			this.rz = -camera.rz;
			this.clearTransform();
			this.addTranslateX(this.x - checkParams(params, "x"));
			this.addTranslateY(this.y - checkParams(params, "y"));
			this.addTranslateZ(this.z - checkParams(params, "z"));
			this.addRotateX(checkParams(params, "rx"));
			this.addRotateY(checkParams(params, "ry") + 180);
			this.addRotateZ(checkParams(params, "rz"));
			this.addRotateX(this.rx);
			this.addRotateY(this.ry);
			this.addRotateZ(this.rz);
			this.addScale3D(this.scale);
			this.transform();
			this.setOrigin(-this.x, this.obj.offsetHeight - this.y, -this.z);
			this.onMove();
		};
		
		this.setX = function(x)
		{
			this.x = x;
			this.move();
		};
		
		this.setY = function(y)
		{
			this.y = y;
			this.move();
		};
		
		this.setZ = function(z)
		{
			this.z = z;
			this.move();
		};
		
		this.setRX = function(angle)
		{
			this.rx = Simple3D.formatAngle(angle);
			this.move();
		};
		
		this.setRY = function(angle)
		{
			this.ry = Simple3D.formatAngle(angle);
			this.move();
		};
		
		this.setRZ = function(angle)
		{
			this.rz = Simple3D.formatAngle(angle);
			this.move();
		};
		
		this.setScale = function(scale)
		{
			this.scale = scale;
			this.move();
		};
		
		this.moveDown = function()
		{
			switch(Simple3D.formatAngle(this.rz))
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
		
		this.moveUp = function()
		{
			switch(Simple3D.formatAngle(this.rz))
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
		
		this.moveRight = function()
		{
			switch(Simple3D.formatAngle(this.ry))
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
		
		this.moveLeft = function()
		{
			switch(Simple3D.formatAngle(this.ry))
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
		
		this.moveBack = function()
		{
			switch(Simple3D.formatAngle(this.ry))
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
		
		this.moveFoward = function()
		{
			switch(Simple3D.formatAngle(this.ry))
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
			this.setRX(this.rx + this.r);
		};
		
		this.rotateDown = function()
		{
			this.setRX(this.rx - this.r);
		};
		
		this.rotateLeft = function()
		{
			this.setRY(this.ry + this.r);
		};
		
		this.rotateRight = function()
		{
			this.setRY(this.ry - this.r);
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