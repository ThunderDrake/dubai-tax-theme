<?php

add_filter( 'template_include', function ( $template ) {
	return is_front_page() ? locate_template( '/templates/front-page/front-page.php' ) : $template;
}, 99 );

if ( function_exists( 'acf_add_options_page' ) ) {

	acf_add_options_page( [
		'page_title' => 'Настройки сайта',
		'menu_title' => 'Настройки сайта',
		'menu_slug'  => 'theme-general-settings',
		'capability' => 'edit_posts',
		'redirect'   => false,
		'position'   => 2,
	] );

}
