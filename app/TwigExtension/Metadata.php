<?php

namespace App\TwigExtension;

use Skosh\Twig\AbstractExtension;

class Metadata extends AbstractExtension
{
    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            'metaDesc' => new \Twig_Function_Method($this, 'getMetaDesc'),
            'ogImage' => new \Twig_Function_Method($this, 'getOpenGraphImage')
        ];
    }

    /**
     * Process description.
     *
     * @param  $page
     * @return string
     */
    public function getMetaDesc($page)
    {
        $root = $this->getBuilder()->getParent('root');

        $description = $page ? $page->description : $root->description;

        return clean_string($description);
    }

    /**
     * Process description.
     *
     * @param  \Skosh\Content\Content $page
     * @param  mixed  $parent
     * @param  string $default
     * @return string
     */
    public function getOpenGraphImage($page, $parent, $default = 'images/share-og.png')
    {
        if($page instanceof \Skosh\Content\Post) {
            return $page->image['full'];
        }

        if($page instanceof \Skosh\Content\Page) {
            return $page->image('logo.png', $default);
        }

        if($page instanceof \Skosh\Content\Doc && $parent instanceof \Skosh\Content\Page) {
            return $parent->image('logo.png', $default);
        }

        return $this->getBuilder()->getAsset($default);
    }
}