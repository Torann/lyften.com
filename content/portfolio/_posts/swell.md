---
template: portfolio.twig::content_inner
title: Swell
date: 10/01/2014
image: /uploads/portfolio/swell/cover-size-2.png
tag: Web Application
tile: size-2
---
<img src="{{ asset('/uploads/portfolio/swell/campaign.png') }}" alt="Campaign View">

<p>Swell is an internal list management and sales automation system that lets you sort through the noise to uncover your leads. Built on top of Laravel with integration to <a href="https://slack.com/" target="_blank">#Slack</a> and <a href="https://www.relateiq.com/" target="_blank">RelateIQ</a>.</p>

<p>
    <strong>Client:</strong> SeeClickFix <br>
    <strong>Date:</strong> {{ page.date|date("M d, Y") }}<br>
    <strong>Categories:</strong> {{ page.tag }}<br>
    <strong>Link:</strong> <a href="http://swell.seeclickfix.com" target="_blank">http://swell.seeclickfix.com</a>
</p>
