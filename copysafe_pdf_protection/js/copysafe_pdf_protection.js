(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.copysafe_pdf_protection_embed = {
        attach: function (context) {
            flag = 0;
            for (var val in drupalSettings.copysafe_pdf_protection.embed_options) {
                var wpcsp_plugin_url = drupalSettings.copysafe_pdf_protection.embed_options[val]['plugin_url'];
                var wpcsp_upload_url = drupalSettings.copysafe_pdf_protection.embed_options[val]['upload_url'];
                var m_bpDebugging = false;
                var m_szMode = drupalSettings.copysafe_pdf_protection.embed_options[val]['mode'];
                var m_szClassName = drupalSettings.copysafe_pdf_protection.embed_options[val]['name'];
                var m_szImageFolder = drupalSettings.copysafe_pdf_protection.embed_options[val]['upload_url'];
                var m_bpWindowsOnly = true;
                var m_bpProtectionLayer = false;

                var m_bpChrome = drupalSettings.copysafe_pdf_protection.embed_options[val]['chrome'];
                var m_bpFx = drupalSettings.copysafe_pdf_protection.embed_options[val]['firefox'];
                var m_bpASPS = drupalSettings.copysafe_pdf_protection.embed_options[val]['asps'];
                var m_min_versionASPS = drupalSettings.copysafe_video_protection.embed_options[val]['artisbrowser_min_version'];
                var m_bpOpera = drupalSettings.copysafe_pdf_protection.embed_options[val]['opera'];
                var m_bpSafari = drupalSettings.copysafe_pdf_protection.embed_options[val]['safari'];
                var m_bpMSIE = drupalSettings.copysafe_pdf_protection.embed_options[val]['msie'];
                var m_szDefaultStyle = "ImageLink";
                var m_bpHeight = drupalSettings.copysafe_pdf_protection.embed_options[val]['bgheight'];
                var m_bpWidth = drupalSettings.copysafe_pdf_protection.embed_options[val]['bgwidth'];
                var m_bpBackground = drupalSettings.copysafe_pdf_protection.embed_options[val]['background'];
                var m_bpPrintsAllowed = drupalSettings.copysafe_pdf_protection.embed_options[val]['prints_allowed'];
                var m_bpPrintAnywhere = drupalSettings.copysafe_pdf_protection.embed_options[val]['print_anywhere'];
                var m_bpAllowCapture = drupalSettings.copysafe_pdf_protection.embed_options[val]['allow_capture'];
                var m_bpLanguage = drupalSettings.copysafe_pdf_protection.embed_options[val]['language'];
                var m_bpAllowRemote = drupalSettings.copysafe_pdf_protection.embed_options[val]['allow_remote'];
                var m_szDefaultMessage = "";

                var m_szLocation = document.location.href.replace(/&/g, '%26');
                var m_szDownloadNo = wpcsp_plugin_url + "download_no.html";
                var m_szDownload = wpcsp_plugin_url + "download.html?ref=" + m_szLocation;
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
                var m_bChrome = ((m_szAgent.indexOf("chrome") != -1) && (m_bpChrome));
                var m_bASPS = (((m_szAgent.indexOf("artisreader") != -1) || (m_szAgent.indexOf("artisbrowser") != -1)) && (m_bpASPS));

                var m_bNetscape = ((m_bChrome) || (m_bFirefox) || (m_bASPS));

                var m_bMicrosoft = (((m_szAgent.indexOf("msie") != -1) || (m_szAgent.indexOf("trident") != -1)) && (m_bpMSIE));

                if ((m_bWindows) && (m_bNetscape)) {
                    m_szPlugin = "DLL";
                }

                if (m_szMode == "debug") {
                    m_bpDebugging = true;
                }
                // In case it's windows and browser not artisbrowser.
                if ((m_bWindows) && !(m_bASPS) && !(m_bpDebugging)) {
                    window.location = unescape(m_szDownload);
                    document.MM_returnValue = false;
                }

                // Not windows.
                if (!m_bWindows) {
                    window.location = unescape(m_szDownloadNo);
                    document.MM_returnValue = false;
                }

                // Version check.
                if ((m_bWindows) && (m_bASPS)) {
                    // Get the artisBrowser version.
                    var arVersion = get_artisBrowser_version();
                    var szNumeric = "" + arVersion[0] + "." + arVersion[1];
                    if (versionCompare(szNumeric, m_min_versionASPS) < 0) {
                        window.location = unescape(m_szDownload);
                        document.MM_returnValue = false;
                    }
                }

                //var output = 'output' + flag;
                var output = drupalSettings.copysafe_pdf_protection.embed_options[val]['outputid'];

                //if (m_bpDebugging == true) {
                //document.getElementById(output).innerHTML = "UserAgent= " + m_szAgent
                // + "<br>"); jQuery('#'+output).html("Browser= " + m_szBrowserName +
                // "<br>"); jQuery('#'+output).html("Platform= " + m_szPlatform +
                // "<br>"); jQuery('#'+output).html("Referer= " + m_szLocation +
                // "<br>"); }

                if ((m_szMode == "licensed") || (m_szMode == "debug")) {
                    insertcopysafe_pdf_protection(m_szClassName, wpcsp_plugin_url, output, m_bpDebugging, m_szPlugin, m_bpWidth, m_bpHeight, m_szImageFolder, m_szClassName, m_bpPrintsAllowed, m_bpPrintAnywhere, m_bpAllowCapture, m_bpAllowRemote, m_bpLanguage, m_bpBackground);
                } else {
                    document.getElementById(output).innerHTML = "<img src='" + wpcsp_plugin_url + "images/demo_placeholder.jpg' border='0' alt='Demo mode'>";
                }
                //flag = flag + 1;
            }
        }
    };

  /**
   * TestCSS function.
   * @param prop
   * @returns {boolean}
   */
    function testCSS(prop) {
        return prop in document.documentElement.style;
    }

    /**
     * Function to get browser version.
     * @returns {number[]}
     */
    function get_artisBrowser_version() {
        var uMatch = navigator.userAgent.match(/ArtisBrowser\/(.*)$/), ffVersion;
        if (uMatch && uMatch.length > 1) {
            ffVersion = uMatch[1].split(' ')[0];
        }
        var AC = [0, 0], ix1 = 0, ix2 = 0;
        if (ffVersion.length > 0) {
            ix1 = ffVersion.indexOf(".");
            ix2 = ffVersion.indexOf(".", ix1 + 1);
            if (ix1 != -1 && ix2 != -1) {
                AC[0] = parseInt(ffVersion.slice(0, ix1));
                AC[1] = parseInt(ffVersion.slice(ix1 + 1, ix2));
                // AC[2] = parseInt(ffVersion.slice(ix2 + 1));
            }
        }
        return AC;
    }

    /**
     * Compares two software version numbers (e.g. "1.7.1")
     *
     * @param v1
     * @param v2
     * @param options
     * @returns {number}
     * <ul>
     *    <li>0 if the versions are equal</li>
     *    <li>a negative integer iff v1 < v2</li>
     *    <li>a positive integer iff v1 > v2</li>
     *    <li>NaN if either version string is in the wrong format</li>
     * </ul>
     */
    function versionCompare(v1, v2, options) {
        var lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) {
                v1parts.push("0");
            }
            while (v2parts.length < v1parts.length) {
                v2parts.push("0");
            }
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }
            if (v1parts[i] == v2parts[i]) {
                continue;
            } else if (v1parts[i] > v2parts[i]) {
                return 1;
            } else {
                return -1;
            }
        }
        if (v1parts.length != v2parts.length) {
            return -1;
        }
        return 0;
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
    function insertcopysafe_pdf_protection(szDocName, wpcsp_plugin_url, output, m_bpDebugging, m_szPlugin, m_bpWidth, m_bpHeight, m_szImageFolder, m_szClassName, m_bpPrintsAllowed, m_bpPrintAnywhere, m_bpAllowCapture, m_bpAllowRemote, m_bpLanguage, m_bpBackground) {
        var textarea = "ta" + output;
        var string = "<param name='Document' value='" + m_szImageFolder + m_szClassName + "' /><param name='PrintsAllowed' value='" + m_bpPrintsAllowed + "' /><param name='PrintAnywhere' value='" + m_bpPrintAnywhere + "' /><param name='AllowCapture' value='" + m_bpAllowCapture + "' /><param name='AllowRemote' value='" + m_bpAllowRemote + "' /><param name='Language' value='" + m_bpLanguage + "' /><param name='Background' value='" + m_bpBackground + "' />";

        if (m_bpDebugging == true) {
            jQuery('#' + output).append("<textarea rows='27' cols='80' id= '" + textarea + "'>");
            if ((m_szPlugin == "DLL")) {
                szObjectInsert = "type='application/x-artistscope-pdfreader5' codebase='" + wpcsp_plugin_url + "download.html' ";
                jQuery('#' + textarea).append(escapeHtml("<ob" + "ject " + szObjectInsert + " width='" + m_bpWidth + "' height='" + m_bpHeight + "'>" + string + "</ob" + "ject />"));
            }
            jQuery('#' + output).append("</textarea>");
        } else {
            if ((m_szPlugin == "DLL")) {
                szObjectInsert = "type='application/x-artistscope-pdfreader5' codebase='" + wpcsp_plugin_url + "download.asp' ";
                jQuery('#' + output).append("<ob" + "ject " + szObjectInsert + " width='" + m_bpWidth + "' height='" + m_bpHeight + "'>" + string + "</ob" + "ject />");
            }
        }
    }
})(jQuery, Drupal, drupalSettings);
