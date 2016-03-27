Reactdown
=========

Reactdown is a text markup format which extends markdown with custom block and
inline element syntax which then compiles to React components.

Custom block element syntax
---------------------------

Example:

    Paragraph

    ... JustElement

    ... Element
        :property: value
        :key: value

        Child paragraph

    ... ModalDialog
        :buttons: ok,cancel

        ... Content

            Child Paragraph

    Another Paragraph

Custom inline element syntax
----------------------------

Example:

    This is a link to :gh-pr:786

    This is a link to :gh-issue:1256:`Custom issue title`
