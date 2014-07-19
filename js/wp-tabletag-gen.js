/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/**
 * WP TableTagGen script
 *
 * Copyright (c) 2014 Shunsuke KUSAKABE
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery(function($){
	var title = 'WP TableTagGen';

	function changeStyles() {
		var w = $(window).width()*0.9;
		var h = $(window).height()*0.9;

		$('#TB_window').css({
    	'width' : w + 'px',
    	'margin-left' : -w*0.5 + 'px'
    });

    $('#TB_ajaxContent').css({
    	'padding': '0',
    	'width' : w + 'px',
    	'height' : h + 'px'
    });
	}

	if( window.QTags ){
		QTags.addButton( 'ttg', 'table', function(){
	    tb_show( title, '#TB_inline?height=&width=&inlineId=tableTagGen', false );

	    changeStyles();

	    $(window).resize(function(){
	    	if( $('#TB_ajaxWindowTitle').text() === title ){
	    		changeStyles();
	    	}
	    });

		if( window.localStorage ){
			localStorage.clear();
			localStorage.setItem( 'index', 0 );
			localStorage.setItem( 'undo', 0 );
			localStorage.setItem( 'o0', JSON.stringify({
				row : $( '[name=row]' ).val(),
				col : $( '[name=col]' ).val()
			}));
			localStorage.setItem( 'data0', $( '#tagWrapper' ).html() );
			$( '#undo' ).attr( 'disabled', 'disabled' );
			$( '#redo' ).attr( 'disabled', 'disabled' );
		}

	  },false,false,'Insert a table from WP TableTagGen', 116);
	}

});
jQuery(function($){

var wrapper = '#tagWrapper';
var $wrapper = $( wrapper );
var $table = $wrapper.find( 'table' );
var $row = $( '[name=row]' );
var $col = $( '[name=col]' );
var $rowcol = $( '[name=row], [name=col]' );
var $button = $( '.button' );
var classMerged = 'TTG-merged';

generateTable( $row.val(), $col.val() );
generateTags();

$( '#class, #chars' ).show();
$( '#outputChars, #outputClass' ).hide();
$.cookie( 'checked', '');
$button.not('#undo, #redo').removeAttr( 'disabled' );

$wrapper.mousedown(function(e){
	e.metaKey = false;
}).selectable();

$rowcol.mouseup(function(){
	generateTable($row.val(), $col.val());
	generateTags( history() );
}).mousewheel(eventHandler);

$rowcol.keyup(function(){
	var input = $(this).val()*1;
	if(  /[0-9]/.test( input ) === false ){
		getMessage( '#entNum' );
		return;
	}
	if(  input < 1 ){
		getMessage( '#entNaturalNum' );
		return;
	}
	generateTable( $row.val(), $col.val() );
	generateTags( history() );
});

if( window.localStorage ){
	localStorage.clear();
	localStorage.setItem( 'index', 0 );
	localStorage.setItem( 'undo', 0 );
} else {
	$( '#undo, #redo, #initialize').hide();
}

$( '#outputChars' ).click(function(){
	getMessage();

	$button.not( '#undo, #redo' ).removeAttr( 'disabled' );
	$( '#chars' ).show();
	$( this ).hide();

	$rowcol.mousewheel(eventHandler);

	$wrapper.find('td, th').each(function(){
		content = $( this ).children( 'textarea' ).val();
		$( this ).children( 'textarea' ).remove();
		$( this ).text( content );
	});

	generateTags( history() );
});

$( '#outputClass' ).click(function(){
	getMessage();

	$button.not( '#undo, #redo' ).removeAttr( 'disabled' );
	$( '#class' ).show();
	$( this ).hide();

	$rowcol.mousewheel(eventHandler);

	$wrapper.find('td, th').each(function(){
		var content = $( this ).children( 'input' ).val();
		$( this ).children( 'input' ).remove();
		$( this ).addClass( content ).removeClass( 'class' );
	});

	var table_class = $( '.table_class').val();
	$table.removeAttr( 'class' );
	if( table_class ){
		$table.addClass( table_class );
	}

	var tr_class = [];
	$( '.tr_class' ).each(function( i ){
		tr_class[ i ] = $( this ).val();
	});
	$wrapper.find('tr').each(function( i ){
		$( this ).removeAttr( 'class' );
		if( tr_class[ i ] != undefined ){
			$( this ).addClass( tr_class[ i ] );
		}
	});

	removeInput();
	generateTags( history() );
});

$( '#chars' ).click(function(){
	getMessage( '#entChars' );
	$( '.ui-selected' ).removeClass( 'ui-selected' );

	$button.not( '#outputChars' ).attr( 'disabled', 'disabled' );
	$( this ).hide();
	$( '#outputChars' ).show();

	$rowcol.unbind( 'mousewheel' )

	$wrapper.find('td, th').each(function(){
		var text = $( this ).text();
		$( this ).html( '<textarea rows="2" name="textarea">' + text + '</textarea> ' );
	});
	if( isUA('webkit') ){
		$wrapper.find( 'td:has( input ), th:has( input )' ).css( 'padding', '1px 3px 2px' );
	}
});

$( document ).on({
		'focus' : function(){
			var tr = $(this).parents('tr');
			tr.find('textarea').attr('rows', '4');
			tr.prevAll().find('textarea').attr('rows', '2');
			tr.nextAll().find('textarea').attr('rows', '2');
		},
		'blur' : function(){
			$table.find('textarea').attr('rows', '2');
		}
	},
	'[name=textarea]'
);

$( '#class' ).click(function(){
	getMessage( '#entClassNames' );

	$button.not( '#outputClass' ).attr( 'disabled', 'disabled' );
	$( this ).hide();
	$( '#outputClass' ).show();

	$rowcol.unbind( 'mousewheel' );

	$wrapper.find('td, th').each(function(){
		$( this ).removeClass( 'ui-selectee ui-selected' + ' ' + classMerged );
		var this_class = $( this ).attr( 'class' );
		if( this_class == undefined ) this_class = '';
		$( '<input type="text" value="' + this_class + '" size="5">' ).appendTo( this );
		$( this ).children().addClass( 'class' );
	});

	var top = -30;
	if( isUA('webkit') ){
		top = -33;
		$wrapper.find( 'td:has( input ), th:has( input )' ).css( 'padding', '3px' );
	}
	var left = $table.find('tr:first').position().left;

	var table_class = $table.attr( 'class' );

	if( table_class != undefined ){
		table_class = table_class
		.replace( /ui-selecte(d\s|d)/g, '' )
		.replace( /ui-selecte(e\s|e)/g, '' );
	}
	if( ! table_class ){
		table_class = '';
	}
	$( '<input />' )
		.val( table_class )
		.attr({
			'type' : 'text',
			'size' : '5',
			'placeholder' : 'table',
			'class' : 'table_class'
		})
		.css({
			'position' : 'absolute',
			'top' :  top + 'px',
			'left' : ( left + 4 )+ 'px'
		}).appendTo( wrapper );

	$( '<label />' )
		.attr( 'id', 'stripe_label' )
		.css({
			'position' : 'absolute',
			'top' :  ( top + 5 ) + 'px',
			'left' : ( left - 69 )+ 'px'
		}).appendTo( wrapper );

	$( '<input />' )
		.attr({
			'type' : 'checkbox',
			'id' : 'stripe'
		}).appendTo( '#stripe_label' ).after( '<span>stripe</span>' );

	$wrapper.find('tr').each(function(){
		if( isUA('firefox') ){
			top = $( this ).position().top + 3;
		} else if( isUA('webkit') ){
			top = $( this ).position().top + 4;
		} else if( isUA('meie|trident') ){
			top = $( this ).position().top + 6;
		} else {
			top = $( this ).position().top + 3;
		}
		var left = $( this ).position().left;

		var tr_class = $( this ).attr( 'class' );
		if( tr_class != undefined ){
			tr_class = tr_class
			.replace( /ui-selecte(d\s|d)/g, '' )
			.replace( /ui-selecte(e\s|e)/g, '' );
		}
		if( ! tr_class ) tr_class = '';

		$( '<input />' )
			.val( tr_class )
			.attr({
				'type' : 'text',
				'size' : '5',
				'placeholder' : 'tr',
				'class' : 'tr_class'
			})
			.css({
				'position' : 'absolute',
				'top' :  top + 'px',
				'left' : (left - 75) + 'px'
			}).appendTo( wrapper );
	});

	$( '#stripe' ).removeAttr( 'checked' );

	var checked = $.cookie('checked');
	if( checked == 1 ) $( '#stripe' ).attr( 'checked', 'checked');
	var classes = [];
	$( '#stripe_label' ).click(function(){
		if( $( '#stripe' ).is( ':checked' ) ){
			$.cookie('checked' , 1 );
			$( '.tr_class' ).each(function( i ){
				classes[ i ] = $( this ).val();
				var tr_val = $( this ).val();
				if( i % 2 == 0 ){
					$( this ).val( 'even' + ( tr_val != '' ? ' ' + tr_val : '' ) );
				} else {
					$( this ).val( 'odd' + ( tr_val != '' ? ' ' + tr_val : '' ) );
				}
			});
		} else {
			$.cookie('checked' , '' );
			$( '.tr_class' ).each(function( i ){
				classes[ i ] = $( this ).val();
				if( classes[ i ] != undefined ){
					classes[ i ] =  classes[ i ]
					.replace( /eve(n\s|n)/g, '' )
					.replace( /od(d\s|d)/g, '');
					$( this ).val( classes[ i ]);
				} else {
					$( this ).val( '' );
				}
			});
		}
	});
});

$(window).resize(function(){
	var top = -30;
	if( isUA('webkit') ){
		top = -33;
	}
	var left = $table.find('tr:first').position().left;

	$( '.table_class' )
		.css({
			'position' : 'absolute',
			'top' :  top + 'px',
			'left' : ( left + 4 )+ 'px'
		});

	$( '#stripe_label' )
		.css({
			'position' : 'absolute',
			'top' : ( top + 5 ) + 'px',
			'left' : ( left - 69 )+ 'px'
		});

	top = [];
	left = 0;
	$wrapper.find('tr').each(function( i ){
		if( isUA('firefox') ){
			top[ i ] = $( this ).position().top + 3;
		} else if( isUA('webkit') ){
			top[ i ] = $( this ).position().top + 4;
		}
		left = $( this ).position().left;
	});
	$( '.tr_class' ).each(function( i ){
		$( this )
		.css({
			'position' : 'absolute',
			'top' :  top[ i ] + 'px',
			'left' : (left - 75) + 'px'
		});
	});
});



$( '#merge' ).click(function(){
	var td = null;
	var th = null;

	var selected = $wrapper.find( 'td.ui-selected, th.ui-selected' );

	if( selected.length === 0 ){
		getMessage( '#selectCells' );
	}

	selected.each(function(){
		if( $( this ).get(0).tagName.match( /td/i ) ){
			td = true;
		} else if( $( this ).get(0).tagName.match( /th/i ) ){
			th = true;
		}
	});

	if( td == true && th == true ){
		getMessage( '#cantMerge' );
		return false;
	} else if( td == true && th == null){
		var elm  = 'td';
	} else if( td == null && th == true ){
		elm = 'th';
	}

	$( elm + '.ui-selected' ).each(function(){
		if( $( this ).hasClass( classMerged ) ){
			$( '.ui-selected' ).removeClass( 'ui-selected' );
			getMessage( '#cantRemerge' );
			return false;
		}
	});

	var row = $row.val();
	var col = $col.val();

	var selected_total = $( elm + '.ui-selected' ).length;
	var rowspan = $( elm + '.ui-selected' ).parent( 'tr' ).addClass( 'ui-selected' ).length;
	var colspan = selected_total / rowspan;

	if( row == rowspan && col == colspan ){
		$table.html( '<tr><'+ elm +'></'+ elm +'></tr>' );
	} else {
		if( row != rowspan && col == colspan ){
			if( rowspan > 1 ){
				$( 'tr.ui-selected:not( tr.ui-selected:first )' ).remove();
				rowspan = 1
			}
		} else if( row == rowspan && col != colspan ){
			if( colspan > 1 ){
				$wrapper.find('tr.ui-selected').each(function(){
					$( this ).children( elm + '.ui-selected:not( .ui-selected:first )' ).remove();
				});
				colspan = 1;
			}
		}

		var selected_row = $( 'tr' ).index( $('tr.ui-selected:first') );
		var selected_first = $( elm ).index( $( elm + '.ui-selected:first' ) );

		if( selected_first < col ){
			var selected_col = selected_first;
		} else {
			var selected_col = selected_first - col * selected_row ;
		}

		$( 'tr.ui-selected' ).each(function( i ){
			if( i == 0 ){
				if( colspan > 1 ){
					$( this ).children( elm + '.ui-selected:not(.ui-selected:first)' ).remove();
				}
			} else {
				$( this ).children( elm + '.ui-selected' ).remove();
			}
		});

		if( colspan > 1 ){
			$( elm + '.ui-selected:first').attr( 'colspan', colspan ).addClass( classMerged );
		}

		if( rowspan > 1 ) {
			$( elm + '.ui-selected:first').attr( 'rowspan', rowspan ).addClass( classMerged );
		}

		var empty = $( 'tr:empty' ).length;
		if( empty > 0 ){
			$wrapper.find('[rowspan]').each(function( i ){
				var rs = $( this ).attr( 'rowspan' ) - empty;
				$( this ).attr( 'rowspan', rs );
				if( $( this ).attr( 'rowspan' ) == 1 ) $( this ).removeAttr( 'rowspan' );
			});
			$wrapper.find('tr:empty').remove();
			row = row - empty;
		}

		$( '.' + classMerged ).each(function(){
			if( $( this ).attr( 'rowspan' ) === undefined && $( this ).attr( 'colspan' ) === undefined ){
				$( this ).removeClass( classMerged );
			}
		});
	}
	generateTags( history() );
});

$( '#replace' ).click(function(){

	var selected = $wrapper.find( 'td.ui-selected, th.ui-selected' );

	if( selected.length === 0 ){
		getMessage( '#selectCells' );
	}

	selected.each(function(){
		var content = $( this ).text();
		var colspan = $( this ).attr( 'colspan' );
		var rowspan = $( this ).attr( 'rowspan' );
		var this_class = $( this ).attr( 'class' );
		var elm = ($( this ).get(0).tagName.toLowerCase() == 'td' )? $( '<th>' ) : $( '<td>' );
		$( this ).replaceWith( function(){
			elm.text( content );
			if( colspan ){
				elm.attr( 'colspan', colspan );
			}
			if( rowspan ){
				elm.attr( 'rowspan', rowspan );
			}
			if( this_class ){
				elm.addClass( this_class ).removeClass( 'ui-selected' );
			}
			return elm;
		});
	});
	generateTags( history() );
});

$( '#split' ).click(function(){

	var selected = $wrapper.find( 'td.ui-selected, th.ui-selected' );

	if( selected.length === 0 ){
		getMessage( '#selectCells' );
	}

	splitCell();
	generateTags( history() );
});

$( '#undo' ).click(function(){
	if( window.localStorage ){
		var u = localStorage.getItem( 'undo' );

		u--;

		var o = JSON.parse(localStorage.getItem( 'o' + u ));
		$row.val(o.row);
		$col.val(o.col);

		var data = localStorage.getItem( 'data' + u );

		$wrapper.empty().html( data );

		localStorage.setItem( 'undo' , u );
		generateTags( data );
		historyBtn();
		removeInput();
	}
});

$( '#redo' ).click(function(){
	if( window.localStorage ){
		var i = localStorage.getItem( 'index' );
		var u = localStorage.getItem( 'undo' );

		u++;

		var o = JSON.parse(localStorage.getItem('o'+u));
		$row.val(o.row);
		$col.val(o.col);

		var data = localStorage.getItem( 'data' + u );

		$wrapper.empty().html( data );

		localStorage.setItem( 'undo' , u );
		generateTags( data );
		historyBtn();
		removeInput();
	}
});

$( '#initialize' ).click(function(){
	generateTable( $row.val(), $col.val() );
	generateTags();

	if( window.localStorage ){
		localStorage.clear();
		localStorage.setItem( 'index', 0 );
		localStorage.setItem( 'undo', 0 );
		localStorage.setItem( 'o0', JSON.stringify({
			row : $row.val(),
			col : $col.val()
		}));
		localStorage.setItem( 'data0', $wrapper.html() );
	}

	removeInput();
	historyBtn();
});

$('#insert').click(function(){
	var tags = $( '[name=source]', '#generator' ).val();
	$( '#content' ).insertAtCaret(tags);
	tb_remove()
});


// functions

$.fn.extend({
    insertAtCaret: function(v) {
      var o = this.get(0);
      o.focus();
      var s = o.value;
      var p = o.selectionStart;
      var np = p + v.length;
      o.value = s.substr(0, p) + v + s.substr(p);
      o.setSelectionRange(np, np);
    }
});

function isUA( arg ){
  return new RegExp(arg, 'i').test(navigator.userAgent);
};

function generateTable( row, col ){
	$wrapper.find('table').empty();
	var i,j,tr;
	for( i = 0; i < row; i++ ){
		tr = $( '<tr />' );
		for( j = 0; j < col; j++ ){
			$( '<td />').appendTo( tr );
		}
		tr.appendTo( $wrapper.find('table') );
	}
}

function eventHandler(event, delta){
	var value, col, row;
	if ( delta < 0 ){

		value = $(this).val();
		$( this ).val( ++value );

		generateTable( $row.val(), $col.val() );
		generateTags( history() );

	} else if (delta > 0){

		value = $(this).val();
		--value;
		if( value > 0 ){
			$( this ).val( value );

			generateTable( $row.val(), $col.val() );
			generateTags( history() );
		}
	}
	removeInput();
	return false;
}

function history(){
	if( window.localStorage ){
		var i = localStorage.getItem( 'index' );
		var u = localStorage.getItem( 'undo' );
		var table = $wrapper.html();
		var o = {
			row : $row.val(),
			col : $col.val()
		};

		if( i == u ){
			i++;
			localStorage.setItem( 'data' + i, table );
			localStorage.setItem( 'o' + i, JSON.stringify(o) );
			localStorage.setItem( 'index', i );
			localStorage.setItem( 'undo', i );
		} else if( i > u ){
			u++;
			localStorage.setItem( 'data' + u, table );
			localStorage.setItem( 'o' + u, JSON.stringify(o) );
			localStorage.setItem( 'index', u );
			localStorage.setItem( 'undo', u );
		}

		historyBtn();
		return table;
	}
}

function historyBtn(){
	if( window.localStorage ){
		var i = Number( localStorage.getItem( 'index' ) );
		var u = Number( localStorage.getItem( 'undo' ) );

		// i 操作の回数
		// u undo 出来る回数
		// i-u redo 出来る回数

		// undo redo 不可    i == u && u == 0
		// undo 可 redo 不可 i == u && u != 0
		// undo redo 可      i > u && u != 0
		// undo 不可 redo 可 i > u && u == 0

		if( i == u ){
			if( u == 0 ){
				$( '#undo' ).attr( 'disabled', 'disabled' );
				$( '#redo' ).attr( 'disabled', 'disabled' );
			} else {
				$( '#undo' ).removeAttr( 'disabled' );
				$( '#redo' ).attr( 'disabled', 'disabled' );
			}
		} else {
			if( u == 0 ){
				$( '#undo' ).attr( 'disabled', 'disabled' );
				$( '#redo' ).removeAttr( 'disabled' );
			} else {
				$( '#undo' ).removeAttr( 'disabled' );
				$( '#redo' ).removeAttr( 'disabled' );
			}
		}
	}
}

function generateTags( data ){
	var table;
	if( !data ){
		table = $wrapper.html();
	} else {
		table = data;
	}

	table = table
		.toLowerCase()
		.replace( /<\/table>/g, '\n</table>' )
		.replace( /&lt;/g, '<' )
		.replace( /&gt;/g, '>' )
		.replace( /ui-selecte(d\s|d)/g, '' )
		.replace( /ui-selecte(e\s|e)/g, '' )
		.replace( /ttg-merged/g, '' )
		.replace( / class=\"\"/g, '' )
		.replace( / class=\" \"/g, '' )
		.replace( / style=\".*?\"/g, '' )
		.replace( /<tb.*?>/g, '\n<tbody>' )
		.replace( /<\/tbo.*?>/g, '\n</tbody>' )
		.replace( /<tr/g, '\n<tr' )
		.replace( /<\/tr/g, '\n</tr' )
		.replace( /<td/g, '\n<td' )
		.replace( /<th/g, '\n<th' );
	if( isUA('msie|trident') ){
		table = table
		.replace( / class=>/g, '>')
		.replace( /^\n/g, '');
	}

	$( '[name=source]' ).val('').val( table );
}

function splitCell(){
	$( '.ui-selected' + '.' + classMerged ).each(function(){
		var rowspan = Number( $( this ).attr( 'rowspan' ) );
		var colspan = Number( $( this ).attr( 'colspan' ) );
		if( isNaN( colspan ) ) colspan = 1;

		$( this ).removeAttr( 'rowspan' );
		$( this ).removeAttr( 'colspan' );

		for( var i = 1; i < colspan; i++ ){
			if( $( this ).get(0).tagName.match( /td/i ) ){
				var elm = $( '<td>' );
			} else if( $( this ).get(0).tagName.match( /th/i ) ){
				elm = $( '<th>' );
			}
			elm.addClass( 'ui-selected' );
			elm.insertAfter( $( this ) );
		}

		var tr = $( this ).parent( 'tr' );
		var index = $( 'tr' ).index( tr );
		var next = index + 1;
		var col = Number( $col.val() );

		var prev_elm = $( this ).parent().children().index( $(this) ) - 1;

		for( var i = next; i < next + rowspan - 1 ; i++ ){
			var children = $( 'tr:eq(' + i + ')').children();
			for( var j = 0; j < colspan; j++ ){
				if( $( this ).get(0).tagName.match( /td/i ) ){
					elm = $( '<td>' );
				} else if( $( this ).get(0).tagName.match( /th/i ) ){
					elm = $( '<th>' );
				}
				elm.addClass( 'ui-selected' );
				if( prev_elm == -1 ){
					elm.insertBefore( children[ 0 ] );
				} else {
					if( children[ prev_elm ] ){
						elm.insertAfter( children[ prev_elm ] );
					} else {
						elm.insertAfter( children[ children.length-1 ] );
					}
				}
			}
		}
		$( this ).removeClass( classMerged );
	});
}

function removeInput(){
	$wrapper.find('input').remove();
	$( '#stripe_label' ).remove();
}

function getMessage( selector ){
	var selector = selector || '.default';
	$( '#generator .message p' ).hide();
	$( selector ).show();
	if( $( selector ).hasClass('alert') ){
		setTimeout( function(){
			$( selector ).fadeOut('normal', function(){
				$( '.default' ).fadeIn();
			});
		}, 5000 );
	}
}

});