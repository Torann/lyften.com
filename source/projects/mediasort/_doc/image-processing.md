---
title: Image Processing
template: documentation.twig::content_inner
chapter: 5
---
MeidaSort makes use of the [Imagine Image](https://packagist.org/packages/imagine/imagine) library for all image processing.  Out of the box, the following image processing patterns/directives will be recognized when defining MeidaSort styles:

* **width**: A style that defines a width only (landscape).  Height will be automagically selected to preserve aspect ratio.  This works well for resizing
    images for display on mobile devices, etc.
* **xheight**: A style that defines a heigh only (portrait).  Width automagically selected to preserve aspect ratio.
* **widthxheight#**: Resize then crop.
* **widthxheight!**: Resize by exacty width and height.  Width and height emphatically given, original aspect ratio will be ignored.
* **widthxheight**: Auto determine both width and height when resizing.  This will resize as close as possible to the given dimensions while still preserving the original aspect ratio.

To create styles for a media item, simply define them (you may use any style name you like: foo, bar, baz, etc) inside the media item's styles array using a combination of the directives defined above:

````php
'styles' => [
    'thumbnail'  => '50x50',
    'large'      => '150x150',
    'landscape'  => '150',
    'portrait'   => 'x150',
    'foo'        => '75x75',
    'fooCropped' => '75x75#'
]
````

For more customized image processing you may also pass a [callable](http://php.net/manual/en/language.types.callable.php) type as the value for a given style definition.  MeidaSort will automatically inject in the uploaded file object instance as well as the Imagine\Image\ImagineInterface object instance for you to work with.  When you're done with your processing, simply return an instance of Imagine\Image\ImageInterface from the callable.  Using a callable for a style definition provides an incredibly amount of flexibilty when it comes to image processing. As an example of this, let's create a watermarked image using a closure (we'll do a smidge of image processing with Imagine):

 ````php
 'styles' => [
    'watermarked' => function($file, $imagine) 
    {
        $watermark = $imagine->open('/path/to/images/watermark.png');   // Create an instance of ImageInterface for the watermark image.
        $image     = $imagine->open($file->getRealPath());              // Create an instance of ImageInterface for the uploaded image.
        $size      = $image->getSize();                                 // Get the size of the uploaded image.
        $watermarkSize = $watermark->getSize();                         // Get the size of the watermark image.
        
        // Calculate the placement of the watermark (we're aiming for the bottom right corner here).
        $bottomRight = new Imagine\Image\Point($size->getWidth() - $watermarkSize->getWidth(), $size->getHeight() - $watermarkSize->getHeight());
        
        // Paste the watermark onto the image.
        $image->paste($watermark, $bottomRight);

        // Return the Imagine\Image\ImageInterface instance.
        return $image;
    }
 ]
```` 

### Remote Images

Remote images can be fetched by assigning an absolute URL to a media item property that's defined on a model: 

```php 
$profilePicture->photo = "http://foo.com/bar.jpg"; 
```

This is very useful when working with third party API's such as Facebook, Twitter, etc.  Note that this feature requires that the CURL extension is included as part of your PHP installation.