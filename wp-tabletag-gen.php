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

define( 'TTG_DEBUG', false );
define( 'WP_TTG', 'wp-tabletag-gen' );

$file = basename($_SERVER['SCRIPT_NAME']);

if( $file == 'post-new.php' ||  $file == 'post.php' ){
    add_action( 'admin_footer', 'addTTGFiles' );
    add_action( 'admin_footer', 'insertTTG');
    load_plugin_textdomain( WP_TTG, false, basename( dirname( __FILE__ ) ) . '/languages' );
}

function addTTGFiles(){
    wp_enqueue_style( WP_TTG, WP_PLUGIN_URL.'/'.WP_TTG.'/css/style.min.css', false, '1.0', 'all' );

    $js_file = WP_PLUGIN_URL.'/'.WP_TTG.'/js/'.WP_TTG;
    if( TTG_DEBUG == false ){
        $js_file .= '.min.js';
    } else {
        $js_file .= '.js';
    }
    wp_enqueue_script( WP_TTG, $js_file, array('jquery-ui-selectable'), '1.0', true );
    add_thickbox();
}

function insertTTG(){
?>
<div id="tableTagGen" style="display: none;">
    <div id="generator">
        <div class="ttg-header">
            <?php _e( 'row', WP_TTG ); ?><input type="number" name="row" value="3" min="1"> &times;
            <?php _e( 'col', WP_TTG ); ?><input type="number" name="col" value="3" min="1">
            <div class="help">
                <div class="dashicons dashicons-editor-help"></div>
                <div class="content">
                    <?php _e( 'To increase or decrease the value, you can either enter on the keyboard, click on the spinner, or turn the mouse wheel.', WP_TTG ); ?>
                </div>
            </div>

            <button id="merge" class="button" title="<?php _e( 'Merge cells', WP_TTG ); ?>"><?php _e( 'Merge', WP_TTG ); ?></button>
            <button id="split" class="button" title="<?php _e( 'Split the merged cell', WP_TTG ); ?>"><?php _e( 'Split', WP_TTG ); ?></button>
            <button id="replace" class="button" title="<?php _e( 'Replace &lt;td&gt; and &lt;th&gt; each other', WP_TTG ); ?>">td &hArr; th</button>
            <button id="chars" class="button" title="<?php _e( 'Enter the characters', WP_TTG ); ?>"><?php _e( 'Chars', WP_TTG ); ?></button>
            <button id="outputChars" class="button" title="<?php _e( 'Output the characters', WP_TTG ); ?>"><?php _e( 'Output', WP_TTG ); ?></button>
            <button id="class" class="button" title="<?php _e( 'Enter the name of the class', WP_TTG ); ?>">class</button>
            <button id="outputClass" class="button" title="<?php _e( 'Output the name of the class', WP_TTG ); ?>"><?php _e( 'Output', WP_TTG ); ?></button>
            <button id="undo" class="button" title="<?php _e( 'Undo', WP_TTG ); ?>" disabled="disabled"><i class="dashicons dashicons-undo"></i></button>
            <button id="redo" class="button" title="<?php _e( 'Redo', WP_TTG ); ?>" disabled="disabled"><i class="dashicons dashicons-redo"></i></button>
            <button id="initialize" class="button" title="<?php _e( 'initialize', WP_TTG ); ?>"><?php _e( 'Initialize', WP_TTG ); ?></button>
            <button id="insert" class="button button-primary"><?php _e( 'insert into post', WP_TTG ); ?></button>
        </div>

        <div class="message">
            <p id="selectByDragging" class="default"><?php _e( 'You can select the cells by dragging.', WP_TTG ); ?></p>
            <p id="entChars"><?php _e( 'Please enter the characters.', WP_TTG); ?></p>
            <p id="entClassNames"><?php _e( 'Please enter the name of the class.', WP_TTG); ?></p>
            <p id="cantMerge" class="alert">
                <i class="dashicons dashicons-no"></i><?php _e( 'It is not possible to marge &lt;td&gt; and &lt;th&gt;.', WP_TTG ); ?>
            </p>
            <p id="cantRemerge" class="alert">
                <i class="dashicons dashicons-no"></i><?php _e( 'It is not possible to re-merge the merged cells.', WP_TTG ); ?>
            </p>
            <p id="entNum" class="alert">
                <i class="dashicons dashicons-no"></i><?php _e( 'Please enter a number.', WP_TTG ); ?>
            </p>
            <p id="entNaturalNum" class="alert">
                <i class="dashicons dashicons-no"></i><?php _e( 'Please enter a natural number (1,2,3...).', WP_TTG ); ?>
            </p>
            <p id="selectCells" class="alert">
                <i class="dashicons dashicons-no"></i><?php _e( 'Please select the cells to be operated by dragging.', WP_TTG ); ?>
            </p>

        </div>

        <div id="tagWrapper"><table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></div>

        <div style="display: none;">
            <textarea name="source" rows="40" cols="40"></textarea>
        </div>
    </div><!-- /generator -->
</div>
<?php
}