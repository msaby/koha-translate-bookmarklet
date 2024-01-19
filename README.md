# koha-translate-bookmarklet

Javascript bookmarlet to make the translation of koha easier from weblate

version 1.0

currently works for english, french, german and italian versions of weblate interface

author : Mathieu Saby

The bookmarklet adds direct links to the source files (and specific lines, except for yml files) in koha and koha manual git repo. For example : 

![image](https://github.com/msaby/koha-translate-bookmarklet/assets/932804/d8c894ca-be55-4e10-9123-f897a763e569)

It also works if a string is shared by different source files.

The code needs to identify a specific string in weblate code. So it currently works if you use the english, french, german or italian interface of weblate, but it could be extended to other languages.

To use : 
- add the bookmarklet in your browser
- click on the bookmarklet when you reach a page of https://translate.koha-community.org/ dedicated to a specific string
