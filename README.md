# Cooltip.js
In many web projects I find myself wishing I had a tooltip plugin on hand. There are many out there, but I often find they are pretty heavy, complex or outdated.

I also needed the ability to control what side of the tooltip the arrow shows (separate from the typical "direction" option), which would help immensely with icons in the corners of pages. So, I decided to write my own plugin.

Cooltip is a jQuery tooltip plugin, intended to be lightweight and flexible.

# Demos, Options, and API
See the Cooltip homepage @ http://jaketlarson.github.io/cooltip to see the tooltip script in action with available options.

# Installation
1. To get started, clone the repository:
  <code>git clone https://github.com/jaketlarson/cooltip.git</code>

2. Install <a href="https://www.npmjs.com/">npm</a>. Then run
  <code>npm install</code>

3. Run <code>gulp</code>.

4. Copy cooltip.js and cooltip.css to your project.

5. Use <code>&lt;a title="This link goes nowhere!"&gt;&lt;/a&gt;</code> and <code>$('a').cooltip()</code> for default configuration, using the title attribute as the tooltip text. More options <a href="http://jaketlarson.github.io/cooltip">here</a>.

# License
MIT license. See LICENSE file for more information.
