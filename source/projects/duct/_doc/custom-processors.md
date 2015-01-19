---
title: Custom Processors
template: documentation.twig::content_inner
chapter: 5
---


Post processors are used to process assets before they're compiled. Each processor is mapped to one or more file extension (e.g. LESS to `.less`). Which processors are used on the asset and their order is determined by the asset's file extensions.

Here's a list of the processors provided by default and their mapping to file extensions:

<table>
    <tr>
        <th>Engine</th>
        <th>Extensions</th>
        <th>Engine</th>
    </tr>
    <tr>
        <td><a href="http://lesscss.org">LESS</a></td>
        <td>.less</td>
        <td><code>oyejorge/less.php</code></td>
    </tr>
</table>

To add a post processors to Duct, simple update the **Post-processors** section of the `config.php` file located in the `app/config/packages/torann/duct` directory of the Laravel application.

## Custom Post Processor

A post processor extends from `AbstractProcessor` class and should implement `render` method.

```php
namespace YourProcessors\CoffeeScriptParser;

class CoffeeScriptParser extends \Torann\Duct\Processors\AbstractProcessor
{
    function render($context)
    {
        // Get content
        $coffee = file_get_contents($context->path);

        // Return parsed CoffeeScript.
        return CoffeeScript\Compiler::compile($coffee, array(
            'filename' => $context->path
        ));
    }
}
```

Now simple add or change the post processor in the `app/config/packages/torann/duct/config.php` file to reflect your new processor.

```
    /*
    |--------------------------------------------------------------------------
    | Post-processors
    |--------------------------------------------------------------------------
    */

    'postprocessors' => array(
        'application/javascript' => '\\YourProcessors\\CoffeeScriptParser',
    ),
```