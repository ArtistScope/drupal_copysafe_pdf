<?php

namespace Drupal\copysafe_pdf_protection\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;

/**
 * Configure copy safe pdf class configuration for this site.
 *
 * @internal
 */
class CopySafePdfClass extends FormBase {

  /**
   * ID of the file to generate copy safe script.
   *
   * @var int
   */
  protected $fid;

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'copysafe_pdf_class';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['copysafe_pdf_protection.class_settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $fid = NULL) {
    $settings = $this->config('copysafe_pdf_protection.class_settings');

    $form['#prefix'] = '<div id="copysafe-class-config">';
    $form['#suffix'] = '</div>';

    if (empty($fid) || !is_numeric($fid['fid'])) {
      return RedirectResponse::create('/admin/config/copysafe/copysafe_pdf_protection', RedirectResponse::HTTP_MOVED_PERMANENTLY);
    }

    $file = File::load($fid['fid']);

    if (empty($file)) {
      return RedirectResponse::create('/admin/config/copysafe/copysafe_pdf_protection', RedirectResponse::HTTP_MOVED_PERMANENTLY);
    }

    $form['filename'] = array(
      '#type' => 'textfield',
      '#default_value' => $file->getFilename(),
      '#title' => t('File Name'),
      '#disabled' => TRUE,
    );

    $form['width'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('width')) ? $settings->get('width') : '',
      '#title' => t('Viewer Width'),
      '#size' => 20,
      '#field_suffix' => t('(in pixels - leave blank to use filename settings)'),
    );

    $form['height'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('height')) ? $settings->get('height') : '',
      '#title' => t('Viewer Height'),
      '#size' => 20,
      '#field_suffix' => t('(in pixels)'),
    );

    $form['prints_allowed'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('prints_allowed')) ? $settings->get('prints_allowed') : '',
      '#title' => t('Prints Allowed'),
      '#size' => 20,
    );
    $form['print_anywhere'] = array(
      '#type' => 'checkbox',
      '#default_value' => !empty($settings->get('print_anywhere')) ? $settings->get('print_anywhere') : '',
      '#title' => t('Prints Anywhere'),
      '#size' => 20,
    );
    $form['allow_capture'] = array(
      '#type' => 'checkbox',
      '#default_value' => !empty($settings->get('allow_capture')) ? $settings->get('allow_capture') : '',
      '#title' => t('Allow Capture'),
      '#size' => 20,
    );
    $form['allow_remote'] = array(
      '#type' => 'checkbox',
      '#default_value' => !empty($settings->get('allow_remote')) ? $settings->get('allow_remote') : '',
      '#title' => t('Allow Remote'),
    );
    $form['background'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('background')) ? $settings->get('background') : 'CCCCCC',
      '#title' => t('Background'),
      '#field_suffix' => t('(without the #)'),
    );

    $form['actions'] = array('#type' => 'actions');

    $form['actions']['insertcode'] = [
      '#type' => 'submit',
      '#value' => $this->t('Generate CopySafe PDF Script'),
      '#attributes' => [
        'class' => [
          'use-ajax',
          'edit-insertcode'
        ],
      ],
      '#ajax' => [
        'callback' => [$this, 'submitClassFormAjax'],
        'event' => 'click',
      ],
    ];

    $form['#attached']['library'][] = 'core/drupal.dialog.ajax';

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {}

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = \Drupal::service('config.factory')->getEditable('copysafe_pdf_protection.class_settings');

    $config->set('filename', $form_state->getValue('filename'))
      ->set('width', $form_state->getValue('width'))
      ->set('height', $form_state->getValue('height'))
      ->set('prints_allowed', $form_state->getValue('prints_allowed'))
      ->set('print_anywhere', $form_state->getValue('print_anywhere'))
      ->set('allow_capture', $form_state->getValue('allow_capture'))
      ->set('allow_remote', $form_state->getValue('allow_remote'))
      ->set('background', $form_state->getValue('background'))
      ->save();
  }

  /**
   * AJAX callback handler that displays any errors or a success message.
   */
  public function submitClassFormAjax(array $form, FormStateInterface $form_state) {
    $response = new AjaxResponse();

    // If there are any form errors, re-display the form.
    if ($form_state->hasAnyErrors()) {
      $response->addCommand(new ReplaceCommand('#copysafe-class-config', $form));
    }
    else {
      $values = $form_state->getValues();

      $data = array(
        "name='" . $values['filename'] . "'",
        "bgwidth='" . $values['width'] . "'",
        "bgheight='" . $values['height'] . "'",
        "prints_allowed='" . $values['prints_allowed'] . "'",
        $values['print_anywhere'] !== 0 ? "print_anywhere='1'" : "print_anywhere='0'",
        $values['allow_capture'] !== 0 ? "allow_capture='1'" : "allow_capture='0'",
        $values['allow_remote'] !== 0 ? "allow_remote='1'" : "allow_remote='0'",
        "background='" . $values['background'] . "'",
      );

      $copysafe_script = '<div id="copysafe-script-wrap">[copysafe_pdf_protection ' . implode($data, ' ') . ' ]</div>
      <br />';

      $response->addCommand(new OpenModalDialogCommand("CopySafe PDF Script for " . $values['filename'], $copysafe_script, ['width' => 800]));
    }

    return $response;
  }

}
