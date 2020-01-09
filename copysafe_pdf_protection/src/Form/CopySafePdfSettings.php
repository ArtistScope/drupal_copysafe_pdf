<?php

namespace Drupal\copysafe_pdf_protection\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configure Copysafe PDF settings for this site.
 *
 * @internal
 */
class CopySafePdfSettings extends ConfigFormBase {

  /**
   * Constructs a Copysafe PDF settings object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The factory for configuration objects.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    parent::__construct($config_factory);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['copysafe_pdf_protection.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'copysafe_pdf_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $settings = $this->config('copysafe_pdf_protection.settings');

    $form['uploadfolder'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('uploadfolder')) ? $settings->get('uploadfolder') : 'upload_folder/copysafe_pdf_protection',
      '#title' => t('Upload Folder'),
      '#field_prefix' => t('sites/default/files/'),
      '#required' => TRUE,
    );

    $form['size'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('size')) ? $settings->get('size') : '',
      '#title' => t('Maximum Upload Size'),
      '#field_suffix' => t('KB'),
    );

    $form['mode'] = array(
      '#type' => 'select',
      '#default_value' => !empty($settings->get('mode')) ? $settings->get('mode') : '',
      '#options' => array(
        'demo' => t('Demo Mode'),
        'licensed' => t('Licensed'),
        'debug' => t('Debugging Mode'),
      ),
      '#title' => t('Mode'),
    );

    $form['language'] = array(
      '#type' => 'select',
      '#default_value' => !empty($settings->get('language')) ? $settings->get('language') : '',
      '#options' => array(
        '0c01' => t('Arabic'),
        '0004' => t('Chinese (simplified)'),
        '0404' => t('Chinese (traditional)'),
        '041a' => t('Croatian'),
        '0405' => t('Czech)'),
        '0413' => t('Dutch'),
        '' => t('English'),
        '0464' => t('Filipino'),
        '000c' => t('French'),
        '0007' => t('German'),
        '0408' => t('Greek'),
        '040d' => t('Hebrew'),
        '0439' => t('Hindi'),
        '000e' => t('Hungarian'),
        '0421' => t('Indonesian'),
        '0410' => t('Italian'),
        '0411' => t('Japanese'),
        '0412' => t('Korean'),
        '043e' => t('Malay'),
        '0415' => t('Polish'),
        '0416' => t('Portuguese (BR)'),
        '0816' => t('Portuguese (PT)'),
        '0419' => t('Russian'),
        '0c0a' => t('Spanish'),
        '041e' => t('Thai'),
        '041f' => t('Turkish'),
        '002a' => t('Vietnamese'),
      ),
      '#title' => t('Language'),
    );

    $form['pagecolor'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('pagecolor')) ? $settings->get('pagecolor') : 'CCCCCC',
      '#title' => t('Page Color'),
    );

    $options = array(
      'asps' => t('Allow ArtisBrowser'),
      'firefox' => t('Allow Firefox (for test only)'),
      'chrome' => t('Allow Chrome (for test only)'),
    );

    $form['artisbrowser_min_version'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('artisbrowser_min_version')) ? $settings->get('artisbrowser_min_version') : '27.11',
      '#title' => t('ArtisBrowser minimum version'),
      '#description' => t('The ArtisBrowser minimum version should have 2 parts like 27.11!'),
    );

    $form['browser'] = array(
      '#title' => t('Select Browsers'),
      '#type' => 'checkboxes',
      '#default_value' => !empty($settings->get('browser')) ? $settings->get('browser') : '',
      '#options' => $options,
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
    $min_version = $form_state->getValue('artisbrowser_min_version');
    $min_version_parts = explode('.', $min_version);
    if (count($min_version_parts) > 2 || !is_numeric($min_version_parts[0]) || !is_numeric($min_version_parts[1])) {
      $form_state->setErrorByName('artisbrowser_min_version', $this->t('The ArtisBrowser minimum version should be a valid version number with 2 parts like 27.11!'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('copysafe_pdf_protection.settings')
      ->set('uploadfolder', $form_state->getValue('uploadfolder'))
      ->set('size', $form_state->getValue('size'))
      ->set('mode', $form_state->getValue('mode'))
      ->set('language', $form_state->getValue('language'))
      ->set('pagecolor', $form_state->getValue('pagecolor'))
      ->set('browser', $form_state->getValue('browser'))
      ->set('artisbrowser_min_version', $form_state->getValue('artisbrowser_min_version'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
