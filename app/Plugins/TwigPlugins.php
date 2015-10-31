<?php

namespace App\Plugins;

use Baun\Plugin;
use App\Support\SocialShare;

class TwigPlugins extends Plugin
{
    /**
     * Debug enabled.
     *
     * @var bool
     */
    public $debug = false;

    /**
     * Initialize plugin.
     */
    public function init()
    {
        $this->debug = $this->config->get('app.debug', $this->debug);

        // Register functions
        $this->theme->addFunction('isCurrent', $this);
        $this->theme->addFunction('share_link', $this);
        $this->theme->addFunction('get_default', $this);
        $this->theme->addFunction('editButton', $this);
        $this->theme->addFunction('dd', $this);
    }

    public function custom_isCurrent($pattern)
    {
        return str_is($pattern, '/'.$this->router->currentUri());
    }

    public function custom_get_default($value, $default = "")
    {
        return $value ?: $default;
    }

    public function custom_share_link($network, $page)
    {
        return SocialShare::generate($network, $page);
    }

    public function custom_dd()
    {
        return dd(func_get_args());
    }

    public function custom_editButton($page, $parent, $template)
    {
        //dd($page);

//        // Must be markdown and have a parent
//        if ($page->type === 'markdown' && $parent)
//        {
//            // Get URL
//            $url = $parent->get('edit_url');
//
//            if (!$url) {
//                return;
//            }
//
//            // Parse URL
//            $edit_url = str_replace([
//                '{filename}'
//            ], [
//                $page->filename
//            ], $url);
//
//            // Render button template
//            return $environment->render($template, array(
//                'edit_url' => $edit_url,
//                'page'     => $page
//            ));
//        }
    }
}