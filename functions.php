<?php
/**
 * Components functions and definitions.
 *
 * @package polylith
 */

	if ( ! function_exists( 'polylith_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function polylith_setup() {

		load_theme_textdomain( 'polylith', get_template_directory() . '/languages' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_editor_style( get_stylesheet_uri() );

		add_image_size( 'polylith-featured-image', 1920, 960, true );

		register_nav_menus( array(
			'primary' => esc_html__( 'Primary Menu', 'polylith' ),
		) );

		/**
		 * Add support for core custom logo.
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 150,
			'width'       => 150,
			'flex-width'  => true,
			'flex-height' => true,
		) );

		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Indicate widget sidebars can use selective refresh in the Customizer.
		add_theme_support( 'customize-selective-refresh-widgets' );
	}
endif;
add_action( 'after_setup_theme', 'polylith_setup' );



/**
 * Enqueue scripts and styles.
 */
function polylith_scripts() {
	$theme   = wp_get_theme( get_template() );
	$version = $theme->get( 'Version' );
	if ( is_child_theme() ) {
		wp_enqueue_style( get_template() . '-style', get_template_directory_uri() . '/style.css', array( 'dashicons' ), $version );
	}
	wp_enqueue_style( get_stylesheet() . '-style', get_stylesheet_uri(), array( 'dashicons' ), $version );
	wp_enqueue_script( 'wp-api' );
}

add_action( 'wp_enqueue_scripts', 'polylith_scripts' );


