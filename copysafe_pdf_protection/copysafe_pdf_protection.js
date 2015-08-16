(function () {
  Drupal.behaviors.copysafe_pdf_protection_embed = {
    attach: function(context) {
      flag = 0;
      for (var val in Drupal.settings.copysafe_pdf_protection.embed_options) {
        var wpcsp_plugin_url = Drupal.settings.copysafe_pdf_protection.embed_options[val]['plugin_url'];
        var wpcsp_upload_url = Drupal.settings.copysafe_pdf_protection.embed_options[val]['upload_url'];
        var m_bpDebugging = false;
        var m_szMode = Drupal.settings.copysafe_pdf_protection.embed_options[val]['mode'];
        var m_szClassName = Drupal.settings.copysafe_pdf_protection.embed_options[val]['name'];
        var m_szImageFolder = Drupal.settings.copysafe_pdf_protection.embed_options[val]['upload_url'];
        var m_bpWindowsOnly = true;
        var m_bpProtectionLayer = false;

        var m_bpChrome = Drupal.settings.copysafe_pdf_protection.embed_options[val]['chrome'];
        var m_bpFx = Drupal.settings.copysafe_pdf_protection.embed_options[val]['firefox'];
        var m_bpASPS = Drupal.settings.copysafe_pdf_protection.embed_options[val]['asps'];
        var m_bpOpera = Drupal.settings.copysafe_pdf_protection.embed_options[val]['opera'];
        var m_bpSafari = Drupal.settings.copysafe_pdf_protection.embed_options[val]['safari'];
        var m_bpMSIE = Drupal.settings.copysafe_pdf_protection.embed_options[val]['msie'];
        var m_szDefaultStyle = "ImageLink";
        var m_bpHeight = Drupal.settings.copysafe_pdf_protection.embed_options[val]['bgheight'];
        var m_bpWidth = Drupal.settings.copysafe_pdf_protection.embed_options[val]['bgwidth'];
        var m_bpBackground = Drupal.settings.copysafe_pdf_protection.embed_options[val]['background'];
        var m_bpPrintsAllowed = Drupal.settings.copysafe_pdf_protection.embed_options[val]['prints_allowed'];
        var m_bpPrintAnywhere = Drupal.settings.copysafe_pdf_protection.embed_options[val]['print_anywhere'];
        var m_bpAllowCapture = Drupal.settings.copysafe_pdf_protection.embed_options[val]['allow_capture'];
        var m_bpLanguage = Drupal.settings.copysafe_pdf_protection.embed_options[val]['language'];
        var m_bpAllowRemote = Drupal.settings.copysafe_pdf_protection.embed_options[val]['allow_remote'];

        var m_szLocation = document.location.href.replace(/&/g,'%26');
        var m_szDownloadNo = wpcsp_plugin_url + "download_no.php";
        var m_szDownload = wpcsp_plugin_url + "download.php?ref=" + m_szLocation;
        var m_szDownloadIE = m_szDownloadFX = m_szDownload;

        var m_nV1 = 3;
        var m_nV2 = 0;
        var m_nV3 = 5;
        var m_nV4 = 1;
        var m_szAgent = navigator.userAgent.toLowerCase();
        var m_szBrowserName = navigator.appName.toLowerCase();
        var m_szPlatform = navigator.platform.toLowerCase();
        var m_bNetscape = false;
        var m_bMicrosoft = false;
        var m_szPlugin = "";
        var m_bWin64 = ((m_szPlatform == "win64") || (m_szPlatform.indexOf("win64") != -1) || (m_szAgent.indexOf("win64") != -1));
        var m_bWin32 = ((m_szPlatform == "win32") || (m_szPlatform.indexOf("win32") != -1));
        var m_bWindows = (m_szAgent.indexOf("windows nt") != -1);

        var m_bOpera = ((m_szAgent.indexOf("opera") != -1) && !!(window.opera && window.opera.version) && (m_bpOpera));
        var m_bFx3 = ((m_szAgent.indexOf("firefox/3.") != -1) && (m_szAgent.indexOf("flock") == -1) && (m_szAgent.indexOf("navigator") == -1));
        var m_bFx4 = ((m_szAgent.indexOf("firefox/4.") != -1) && (m_szAgent.indexOf("flock") == -1) && (m_szAgent.indexOf("navigator") == -1));
        var m_bFirefox = ((m_szAgent.indexOf("firefox") != -1) && testCSS("MozBoxSizing") && (!(m_bFx3)) && (!(m_bFx4)) && (m_bpFx));
        var m_bSafari = ((m_szAgent.indexOf("safari") != -1) && Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 && (m_bpSafari));
        var m_bChrome = ((m_szAgent.indexOf("chrome") != -1) && !!(window.chrome && chrome.webstore && chrome.webstore.install) && (m_bpChrome));
        var m_bASPS = ((m_szAgent.indexOf("artisreader/2") != -1) && (m_bpASPS));

        var m_bNetscape = ((m_bChrome) || (m_bFirefox) || (m_bASPS) || (m_bOpera) || (m_bSafari));
        var m_bMicrosoft = ((m_szAgent.indexOf("msie") != -1) && (/*@cc_on!@*/false || testCSS("msTransform")) && (m_bpMSIE));

        if (m_szMode == "debug") {
          m_bpDebugging = true;
        }

        var arVersion = copysafe_pdf_protection_VersionCheck();
        var szNumeric = "" + arVersion[0] + "." + arVersion[1] + "." + arVersion[2];

        if ((m_bWindows) && (m_bMicrosoft)) {
          m_szPlugin = "OCX";
          if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3)) {
            window.location = unescape(m_szDownloadIE);
            document.MM_returnValue = false;
          }
        }
        else if ((m_bWindows) && (m_bNetscape)) {
          m_szPlugin = "DLL";
          if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3)) {
            window.location = unescape(m_szDownloadFX);
            document.MM_returnValue = false;
          }
        }
        else {
          window.location = unescape(m_szDownloadNo);
          document.MM_returnValue = false;
        }

        var output = 'pdfoutput' + flag;

        if ((m_szMode == "licensed") || (m_szMode == "debug")) {
          insertcopysafe_pdf_protection(m_szClassName, wpcsp_plugin_url, output, m_bpDebugging, m_szPlugin, m_bpWidth , m_bpHeight, m_szImageFolder, m_szClassName, m_bpPrintsAllowed, m_bpPrintAnywhere, m_bpAllowCapture, m_bpAllowRemote, m_bpLanguage, m_bpBackground);
        }
        else {
          document.getElementById(output).innerHTML = "<img src='" + wpcsp_plugin_url + "images/demo_placeholder.jpg' border='0' alt='Demo mode'>";
        }
        flag = flag + 1;
      }
    }
  };

  function testCSS(prop) {
    return prop in document.documentElement.style;
  }

  function copysafe_pdf_protection_VersionCheck() {
    var v = typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && typeof document.createElement != "undefined";
    var AC = [0,0,0];
    var x = "";

    if (typeof navigator.plugins != "undefined" && navigator.plugins.length > 0) {
      // Chrome, firefox, mozilla

      navigator.plugins.refresh(false);

      var szDescription = "CopySafe PDF Reader";
      var szVersionMatch = "Reader v";

      if (typeof navigator.plugins[szDescription] == "object") {
        x = navigator.plugins[szDescription].description;
        ix = x.indexOf(szVersionMatch);
        if (ix > -1) {
          x = x.slice(ix + szVersionMatch.length);
        }
        else {
          x = "";
        }
      }
    }
    else if (typeof window.ActiveXObject != "undefined") {
      // Internet explorer

      var y = null;

      try {
        y = new ActiveXObject("ARTISTSCOPE.PDFReaderWebCtrl")
        x = y.GetVersion();
      }
      catch(t)
      {
      }
    }

    if (x.length > 0) {
      ix1 = x.indexOf(".");
      ix2 = x.indexOf(".", ix1 + 1);

      if (ix1 != -1 && ix2 != -1) {
        AC[0] = parseInt(x.slice(0, ix1));
        AC[1] = parseInt(x.slice(ix1 + 1, ix2));
        AC[2] = parseInt(x.slice(ix2 + 1));
      }
    }
    return AC;
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // The copysafe-insert functions

  function insertcopysafe_pdf_protection(szDocName, wpcsp_plugin_url, output, m_bpDebugging, m_szPlugin, m_bpWidth , m_bpHeight, m_szImageFolder, m_szClassName, m_bpPrintsAllowed, m_bpPrintAnywhere, m_bpAllowCapture, m_bpAllowRemote, m_bpLanguage, m_bpBackground){
    var textarea = "ta" + output;
    var string = "<param name='Document' value='" + m_szImageFolder + m_szClassName + "' /><param name='PrintsAllowed' value='" + m_bpPrintsAllowed + "' /><param name='PrintAnywhere' value='" + m_bpPrintAnywhere + "' /><param name='AllowCapture' value='" + m_bpAllowCapture + "' /><param name='AllowRemote' value='" + m_bpAllowRemote + "' /><param name='Language' value='" + m_bpLanguage + "' /><param name='Background' value='" + m_bpBackground + "' />";

    if (m_bpDebugging == true) {
      jQuery('#' + output).append("<textarea rows='27' cols='80' id= '" + textarea + "'>");
      if ((m_szPlugin == "DLL")) {
        szObjectInsert = "type='application/x-artistscope-pdfreader5' codebase='" + wpcsp_plugin_url + "download.asp' ";
        jQuery('#' + textarea).append(escapeHtml("<ob" + "ject " + szObjectInsert + " width='" + m_bpWidth + "' height='" + m_bpHeight + "'>" + string + "</ob" + "ject />"));
      }
      else if (m_szPlugin == "OCX") {
        szObjectInsert = "classid='CLSID:DEC3C469-DD45-4C0C-8328-4C48507D9B25'";
        jQuery('#' + textarea).append(escapeHtml("<ob" + "ject " + szObjectInsert + " width='" + m_bpWidth + "' height='" + m_bpHeight + "'>" + string + "</ob" + "ject />"));
      }
      jQuery('#' + output).append("</textarea>");
    }
    else {
      if ((m_szPlugin == "DLL")) {
        szObjectInsert = "type='application/x-artistscope-pdfreader5' codebase='" + wpcsp_plugin_url + "download.asp' ";
        jQuery('#' + output).append("<ob" + "ject " + szObjectInsert + " width='" + m_bpWidth + "' height='" + m_bpHeight + "'>" + string + "</ob" + "ject />");
      }
      else if (m_szPlugin == "OCX") {
        szObjectInsert = "classid='CLSID:DEC3C469-DD45-4C0C-8328-4C48507D9B25'";
        jQuery('#' + output).append("<ob" + "ject " + szObjectInsert + " width='" + m_bpWidth + "' height='" + m_bpHeight + "'>" + string + "</ob" + "ject />");
      }
    }
  }
})(jQuery);
