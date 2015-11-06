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
}