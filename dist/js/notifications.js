window.onload = function() {
	if (!window.jQuery) {
		console.error(
			"jQuery is required in this library.",
			"To make sure that the Notifications library working you need to download jQuery.",
			"Download jQuery then import it before this library.",
			"Download jQuery: https://code.jquery.com from jQuery CDN."
		);
		return null;
	}
}

var Notification = function(elem, subType, options) {
	var positions = {
		'top': 'notification-top-center',
		'top-left': 'notification-top-left',
		'top-right': 'notification-top-right',
		'bottom': 'notification-bottom-center',
		'bottom-left': 'notification-bottom-left',
		'bottom-right': 'notification-bottom-right',
	};

	if (typeof options != 'object') {
		console.error('Argument {options}', 'must be instance of Object.');
		return null;
	}

	if (!$(elem).attr('notifiable')) {
		console.error(`Element ${elem}`, "must be Notifiable");
		return null;
	}

	var data = {
		elem: $(elem).attr('notifiable', 'enable'),
		opts: options
	};

	$(elem).addClass('notification');
	$(elem).addClass(positions[data.opts.position] || 'notification-bottom-left');
	$(elem).css('direction', data.opts.dir || 'rtl');

	if (data.opts.title != null) {
		$(elem).append(`<span class="notify-title">${data.opts.title}</span>`);
	}

	if (data.opts.body) {
		$(elem).append(`<span class="notify-body">${data.opts.body}</span>`);
	}

	$(elem).on('click', function() {
		methods.hide();
	});
		
	var methods = {
		show: function() {
			var e = data.elem;
				e.addClass('notify-alert').addClass('na-' + subType);
				e.fadeIn();
			return methods;
		},
		showAfter: function(time = 1000) {
			setTimeout(function(){
				methods.show();
			}, time);
		},
		hide: function() {
			var e = data.elem;
				e.fadeOut();
			return methods;			
		},
		hideAfter: function(time = 1000) {
			setTimeout(function(){
				methods.hide();
			}, time);
		}
	};

	return methods;
}