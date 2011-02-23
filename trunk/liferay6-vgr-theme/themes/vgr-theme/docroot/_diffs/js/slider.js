/*
AUI().ready('aui-base', 'console', function(A) {
	new A.Console({
		height: '250px',
		newestOnTop: false,
		style: 'block',
		visible: true,
		width: '600px'
	}).render();
});
*/

AUI().ready(
	'aui-base',
	'anim',
	'cookie',
	function(A) {
		
	    var mainContainer = A.one('#main-container');
	    var slideContainer = A.one('#slide-container');
		var hideNode = A.one('#slide-buttons #hide');
		var showNode = A.one('#slide-buttons #show');
	    
		var animEasing = A.Easing.easeOut;
		var animDuration = 0.5;
		
		var slideAnim = new A.Anim({
			node: slideContainer,
			easing: animEasing,
			duration: animDuration,
			from: {},
			to: {}
		});
		
		var mainAnim = new A.Anim({
			node: mainContainer,
			easing: animEasing,
			duration: animDuration,
			from: {},
			to: {}
		});
		
		if(!hideNode && !showNode) {
			return;
		}
		
		hideNode.show();
		showNode.hide();

		hideNode.setStyle('display', 'inline');
		showNode.setStyle('display', 'inline');
		
		var hideSlide = getHideSlideCookie();
		
		if(hideSlide) {
			toggleNotifications(hideSlide, false);	
		}
		
		mainContainer.setStyle('width', '80%');
		
	    hideNode.on('click', function(e) {
	    	e.halt();
	    	toggleNotifications(true, true);
	    });
	    
	    showNode.on('click', function(e) {
	    	e.halt();
	    	toggleNotifications(false, true);
	    });
	    
	    function getHideSlideCookie() {
			var cookieValue = A.Cookie.get('hideSlide');
			
			if(A.Lang.isNull(cookieValue) || cookieValue == 'false') {
				return false;
			}
			else {
				return true;
			}
	    }
	    
		function toggleNotifications(hide, useAnimation) {
			
			var slideFrom = hide ? '20%' : 0;
			var slideTo = hide ? 0 : '20%';

			var mainFrom = hide ? '80%' : '100%';
			var mainTo = hide ? '100%' : '80%';
			
			slideAnim.set('from', {width: slideFrom});
			slideAnim.set('to', {width: slideTo});
			
			mainAnim.set('from', {width: mainFrom});
			mainAnim.set('to', {width: mainTo});
			
			if(useAnimation) {
				mainAnim.set('duration', animDuration);
				slideAnim.set('duration', animDuration);
			}
			else {
				mainAnim.set('duration', 0.001);
				slideAnim.set('duration', 0.001);
			}

			slideAnim.detach('start');
			slideAnim.detach('end');
			
			if(hide) {
				slideAnim.on('end', function(e) {
					this.hide();
				}, slideContainer);
			}
			else {
				slideAnim.on('start', function(e) {
					this.show();
				}, slideContainer);
			}
						
			slideAnim.run();
			mainAnim.run();
	
			A.Cookie.set('hideSlide', String(hide));
			
		    hideNode.toggle();
		    showNode.toggle();
		}	
	}
);