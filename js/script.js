jQuery(function($){

$('#gyo,#retu').mouseup(function(){
	get_table($('#gyo' ).val(), $( '#retu' ).val());
}).mousewheel(event_handler);

$( '#combine,#split,#convert_th,#convert_td,#text,#class,#initialize' ).removeAttr( 'disabled' );

var $wrapper = $( '#tagWrapper' );
var $table = $wrapper.find( 'table' );

$wrapper.selectable({
	stop: function(){
		$( document ).keydown(function(e){
			if( e.keyCode == 17 || e.keyCode == 16 || e.keyCode == 20 ){
				$( '.ui-selected' ).removeClass( 'ui-selected' );
			};
		});
	}
});

get_table( $( '[name=row]' ).val(), $( '[name=col]' ).val() );

$( '[name=row], [name=col]' ).mousewheel(event_handler);

$( '[name=row], [name=col]' ).keyup(function(){
	var input = $(this).val();
	if(  /[0-9]/.test( input*1 ) === false || input < 1 ) return;
	get_table( $( '[name=row]' ).val(), $( '[name=col]' ).val() );
});

if( window.localStorage ){
	localStorage.clear();
	localStorage.setItem( 'index', 0 );
	localStorage.setItem( 'undo', 0 );
}

$( '#undo' ).click(function(){
	if( window.localStorage ){
		var u = localStorage.getItem( 'undo' );
		if( u > 0 ) u = u - 2 ;
		localStorage.setItem( 'undo' , u );
		var data = localStorage.getItem( 'data' + u );
		$wrapper.empty().html( data );
		u++;
		localStorage.setItem( 'undo' , u );
		output( data );
		history_btn();
		remove_input();
		$wrapper.html( data );
	}
});

$( '#redo' ).click(function(){
	if( window.localStorage ){
		var i = localStorage.getItem( 'index' ) ;
		var u = localStorage.getItem( 'undo' ) ;
		if( i > u ){
			var data = localStorage.getItem( 'data' + u );
			u++;
			localStorage.setItem( 'undo' , u );
			$wrapper.empty().html( data );
			output( data );
			history_btn();
			remove_input();
		}
	}
});

output( history() );

$( '#output_text' ).click(function(){
	$( '.en' ).text( 'Drag to select cells.' );
	$( '.ja' ).text( 'ドラッグしてセルを選択してください' );

	$( '#combine,#split,#convert_th,#convert_td,#class,#initialize,#row_up,#row_down,#col_up,#col_down,#insert' ).removeAttr( 'disabled' );
	$( '#text' ).show();
	$( this ).hide();

	$( '[name=row], [name=col]' ).mousewheel(event_handler);

	$table.css( 'margin-top', '10px' );

	$( 'td, th', '#tagWrapper' ).each(function(){
		content = $( this ).children( 'input' ).val();
		$( this ).children( 'input' ).remove();
		$( this ).text( content );
	});

	output( history() );
});

$( '#output_class' ).click(function(){
	$( '.en' ).text( 'Drag to select cells.' );
	$( '.ja' ).text( 'ドラッグしてセルを選択してください' );

	$( '#combine,#split,#convert_th,#convert_td,#text,#initialize,#row_up,#row_down,#col_up,#col_down,#insert' ).removeAttr( 'disabled' );
	$( '#class' ).show();
	$( this ).hide();

	$( '[name=row], [name=col]' ).mousewheel(event_handler);

	$table.css( 'margin-top', '10px' );

	$( 'td, th' ).each(function(){
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
	$( 'tr' ).each(function( i ){
		$( this ).removeAttr( 'class' );
		if( tr_class[ i ] != undefined ){
			$( this ).addClass( tr_class[ i ] );
		}
	});

	remove_input();
	output( history() );
});

$( '#text' ).show();
$( '#text' ).click(function(){
	$( '.en' ).text( 'Input text in cells.' );
	$( '.ja' ).text( '文字を入力してください' );

	$( '#combine,#split,#convert_th,#convert_td,#class,#undo,#redo,#initialize,#row_up,#row_down,#col_up,#col_down,#insert' ).attr( 'disabled', 'disabled' );
	$( this ).hide();
	$( '#output_text' ).show();

	$( '[name = row]' ).unbind( 'mousewheel' );
	$( '[name = col]' ).unbind( 'mousewheel' );

	$( 'td, th', '#tagWrapper' ).each(function(){
		var text = $( this ).text();
		$( this ).html( '<input type="text" value="' + text + '" size="8" />' );
	});
	if( isUA('webkit') ){
		$( 'td:has( input ), th:has( input )' ).css( 'padding', '1px 3px 2px' );
	}
});

$( '#class' ).show();
$.cookie( 'checked', '');

$( '#class' ).click(function(){
	$( '.en' ).text( 'Input class name.' );
	$( '.ja' ).text( 'クラス名を入力してください' );

	$table.css( 'margin-top', '30px' );

	$( '#combine,#split,#convert_th,#convert_td,#text,#undo,#redo,#initialize,#row_up,#row_down,#col_up,#col_down,#insert' ).attr( 'disabled', 'disabled' );
	$( this ).hide();
	$( '#output_class' ).show();

	$( '[name = row]' ).unbind( 'mousewheel' );
	$( '[name = col]' ).unbind( 'mousewheel' );

	$( 'td, th',  '#tagWrapper' ).each(function(){
		$( this ).removeClass( 'ui-selectee ui-selected TTG-combined' );
		var this_class = $( this ).attr( 'class' );
		if( this_class == undefined ) this_class = '';
		$( '<input type="text" value="' + this_class + '" size="5">' ).appendTo( this );
		$( this ).children().addClass( 'class' );
	});


	if( isUA('firefox') ){
		var top = $table.position().top + 6;
	} else if( isUA('webkit') ){
		top = $table.position().top + 7;
		$( 'td:has( input ), th:has( input )' ).css( 'padding', '1px 3px 2px' );
	} else if( isUA('msie|trident') ){
		top = $table.position().top + 5;
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
		}).appendTo( '#tagWrapper' );

	$( '<label />' )
		.attr( 'id', 'stripe_label' )
		.css({
			'position' : 'absolute',
			'top' :  ( top + 5 ) + 'px',
			'left' : ( left - 69 )+ 'px'
		}).appendTo( '#tagWrapper' );

	$( '<input />' )
		.attr({
			'type' : 'checkbox',
			'id' : 'stripe'
		}).appendTo( '#stripe_label' ).after( '<span>stripe</span>' );

	$( 'tr','#tagWrapper' ).each(function(){
		if( isUA('firefox') ){
			var top = $( this ).position().top + 3;
		} else if( isUA('webkit') ){
			top = $( this ).position().top + 4;
		} else if( isUA('meie|trident') ){
			top = $( this ).offset().top + 6;
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
				'left' : (left - 70) + 'px'
			}).appendTo( '#tagWrapper' );
	});

	$( '#stripe' ).removeAttr( 'checked' );

	var checked = $.cookie('checked');
	if( checked == 1 ) $( '#stripe' ).attr( 'checked', 'checked');
	var classes = [];
	$( '#stripe_label' ).click(function(){
		if( $( '#stripe' ).is( ':checked' ) ){
			$.cookie('checked' , 1 );
			console.log($( '.tr_class' ).length);
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
	if( isUA('firefox') ){
		var top = $table.position().top + 6;
	} else if( isUA('webkit') ){
		top = $table.position().top + 7;
	}
	var left = $table.position().left;

	$( '.table_class' )
		.css({
			'position' : 'absolute',
			'top' :  top + 'px',
			'left' : ( left + 4 )+ 'px'
		});

	$( '#stripe_label' )
		.css({
			'position' : 'absolute',
			'top' :  ( top + 5 ) + 'px',
			'left' : ( left - 69 )+ 'px'
		});

	top = [];
	left = '';
	$( 'tr' ).each(function( i ){
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
			'left' : (left - 70) + 'px'
		});
	});
});

get_tags( '#row_up', 'row' );
get_tags( '#row_down', 'row' );
get_tags( '#col_up', 'col' );
get_tags( '#col_down', 'col' );

$( '#combine' ).click(function(){
	var td = null;
	var th = null;

	$( 'td.ui-selected, th.ui-selected' ).each(function(){
		if( $( this ).get(0).tagName.match( /td/i ) ){
			td = true;
		} else if( $( this ).get(0).tagName.match( /th/i ) ){
			th = true;
		}
	});

	if( td == true && th == true ){
		alert( 'td と th を結合することはできません。' );
		return false;
	} else if( td == true && th == null){
		var elm  = 'td';
	} else if( td == null && th == true ){
		elm = 'th';
	}

	$( elm + '.ui-selected' ).each(function(){
		if( $( this ).hasClass( 'TTG-combined' ) ){
			$( '.ui-selected' ).removeClass( 'ui-selected' );
			alert( '結合されたセルを再結合することはできません。' );
			return false;
		}
	});

	var row = $('[ name = row ]').val();
	var col = $('[ name = col ]').val();

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
				$( 'tr.ui-selected' ).each(function(){
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
			$( elm + '.ui-selected:first').attr( 'colspan', colspan ).addClass( 'TTG-combined' );
		}

		if( rowspan > 1 ) {
			$( elm + '.ui-selected:first').attr( 'rowspan', rowspan ).addClass( 'TTG-combined' );
		}

		var empty = $( 'tr:empty' ).length;
		if( empty > 0 ){
			$( '[rowspan]' ).each(function( i ){
				var rs = $( this ).attr( 'rowspan' ) - empty;
				$( this ).attr( 'rowspan', rs );
				if( $( this ).attr( 'rowspan' ) == 1 ) $( this ).removeAttr( 'rowspan' );
			});
			$( 'tr:empty' ).remove();
			row = row - empty;
		}
	}
	output( history() );
});

convert( 'th' );
convert( 'td' );

$( '#split' ).click(function(){
	split_cell();
	output( history() );
});

$( '#initialize' ).click(function(){
	var col = $( '[name = col]' ).val();
	var row = $( '[name = row]' ).val();
	get_table( row, col );
	output();
	if( window.localStorage ){
		localStorage.clear();
		localStorage.setItem( 'index', 1 );
		localStorage.setItem( 'undo', 1 );
		var table = $wrapper.html();
		localStorage.setItem( 'data0', table );
	}
	remove_input();
	history_btn();
});

$( '#nowrap' ).click(function(){
	$( 'td.ui-selected, th.ui-selected' ).addClass( 'nowrap' )
	output( history() );
});

$( '.select_all' ).click(function(){
	$( this ).parent().next().select();
});


// functions

function isUA( arg ){
  return new RegExp(arg, 'i').test(navigator.userAgent);
};

function get_table( row, col ){
	$table.empty();
	var i,j,tr;
	for( i = 0; i < row; i++ ){
		tr = $( '<tr />' );
		for( j = 0; j < col; j++ ){
			$( '<td />').appendTo( tr );
		}
		tr.appendTo( $table );
	}
	//スマホではselectableは使えないので、タップで選択する
  /*
	$( 'td, th' ).click(function(){
		$( this ).addClass( 'ui-selected' );
	});
*/
}

function event_handler(event, delta){
	var value, col, row;
	if ( delta < 0 ){

		value = $(this).val();
		$( this ).val( ++value );
		col = $( '[name = col]' ).val();
		row = $( '[name = row]' ).val();

		get_table( row, col );
		output( history() );

	} else if (delta > 0){

		value = $(this).val();
		--value;
		if( value > 0 ){
			$( this ).val( value );
			col = $( '[name = col]' ).val();
			row = $( '[name = row]' ).val();

			get_table( row, col );
			output( history() );
		}
	}
	remove_input();
	return false;
}

function history_btn(){
	if( window.localStorage ){
		var i = Number( localStorage.getItem( 'index' ) );
		var u = Number( localStorage.getItem( 'undo' ) );

		if( u > 1 && i == u ){
			$( '#undo' ).removeAttr( 'disabled' );
			$( '#redo' ).attr( 'disabled', 'disabled' );
		} else if( u > 1 && i > u ){
			$( '#undo' ).removeAttr( 'disabled' );
			$( '#redo' ).removeAttr( 'disabled' );
		} else if( u == 1 && i > u ){
			$( '#undo' ).attr( 'disabled', 'disabled' );
			$( '#redo' ).removeAttr( 'disabled' );
		} else if( i == 1 && u == 1 ){
			$( '#undo' ).attr( 'disabled', 'disabled' );
			$( '#redo' ).attr( 'disabled', 'disabled' );
		}
	}
}

function history(){
	if( window.localStorage ){
		var i = localStorage.getItem( 'index' );
		var u = localStorage.getItem( 'undo' );
		var table = $( '#tagWrapper' ).html();

		if( i == u ){
			localStorage.setItem( 'data' + i, table );
			i++;
			localStorage.setItem( 'index', i );
			localStorage.setItem( 'undo', i );
		} else if( i > u ){
			localStorage.setItem( 'data' + u, table );
			u++;
			localStorage.setItem( 'index', u );
			localStorage.setItem( 'undo', u );
		}
		history_btn();
		return table;
	}
}

function output( data ){
	var table;
	if( !data ){
		table = $( '#tagWrapper' ).html();
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
		.replace( /ttg-combined/g, '' )
		.replace( / class=\"\"/g, '' )
		.replace( / class=\" \"/g, '' )
		.replace( / style=\".*?\"/g, '' );
	if( isUA('msie|trident') ){
		table = table
		.replace( /<\/tbo.*?>/g, '\n</tbody>' )
		.replace( / class=>/g, '>')
		.replace( /<\/tr/g, '\n</tr' )
		.replace( / class=(.*?)>/g, ' class="$1">')
		.replace( /^\n/g, '');
	} else {
		table = table
		.replace( /<tb.*?>/g, '\n<tbody>' )
		.replace( /<\/tbo.*?>/g, '\n</tbody>' )
		.replace( /<tr/g, '\n<tr' )
		.replace( /<\/tr/g, '\n</tr' )
		.replace( /<td/g, '\n<td' )
		.replace( /<th/g, '\n<th' )
	}

	$( '[name=source]' ).val('').val( table );
}

function get_tags( selector , target ){
	$( selector ).click(function(){
		var value = $( '[name = ' + target + ']' ).val();
		if( isNaN( value ) ){
			alert( '数字を入力してください' );
			$( '[name = ' + target + ']' ).val( 1 );
			return false;
		}
		var up = selector.match( /up/g );
		var down = selector.match( /down/g );
		if( up ) ++value;
		if( down ){
			value > 1 ? --value : value = 1;
		}
		$( '[name = ' + target + ']' ).val( value );

		var col = $( '[name = col]' ).val();
		var row = $( '[name = row]' ).val();

		get_table( row, col );
		output( history() );
		remove_input();
	});
}

function convert( after ){
	$( '#convert_' + after ).click(function(){
		var before = ( after == 'th' ) ? 'td' : 'th';
		$( before + '.ui-selected' ).each(function(){
			var content = $( this ).text();
			var colspan = $( this ).attr( 'colspan' );
			var rowspan = $( this ).attr( 'rowspan' );
			var this_class = $( this ).attr( 'class' );
			$( this ).replaceWith( function(){
				var elm = $( '<'+ after +'>' ).text( content );
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
		output( history() );
	});
}

function split_cell(){
	$( '.ui-selected' + '.TTG-combined' ).each(function(){
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
		var col = Number( $( '[name=col]' ).val() );

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
		$( this ).removeClass( 'TTG-combined' );
	});
}

function insertTab(o, e){
	var kC = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
	if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.altKey){
		var oS = o.scrollTop; // Set the current scroll position.
    if (o.setSelectionRange){
      // For: Opera + FireFox + Safari
      var sS = o.selectionStart;
      var sE = o.selectionEnd;
      o.value = o.value.substring(0, sS) + "\t" + o.value.substr(sE);
      o.setSelectionRange(sS + 1, sS + 1);
      o.focus();
    } else if (o.createTextRange){
      // For: MSIE
      document.selection.createRange().text = "\t"; // String.fromCharCode(9)
      //o.onblur = function() { o.focus(); o.onblur = null; };
      e.returnValue = false;
    } else {
    	alert('Please contact the admin and tell xe that the tab functionality does not work in your browser.');
    }

    o.scrollTop = oS; // Return to the original scroll position.
    if (e.preventDefault){
    	e.preventDefault();
    }

    return false; // Not needed, but good practice.
  }
  return true;
}

function remove_input(){
	$( '#main input' ).remove();
	$( '#stripe_label' ).remove();
	$table.css( 'margin-top', '10px' );
}

});