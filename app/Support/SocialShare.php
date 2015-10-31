<?php

namespace App\Support;

class SocialShare
{
    /**
     * Social networks.
     *
     * @var array
     */
    public static $templates = array(
        'twitter'       => 'https://twitter.com/intent/tweet?url={url}&text={text}',
        'pinterest'     => 'https://www.pinterest.com/pin/create/button/?media={image}&url={url}&description={text}',
        'facebook'      => 'https://www.facebook.com/sharer.php?s=100&p[title]={title}&p[summary]={text}&p[url]={url}&p[images][0]={image}',
        'linkedin'      => 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}',
        'tumblr'        => 'https://tumblr.com/share?s=&v=3&t={title}&u={url}',
        'blogger'       => 'https://blogger.com/blog-this.g?t={text}&n={title}&u={url}',
        'delicious'     => 'https://delicious.com/save?url={url}&title={title}',
        'google'        => 'https://plus.google.com/share?url={url}',
        'digg'          => 'https://digg.com/submit?url={url}&title={title}',
        'reddit'        => 'http://reddit.com/submit?url={url}&title={title}',
        'stumbleupon'   => 'https://www.stumbleupon.com/submit?url={url}&title={title}',
    );

    /**
     * Generate social network link.
     *
     * @param  string   $network
     * @param  array  $page
     * @return string
     */
    public static function generate($network, $page)
    {
        dd($page);

        // Get text
        $text = self::truncate($page->description, 137);

        // Replace template with values
        return str_replace(array(
            '{url}',
            '{title}',
            '{text}',
            '{image}'
        ), array(
            urlencode($page->full_url),
            urlencode($page->title),
            urlencode($text),
            urlencode($page->get('image'))
        ), self::$templates[$network]);
    }

    /**
     * Truncate a string to a set width.
     *
     * @param  string $string
     * @param  int    $width
     * @return string
     */
    public static function truncate($string, $width)
    {
        return current(explode("\n", wordwrap($string, $width, "...\n")));
    }
}
