<?php
/**
 * Plugin Name: WP Tabel Tag Gen
 * Description: This plugin generates table tags with a simple operation.
 * Version: 1.0
 * Author:  Shunsuke Kusakabe
 * Text Domain: wp-tabletag-gen
 * Domain Path: /languages
 *
 * Copyright 2014 Shunsuke Kusakabe (email : shunsuke.kusakabe@gmail.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

new WpTableTagGen();

class WpTableTagGen {
	protected $debug  = false;
	protected $wp_ttg = 'wp-tabletag-gen';

	public function __construct() {
		if ( isset( $_SERVER['SCRIPT_NAME'] ) ) {
			$file = basename( sanitize_text_field( $_SERVER['SCRIPT_NAME'] ) );
		}

		if ( $file == 'post-new.php' || $file == 'post.php' ) {
			add_action( 'admin_footer', array( $this, 'add_ttg_files' ) );
			add_action( 'admin_footer', array( $this, 'insert_ttg' ) );
			load_plugin_textdomain( $this->wp_ttg, false, basename( dirname( __FILE__ ) ) . '/languages' );
		}
	}

	public function add_ttg_files() {
		$css_file = WP_PLUGIN_URL.'/'.$this->wp_ttg.'/css/style';
		$js_file = WP_PLUGIN_URL.'/'.$this->wp_ttg.'/js/'.$this->wp_ttg;

		if ( $this->debug == true ) {
			$css_file .= '.dev';
			$js_file .= '.dev';
		}

		wp_enqueue_style( $this->wp_ttg, $css_file.'.css', false, '1.0', 'all' );
		wp_enqueue_script( $this->wp_ttg, $js_file.'.js', array( 'jquery-ui-selectable' ), '1.0', true );
		add_thickbox();
	}

	public function get_arrow( $arg ) {
		$version = get_bloginfo( 'version' );

		if ( $version >= 3.8 ) {
			echo '<i class="dashicons dashicons-'. esc_attr( $arg ) .'"></i>';
		} else {
			if ( $arg == 'undo' ) {
				echo '&larr;';
			} else {
				echo '&rarr;';
			}
		}
	}

	public function insert_ttg() {
		?>
		<div id="tabletag-gen" style="display: none;">
			<div id="generator">
				<div id="ttg-header">
					<?php _e( 'row', $this->wp_ttg ); ?><input type="number" name="row" value="3" min="1"> &times;
					<?php _e( 'col', $this->wp_ttg ); ?><input type="number" name="col" value="3" min="1">
					<div class="help">
						<div class="dashicons dashicons-editor-help"></div>
						<div class="content">
							<?php _e( 'To increase or decrease the value, you can either enter on the keyboard, click on the spinner, or turn the mouse wheel.', $this->wp_ttg ); ?>
						</div>
					</div>

					<button id="merge" class="button" title="<?php _e( 'Merge cells', $this->wp_ttg ); ?>"><?php _e( 'Merge', $this->wp_ttg ); ?></button>
					<button id="split" class="button" title="<?php _e( 'Split the merged cell', $this->wp_ttg ); ?>"><?php _e( 'Split', $this->wp_ttg ); ?></button>
					<button id="replace" class="button" title="<?php _e( 'Replace &lt;td&gt; and &lt;th&gt; each other', $this->wp_ttg ); ?>">td &harr; th</button>
					<button id="chars" class="button" title="<?php _e( 'Enter the characters', $this->wp_ttg ); ?>"><?php _e( 'Chars', $this->wp_ttg ); ?></button>
					<button id="output-chars" class="button" title="<?php _e( 'Output the characters', $this->wp_ttg ); ?>"><?php _e( 'Output', $this->wp_ttg ); ?></button>
					<button id="class" class="button" title="<?php _e( 'Enter the name of the class', $this->wp_ttg ); ?>">class</button>
					<button id="output-class" class="button" title="<?php _e( 'Output the name of the class', $this->wp_ttg ); ?>"><?php _e( 'Output', $this->wp_ttg ); ?></button>
					<button id="undo" class="button" title="<?php _e( 'Undo', $this->wp_ttg ); ?>" disabled="disabled"><?php $this->get_arrow( 'undo' ); ?></button>
					<button id="redo" class="button" title="<?php _e( 'Redo', $this->wp_ttg ); ?>" disabled="disabled"><?php $this->get_arrow( 'redo' ); ?></button>
					<button id="initialize" class="button" title="<?php _e( 'initialize', $this->wp_ttg ); ?>"><?php _e( 'Initialize', $this->wp_ttg ); ?></button>
					<button id="insert" class="button button-primary"><?php _e( 'insert into post', $this->wp_ttg ); ?></button>
				</div>

				<div class="message">
					<p id="select-by-dragging" class="default"><?php _e( 'You can select the cells by dragging.', $this->wp_ttg ); ?></p>

					<p id="ent-chars"><?php _e( 'Please enter the characters.', $this->wp_ttg ); ?></p>
					<p id="ent-class-names"><?php _e( 'Please enter the name of the class.', $this->wp_ttg ); ?></p>

					<p id="cant-merge" class="alert">
						<i class="dashicons dashicons-no"></i><?php _e( 'It is not possible to marge &lt;td&gt; and &lt;th&gt;.', $this->wp_ttg ); ?>
					</p>
					<p id="cant-remerge" class="alert">
						<i class="dashicons dashicons-no"></i><?php _e( 'It is not possible to re-merge the merged cells.', $this->wp_ttg ); ?>
					</p>
					<p id="ent-num" class="alert">
						<i class="dashicons dashicons-no"></i><?php _e( 'Please enter a number.', $this->wp_ttg ); ?>
					</p>
					<p id="ent-natural-num" class="alert">
						<i class="dashicons dashicons-no"></i><?php _e( 'Please enter a natural number (1,2,3...).', $this->wp_ttg ); ?>
					</p>
					<p id="select-cells" class="alert">
						<i class="dashicons dashicons-no"></i><?php _e( 'Please select the cells to be operated by dragging.', $this->wp_ttg ); ?>
					</p>

				</div>

				<div id="tag-wrapper"><table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></div>

				<div style="display: none;">
					<textarea name="source" rows="40" cols="40"></textarea>
				</div>
			</div>
		</div>
		<?php
	}
}