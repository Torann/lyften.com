<?php

/**
 * Dump the passed variables in a JSON string and end the script.
 *
 * @param  mixed
 * @return void
 */
function dd()
{
//    header('Content-Type: application/json');
    echo print_r(func_get_args());
    die(1);
}

/**
 * Determine if a given string matches a given pattern.
 *
 * @param  string  $patterns
 * @param  string  $value
 * @return bool
 */
function str_is($patterns, $value)
{
    if ($patterns == $value) return true;

    foreach (explode('|', $patterns) as $pattern)
    {
        $pattern = preg_quote($pattern, '#');

        // Asterisks are translated into zero-or-more regular expression wildcards
        // to make it convenient to check if the strings starts with the given
        // pattern such as "library/*", making any string check convenient.
        $pattern = str_replace('\*', '.*', $pattern).'\z';

        if ((bool) preg_match('#^'.$pattern.'#', $value)) return true;
    }

    return false;
}

/**
 * Determine if a given string starts with a given substring.
 *
 * @param  string  $haystack
 * @param  string|array  $needles
 * @return bool
 */
function starts_with($haystack, $needles)
{
    foreach ((array) $needles as $needle)
    {
        if ($needle != '' && strpos($haystack, $needle) === 0) return true;
    }

    return false;
}

/**
 * Ensures the proper slashes are used.
 *
 * @param  string  $string
 * @return string
 */
function url($string)
{
    return str_replace([DIRECTORY_SEPARATOR, '//'], ['/', '/'], $string);
}