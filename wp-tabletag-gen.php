<?php
/*
Plugin Name: WP Tabel Tag Generator
Description: This generates table tags easily.
Version: 1.0
Author: Shunsuke Kusakabe
*/

/*  Copyright 2014 Shunsuke Kusakabe (email : shunsuke.kusakabe@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
		published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

add_action( 'admin_footer', 'addTTGFiles' );
add_action( 'admin_footer', 'insertTTG');

function addTTGFiles(){
	$plugin = 'wp-tabletag-gen';
    wp_enqueue_style( $plugin, WP_PLUGIN_URL.'/'.$plugin.'/style.css', false, '1.0', 'all' );
    wp_enqueue_script( 'addButton', WP_PLUGIN_URL.'/'.$plugin.'/js/addButton.js', array('jquery'), '1.0', true );
    wp_enqueue_script( 'mousewheel', WP_PLUGIN_URL.'/'.$plugin.'/js/jquery.mousewheel.min.js', array('jquery'), '3.1.11', true );
    wp_enqueue_script( 'cookie', WP_PLUGIN_URL.'/'.$plugin.'/js/jquery.cookie.js', array('jquery'), '1.0', true );
    wp_enqueue_script( $plugin, WP_PLUGIN_URL.'/'.$plugin.'/js/script.js', array('jquery-ui-selectable'), '1.0', true );
    add_thickbox();
}

function insertTTG(){
?>
<div style="display: none;">
  <div id="tableTagGen">
    <div id="generator">
      <header>
        行<input class="value" type="text" name="row" value="3" size="1">
        <button id="row_up" class="button">＋</button>
        <button id="row_down" class="button">－</button> &times;
        列<input class="value" type="text" name="col" value="3" size="1">
        <button id="col_up" class="button">＋</button>
        <button id="col_down" class="button">－</button>

        行<input type="number" name="" style="width: 3em;" id="gyo" value="3" min="1"> &times;
        列<input type="number" name="" style="width: 3em;" id="retu" value="3" min="1">

        <button id="combine" class="button" title="セルを結合する">結合</button>
        <button id="split" class="button" title="結合されたセルを分割する">分割</button>
        <button id="convert_th" class="button" title="td を th に変換する">td→th</button>
        <button id="convert_td" class="button" title="th を td に変換する">th→td</button>
        <button id="text" class="button" title="文字を入力する">文字</button>
        <button id="output_text" class="button" title="文字を出力する">出力</button>
        <button id="class" class="button" title="クラス名を入力する">class</button>
        <button id="output_class" class="button" title="クラス名を出力する">出力</button>
        <button id="undo" class="button" title="1つ戻る" disabled="disabled">←</button>
        <button id="redo" class="button" title="1つ進む" disabled="disabled">→</button>
        <button id="initialize" class="button" title="初期化する">初期化</button>
        <button id="insert" class="button button-primary">投稿に挿入</button>
      </header>

      <div id="main">
        <p class="ja">ドラッグしてセルを選択することができます。</p>
        <div id="tagWrapper"><table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></div>
      </div>

      <div id="source" style="display: none;">
        <textarea name="source" rows="40" cols="40"></textarea>
      </div>
    </div><!-- /generator -->
  </div>
</div>
<?php
}