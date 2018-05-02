<?php
/**
 * Components functions and definitions.
 *
 * @package polylith
 */

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
	add_theme_support( 'custom-logo', [
		'height'      => 150,
		'width'       => 150,
		'flex-width'  => true,
		'flex-height' => true,
	] );

	add_theme_support( 'html5', [
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	] );

}

add_action( 'after_setup_theme', 'polylith_setup' );


/**
 * Enqueue scripts and styles.
 */
function polylith_scripts() {
	$theme   = wp_get_theme( get_template() );
	$version = $theme->get( 'Version' );
	wp_enqueue_style( get_stylesheet() . '-style', get_stylesheet_uri(), [], $version );
	wp_enqueue_script( 'wp-api' );
	wp_enqueue_script( 'polylith-module', get_theme_file_uri( 'module.js' ), [], $version, true );
	$data = [
		'permastructs' => polylith_permastructs(),
		'themeFileUri' => get_theme_file_uri()
	];
	$js   = sprintf( 'window.polylith = %s;', wp_json_encode( $data ) );
	wp_script_add_data( 'wp-api', 'data', $js );
}

add_action( 'wp_enqueue_scripts', 'polylith_scripts' );

/**
 * Convert script tag to module.
 *
 * @param string $tag The `<script>` tag for the enqueued script.
 * @param string $handle The script's registered handle.
 * @param string $src The script's source URL.
 *
 * @return string
 */
function polylith_script_loader_tag( $tag, $handle, $src ) {
	if ( 'polylith-module' === $handle ) {
		return $tag = sprintf( '<script type="module" src="%s"></script>', $src );
	}

	return $tag;
}

add_filter( 'script_loader_tag', 'polylith_script_loader_tag', 10, 3 );


/**
 * Permastruct Lists.
 *
 * @return array
 */
function polylith_permastructs() {
	/**
	 * @var WP_Rewrite $wp_rewrite
	 */
	global $wp_rewrite;

	$extra_permastructs = array_map( function ( $permastruct ) {
		return $permastruct['struct'];
	}, $wp_rewrite->extra_permastructs );

	if ( $wp_rewrite->use_verbose_page_rules ) {
		$permastructs = [
			'category' => $wp_rewrite->get_category_permastruct(),
			'tag'      => $wp_rewrite->get_tag_permastruct(),
			'search'   => $wp_rewrite->get_search_permastruct(),
			'author'   => $wp_rewrite->get_author_permastruct(),
			'date'     => $wp_rewrite->get_date_permastruct(),
			'month'    => $wp_rewrite->get_month_permastruct(),
			'year'     => $wp_rewrite->get_year_permastruct(),
			'post'     => $wp_rewrite->permalink_structure,
			'page'     => $wp_rewrite->get_page_permastruct(),
		];
	} else {
		$permastructs = [
			'category' => $wp_rewrite->get_category_permastruct(),
			'tag'      => $wp_rewrite->get_tag_permastruct(),
			'search'   => $wp_rewrite->get_search_permastruct(),
			'author'   => $wp_rewrite->get_author_permastruct(),
			'date'     => $wp_rewrite->get_date_permastruct(),
			'month'    => $wp_rewrite->get_month_permastruct(),
			'year'     => $wp_rewrite->get_year_permastruct(),
			'page'     => $wp_rewrite->get_page_permastruct(),
			'post'     => $wp_rewrite->permalink_structure,

		];
	}

	$permastructs = array_merge( $extra_permastructs, $permastructs );

	return array_map( function ( $key, $value ) {
		$struct = trim( preg_replace( '/%([^\/]+)%/', ':$1', $value ), '/\\' );
		$struct = str_replace(
			[
				':year',
				':monthnum',
				':day',
				':post_id'
			],
			[
				':year(\\d{4})',
				':monthnum(\\d{1,2})',
				':day(\\d{1,2})',
				':post_id(\\d+)'
			],
			$struct
		);

		return [
			'name'   => $key,
			'struct' => '/' . $struct . '/*'
		];
	}, array_keys( $permastructs ), array_values( $permastructs ) );
}
