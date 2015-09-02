drupal_copysafe_pdf
===================

Drupal module for Copysafe PDF

DESCRIPTION
-----------------------

This module allows you to embed CopySafe PDF into web pages. It supports 
both plain text and wysiwyg textareas. Embedding is possible in three modes: 

* Demo Mode - displays a placeholder image.
* Licensed Mode - displays encrypted PDF and activates the browser plugin.
* Debugging Mode - displays the object tag HTML in a text area form object.

REQUIREMENTS
---------------------------

* Drupal 7
* cTools module. See http://drupal.org/project/ctools for further information.
* CopySafe PDF Protector software is required to encrypted the PDF files.

INSTALLATION
------------------------

1. Unzip/upload cTools module to /sites/all/modules.
2. Unzip/upload the Copysafe PDF module into /sites/all/modules.
3. Go to Administration » Modules, then enable CopySafe PDF module as CopySafe PDF module requires cTools module it will ask confirmation to enable cTools module.
4. Go to Configuration » CONTENT AUTHORING - click 'Text Formats'. Click 'configure' button against Full HTML under 'Operations' column. Enable Copysafe PDF and Drag it to first in the filter processing order.


CONFIGURATION
---------------------------

* Enable CopySafe PDF in Administration » Configuration » Content Authoring » Text Formats » Full HTML.
* Add Upload Folder and settings in Administration » Configuration » Media » CopySafe PDF » CopySafe PDF Settings.

CopySafe PDF Usage
-----------------------------------

* Click 'Embed CopysafePDF' to upload files and embed image to the textarea.
* There is 'Embed Options' where you can add file embed options.	
* You can also Upload Files at Administration » Configuration » Media » CopySafe PDF » CopySafe PDF Files.

Dependencies
-----------------------

* ctools

Recommended
------------------------

* The Copysafe PDF Protector software can be obtained from www.artistscope.com

