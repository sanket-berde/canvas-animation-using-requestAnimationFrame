function BoxAnimation(){
	this.animateBox = _animateBox.bind(this);
	this.bCancelAnimation = false;
	this.bOutOfBounds = false;
	this.nRequestAnimation = null;
	init.call(this);
}

function init(){
	var canvas = document.getElementById('myCanvas'),
		oBoundsString;
		this.canvasContext = canvas.getContext("2d");
		this.canvasDimensions = {
			width: 918,
			height: 918
		};
		this.boxDimensions = {
			height : 100,
			width: 100
		};
		this.boxX = 0;
		this.boxY = 0;
		this.increamenter = 5;
		this.oBounds = {
			top: 0,
			right: this.canvasDimensions.width - this.boxDimensions.width,
			bottom: this.canvasDimensions.height - this.boxDimensions.height,
			left: 0
		};
		oBoundsString = JSON.stringify(this.oBounds);
		this.oBoundsCopy = JSON.parse(oBoundsString);

	this.canvasContext.fillStyle = '#ff0000';
	_animateBox.call(this);	
	_bindEvents.call(this);
}

function _bindEvents(){
	var oScope = this;
	document.getElementById('btn_play').addEventListener('click', function(){
		if(oScope.bCancelAnimation || oScope.bOutOfBounds){
			oScope.bCancelAnimation = false;
			oScope.bOutOfBounds = false;
			oScope.nRequestAnimation = requestAnimationFrame(oScope.animateBox);
		}
	});
	document.getElementById('btn_pause').addEventListener('click', function(){
		cancelAnimationFrame(oScope.nRequestAnimation); 
		oScope.bCancelAnimation = true;
	});
}
	

function _reset(){
	var oBoundsString = JSON.stringify(this.oBounds);
	this.oBoundsCopy = JSON.parse(oBoundsString);
	this.boxX = 0;
	this.boxY = 0;
	this.bCancelAnimation = false;
	this.bOutOfBounds = true;
}
function _animateBox(){
	var oScope = this;
	this.canvasContext.clearRect(0, 0, this.canvasDimensions.width, this.canvasDimensions.height);
	
	
	if(this.boxY <= this.oBoundsCopy.top && this.boxX + this.increamenter <= this.oBoundsCopy.right){
		//console.log('LTR');
		if(this.boxY + (this.increamenter*2) >= this.oBoundsCopy.bottom ){
			cancelAnimationFrame(this.nRequestAnimation); 
			this.bCancelAnimation = true;
		}
		this.boxX += this.increamenter;
	}
	else if(this.boxY + this.increamenter <= this.oBoundsCopy.bottom && this.boxX  + this.increamenter >= this.oBoundsCopy.right){
		//console.log('TTB');
		if(this.boxX - (this.increamenter*2) <= this.oBoundsCopy.left ){
			cancelAnimationFrame(this.nRequestAnimation); 
			this.bCancelAnimation = true;
		}
		this.boxY += this.increamenter;
	}
	else if(this.boxX - this.increamenter >= this.oBoundsCopy.left && this.boxY + this.increamenter >= this.oBoundsCopy.bottom){
		//console.log('BTL');
		if(this.boxY - (this.increamenter*2) <= this.oBoundsCopy.top ){
			cancelAnimationFrame(this.nRequestAnimation); 
			this.bCancelAnimation = true;
		}
		this.boxX -= this.increamenter;
	}
	else if(this.boxX - this.increamenter <= this.oBoundsCopy.left && this.boxY - this.increamenter >= this.oBoundsCopy.top){
		//console.log('BTT');
		if(this.boxX + (this.increamenter*2) >= this.oBoundsCopy.right){
			cancelAnimationFrame(this.nRequestAnimation); 
			this.bCancelAnimation = true;
		}
		this.boxY -= this.increamenter;
		if(this.boxY - this.boxDimensions.height <= this.oBoundsCopy.top){
			this.boxY = this.boxY; 
			this.oBoundsCopy.top = this.oBoundsCopy.top + this.boxDimensions.height;
			this.oBoundsCopy.right = this.oBoundsCopy.right - this.boxDimensions.width;
			this.oBoundsCopy.bottom = this.oBoundsCopy.bottom - this.boxDimensions.height;
			this.oBoundsCopy.left = this.oBoundsCopy.left + this.boxDimensions.width;
		}
	}
	
	this.canvasContext.fillRect(this.boxX, this.boxY, this.boxDimensions.width, this.boxDimensions.height);
	
	if(!this.bCancelAnimation){
		this.nRequestAnimation = requestAnimationFrame(this.animateBox);
	}
	else{
		_reset.call(this);
	}
}
new BoxAnimation();


	
	
	
	
	
	
	
	
	
	