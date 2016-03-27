Reactdown
=========

Markdown based live document format.

Primer
------

Example:

    :date: 2016-03-26
    :tags: primer, reactdown

    Reactdown primer
    ================

    Hello, this is just a regular markdown paragraph.

    Custom block elements
    ---------------------

    Reactdown allows custom block elements, the simplest example you can see
    below.

    ::Note

      This piece of markup will be handled by a special component.

    ::Element
      :property: value
      :key: value

    ::Form

      Individual
      ~~~~~~~~~~

      ::Field
        :label: First Name
        :key: firstName

      ::Field
        :label: Last Name
        :key: lastName


    Custom inline elements
    ----------------------

    This is a link to :gh-pr:786

    This is a link to :gh-issue:1256:`Custom issue title`

    Hope you liked it.
