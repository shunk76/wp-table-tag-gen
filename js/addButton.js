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

	  },false,false,'WP TableTagGen からテーブルを挿入', 116);
	}

	$('#insert').click(function(){
		var tags = $('[name=source]').val();
		var val = $('#content').val();
		var content = '';
		if(val == ''){
			content = tags;
		} else {
			content = val + '\n' + tags
		}
		$('#content').val(content);
		tb_remove()
	});

});