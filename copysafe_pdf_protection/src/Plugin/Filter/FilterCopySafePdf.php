<?php

namespace Drupal\copysafe_pdf_protection\Plugin\Filter;

use Drupal\Core\StreamWrapper\PublicStream;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Provides a filter to copy safe pdf protection.
 *
 * The attributes in the annotation show examples of allowing all attributes
 * by only having the attribute name, or allowing a fixed list of values, or
 * allowing a value with a wildcard prefix.
 *
 * @Filter(
 *   id = "copysafepdf_protection",
 *   title = @Translation("Enable CopySafePdf tag replacement"),
 *   description = @Translation("Enables CopySafePdf tag replacement."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 *   settings = {
 *   },
 *   weight = -10
 * )
 */
class FilterCopySafePdf extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    if (preg_match_all('/\[copysafe_pdf_protection[^\]]+\]/i', $text, $matches)) {
      global $base_url;
      $settings = array();

      $pdf_config = \Drupal::config('copysafe_pdf_protection.settings');

      foreach ($matches[0] as $matched) {
        $img = array();
        preg_match_all('/(name|height|width|filename|prints_allowed|print_anywhere|allow_capture|allow_remote|background)=([\'|"][^\']*[\'|"])/i', $matched, $img);
        $atts = array();

        for ($i = 0; $i < count($img[1]); $i++) {
          $atts[$img[1][$i]] = $img[2][$i];
        }

        static $embed_id;

        if (!isset($embed_id)) {
          $embed_id = 0;
        }

        $csp_id = "copysafe_pdf_protection_id" . $embed_id;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['mode'] = !empty($pdf_config->get('mode')) ? $pdf_config->get('mode') : '';
        $settings['copysafe_video_protection']['embed_options'][$csp_id]['artisbrowser_min_version'] = !empty($pdf_config->get('artisbrowser_min_version')) ? $pdf_config->get('artisbrowser_min_version') : '27.11';
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['bgheight'] = (isset($atts['height'])) ? str_replace("'", "", $atts['height']) : '';
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['bgwidth'] = (isset($atts['width'])) ? str_replace("'", "", $atts['width']) : '';
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['name'] = str_replace("'", "", $atts['name']);
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['prints_allowed'] = (isset($atts['prints_allowed'])) ? str_replace("'", "", $atts['prints_allowed']) : 0;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['background'] = (isset($atts['background'])) ? str_replace("'", "", $atts['background']) : 'CCCCCC';
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['print_anywhere'] = (isset($atts['print_anywhere'])) ? str_replace("'", "", $atts['print_anywhere']) : 0;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['allow_capture'] = (isset($atts['allow_capture'])) ? str_replace("'", "", $atts['allow_capture']) : 0;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['allow_remote'] = (isset($atts['allow_remote'])) ? str_replace("'", "", $atts['allow_remote']) : 0;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['language'] = !empty($pdf_config->get('language')) ? $pdf_config->get('language') : '';

        $default = array(
          'asps' => 'asps',
          'ie' => 'ie',
          'firefox' => 'firefox',
          'chrome' => 'chrome',
          'navigator' => 'navigator',
          'opera' => 'opera',
          'safari' => 'safari',
        );
        $browser = !empty($pdf_config->get('browser')) ? $pdf_config->get('browser') : $default;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['name'] = str_replace("'", "", $atts["name"]);
        $filename  = str_replace("'", "", $atts["name"]);

        $folder = !empty($pdf_config->get('uploadfolder')) ? $pdf_config->get('uploadfolder') : 'upload_folder/copysafe_pdf_protection';
        $upload_folder = PublicStream::basePath() . "/" . $folder . "/";

        if (!file_exists($upload_folder . $filename)) {
          return "<div style='padding:5px 10px;background-color:#fffbcc'><strong>File($filename) don't exist</strong></div>";
        }

        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['asps'] = "";
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['chrome'] = "";
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['firefox'] = "";
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['navigator'] = "";
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['opera'] = "";
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['safari'] = "";
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['msie'] = "";

        if (isset($browser['chrome'])) {
          if ($browser['chrome'] === "chrome") {
            $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['chrome'] = 1;
          }
        }
        if (isset($browser['firefox'])) {
          if ($browser['firefox'] === "firefox") {
            $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['firefox'] = 1;
          }
        }
        if (isset($browser['asps'])) {
          if ($browser['asps'] === "asps") {
            $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['asps'] = 1;
          }
        }
        if (isset($browser['navigator'])) {
          if ($browser['navigator'] === "navigator") {
            $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['navigator'] = 1;
          }
        }
        if (isset($browser['opera'])) {
          if ($browser['opera'] === "opera") {
            $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['opera'] = 1;
          }
        }
        if (isset($browser['safari'])) {
          if ($browser['safari'] === "safari") {
            $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['safari'] = 1;
          }
        }
        if (isset($browser['ie'])) {
          if ($browser['ie'] === "ie") {
            $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['msie'] = 1;
          }
        }

        $plugin_url = $base_url . '/' . drupal_get_path('module', 'copysafe_pdf_protection') . '/';
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['plugin_url'] = $base_url . '/' . drupal_get_path('module', 'copysafe_pdf_protection') . '/';
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['plugin_path'] = $base_url . '/' . drupal_get_path('module', 'copysafe_pdf_protection') . '/';
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['upload_path'] = $base_url . '/' . $upload_folder;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['upload_url'] = $base_url . '/' . $upload_folder;

        static $inc;

        if (!isset($inc)) {
          $inc = 0;
        }
        $outputid = "output" . $inc;
        $settings['copysafe_pdf_protection']['embed_options'][$csp_id]['outputid'] = (isset($outputid)) ? $outputid : '';

        $output = <<<html
            <div id = $outputid>
            </div>
html;

        $text = $this->strReplaceOnce($matched, $output, $text);
        $embed_id++;
        $inc = $inc + 1;
      }

      $result = new FilterProcessResult($text);
      $result->setAttachments(array(
        'library' => array(
          'copysafe_pdf_protection/copysafe_pdf_protection',
        ),
        'drupalSettings' => $settings
      ));

      return $result;
    }

    return new FilterProcessResult($text);
  }

  /**
   * Function() for CopySafe PDF String Replacement.
   */
  public function strReplaceOnce($str_pattern, $str_replacement, $string) {

    if (strpos($string, $str_pattern) !== FALSE) {
      return substr_replace($string, $str_replacement, strpos($string, $str_pattern), strlen($str_pattern));
    }

    return $string;
  }

  /**
   * {@inheritdoc}
   */
  public function getHTMLRestrictions() {

  }

  /**
   * {@inheritdoc}
   */
  public function tips($long = FALSE) {
    $output = '<p>' . $this->t('HTML header tags generated by Microsoft Office are stripped') . '</p>';

    return $output;
  }

}
