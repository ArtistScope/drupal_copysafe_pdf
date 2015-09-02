/**
 * Behavior to add "Insert" button for the editor.
 */

(function ($) {
  $.fn.insertAtCursorCopysafePDF = function (tagName) {
    return this.each(function(){
      if (document.selection) {
        //IE support
        this.focus();
        sel = document.selection.createRange();
        sel.text = tagName;
        this.focus();
      }else if (this.selectionStart || this.selectionStart == '0') {
        //MOZILLA/NETSCAPE support
        startPos = this.selectionStart;
        endPos = this.selectionEnd;
        scrollTop = this.scrollTop;
        this.value = this.value.substring(0, startPos) + tagName + this.value.substring(endPos,this.value.length);
        this.focus();
        this.selectionStart = startPos + tagName.length;
        this.selectionEnd = startPos + tagName.length;
        this.scrollTop = scrollTop;
      } else {
        this.value += tagName;
        this.focus();
      }
    });
  };

  Drupal.behaviors.copysafe_pdf_protection_filelink = {
    attach: function(context) {
    // Add the click handler to the insert button.
      if(!(typeof(Drupal.settings.copysafe_pdf_protection) == 'undefined')){
        for(var key in Drupal.settings.copysafe_pdf_protection.buttons){
          $("." + key, context).click(insertpdf);
        }
      }

      function insertpdf() {
        var field = "[copysafe_pdf_protection name='" + $(this).html() + "'";
        for(var key in Drupal.settings.copysafe_pdf_protection.values){
          field += " ";
          field += key + "='" + Drupal.settings.copysafe_pdf_protection.values[key] + "' ";
        }
        field += "]";
        $('#' + Drupal.settings.copysafe_pdf_protection.clicked).insertAtCursorCopysafePDF(field);

        Drupal.CTools.Modal.dismiss()
        return false;
      }
    }
  };

  /**
   * Behavior to add "Custom Insert" buttons.
   */
  Drupal.behaviors.copysafe_pdf_protection_custominsert = {
    attach: function(context) {
      // Add the click handler to the insert button.
      $("#edit-insertcodepdf", context).click(insertcodepdf);

      function insertcodepdf() {
        var allow_remote = "allow_remote='" + 0 + "' ";
        var allow_capture = "allow_capture='" + 0 + "' ";
        var print_anywhere = "print_anywhere='" + 0 + "' ";

        var height = "bgheight='" + $('#edit-copysafe-pdf-protection-height').val() + "' ";
        var width = "bgwidth='" + $('#edit-copysafe-pdf-protection-width').val() + "' ";
        var prints_allowed = "prints_allowed='" + $('#edit-copysafe-pdf-protection-printsallowed').val() + "'" + " ";
        if ($('#edit-copysafe-pdf-protection-printsanywhere').is(':checked') == true) {
          var print_anywhere = "print_anywhere='" + 1 + "' ";
        }
        if ($('#edit-copysafe-pdf-protection-allowcapture').is(':checked') == true) {
          var allow_capture = "allow_capture='" + 1 + "' ";
        }
        if ($('#edit-copysafe-pdf-protection-allowremote').is(':checked') == true) {
          var allow_remote = "allow_remote='" + 1 + "' ";
        }
        var background = "background='" + $('#edit-copysafe-pdf-protection-bgd').val() + "' ";
        var field = "[copysafe_pdf_protection name='" + $('#edit-filenamepdf').val() + "'" + " ";

        field += width + height + prints_allowed + print_anywhere + allow_capture + allow_remote + background;
        field += "]";
        $('#' + Drupal.settings.copysafe_pdf_protection.clicked).insertAtCursorCopysafePDF(field);
        Drupal.CTools.Modal.dismiss()
      }
    }
  };
})(jQuery);
