<?php
// Rename the class to the theme name / something relevant make sure all references are replaced.
class ThemeName
{
    public static function init()
    {
        add_theme_support( 'post-thumbnails' );

        //add image sizes (delete this block if not necessary)
        add_image_size( 'image_size_name', width, height, array('crop', 'position') );

        //register navigation menus to be used within the admin and called throughout the theme
        register_nav_menu( 'nav-name', 'Nav description' );

        //enqueue the scripts js and css, set in function enqueue_scripts
        add_action( 'wp_enqueue_scripts', array(__CLASS__, 'enqueue_scripts'), 100 );
    }

    /**
     * Enqueue all scripts for the theme
     * @return void
     */
    public static function enqueue_scripts()
    {
        /**
         *  $handle = Name of style sheet
         *  $src = ath to the stylesheet from the root directory of WordPress. Example: '/css/stlye.css'
         *  $dependencies = (optional) Array of registered style $handles this stylesheet depends on. - Default Value: false
         *  $version = (optional) Specify a version number for the stylesheet. - Default Value: false
         *  $media = (optional) media for which this stylesheet has been defined. Accepts 'all', 'aural', 'braille', 'handheld', 'projection', 'print', 'screen', 'tty', or 'tv' - Default Value: 'all'
         */
        wp_enqueue_style( $handle, $src, $dependencies, $version, $media );

        /**
         * $handle = Name of the script.
         * $src = Path to the script from the root directory of WordPress. Example: '/js/myscript.js'.
         * $deps = (Optional) An array of registered handles this script depends on. - Default value: array()
         * $ver = (Optional) String specifying the script version number, if it has one. - Default value: false
         * $in_footer = (bool) (Optional) Whether to enqueue the script before </head> or before </body>. Default 'false'.
         */
        wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
    }
}
ThemeName::init();