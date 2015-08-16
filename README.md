drupal_copysafe_web
===================

<<<<<<< .mine
Drupal module for Copysafe Web

DESCRIPTION
-----------------------

This module allows you to use Copysafe Web images in Drupal web pages using 
both plain text and wysiwyg textareas. Embedding is possible in three modes: 
	
1.Demo Mode - displays placeholder image for testing.
2.Licensed Mode - displays the object tag HTML for encrypted images.
3.Debugging Mode - displays the object tag HTML in a text area to check ourput.

REQUIREMENTS
----------------------------

* Drupal 7
* cTools module. See http://drupal.org/project/ctools for further information.
* CopySafe Web software to encrypt images. See http://www.artistscope.com

INSTALLATION
-----------------------

1. Unzip/upload cTools module to /sites/all/modules. 
2. Unzip/upload the Copysafe Web module into /sites/all/modules. 
3. Go to Administration » Modules, then enable CopySafe Web module
    as CopySafe Web module requires cTools module it will ask confirmation to 
    enable cTools module.
4. Go to Configuration » CONTENT AUTHORING - click 'Text Formats'. 
    Click 'configure' button against Full HTML under 'Operations' column.
    Enable Copysafe Web and Drag it to first in the filter processing order.

CONFIGURATION
----------------------------

* Enable CopySafe Web as above and #4.
* Add Upload Folder and other settings in Administration » Configuration » 
  Media » CopySafe Web » CopySafe Web Settings.

USAGE
-----------

* You can see 'Embed Copysafe Web Image' above the textarea, which can upload 
   files and embed image to the textarea.
* There is 'Embed Options' where you can add file embed options.	
* You can also Upload Files at Administration » Configuration » Media » 
   CopySafe Web » CopySafe Web Files.

DEPENDENCIES
--------------------------

- cTools

LICENSING
------------------

This Drupal module is provided for free and "as is" without warranty.

To encrypt images and add copy protection using this module, a license is 
required for the CopySafe Web software which can be licensed per domain 
from http://www.artistscope.com/
=======
Drupal module for Copysafe PDF

DESCRIPTION
-----------------------

This module allows you to embed CopySafe PDF into web pages. It supports 
both plain text and wysiwyg textareas. Embedding is possible in three modes: 
  1. Demo Mode - displays a placeholder image.
  2. Licensed Mode - displays encrypted PDF and activates the browser plugin.
  3. Debugging Mode - displays the object tag HTML in a text area form object.

REQUIREMENTS
---------------------------

* CopySafe PDF Protector software is required to encrypted the PDF files.

INSTALLATION
------------------------

* Install ctools, see http://drupal.org/project/ctools for further information.
* Enable CopySafe PDF module at Administration » Modules.

CONFIGURATION
---------------------------

* Enable CopySafe PDF in Administration » Configuration » Content Authoring » 
  Text Formats » Full HTML.
* Add Upload Folder and settings in Administration » Configuration » Media » 
  CopySafe PDF » CopySafe PDF Settings.

CopySafe PDF Usage
-----------------------------------

* Click 'Embed CopysafePDF' to upload files and embed image to the textarea.
* There is 'Embed Options' where you can add file embed options.	
* You can also Upload Files at Administration » Configuration » Media » 
   CopySafe PDF » CopySafe PDF Files.

Dependencies
-----------------------

* ctools

Recommended
------------------------

* The Copysafe PDF Protector software can be obtained from www.artistscope.com

Thanks to
---------------



>>>>>>> .r3
