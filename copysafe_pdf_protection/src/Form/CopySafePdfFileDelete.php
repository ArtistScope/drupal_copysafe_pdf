<?php

namespace Drupal\copysafe_pdf_protection\Form;

use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Delete copy safe file for this site.
 *
 * @internal
 */
class CopySafePdfFileDelete extends ConfirmFormBase {

  /**
   * ID of the file to delete.
   *
   * @var int
   */
  protected $fid;

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'copysafe_pdf_file_delete';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $fid = NULL) {
    $this->fid = $fid = (int) $fid;

    if (is_null($this->fid) || !is_numeric($this->fid)) {
      return RedirectResponse::create('/admin/config/copysafe/copysafe_pdf_protection', RedirectResponse::HTTP_MOVED_PERMANENTLY);
    }
    else {
      $file = File::load($this->fid);

      if (empty($file)) {
        return RedirectResponse::create('/admin/config/copysafe/copysafe_pdf_protection', RedirectResponse::HTTP_MOVED_PERMANENTLY);
      }
    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    file_delete($this->fid);

    $form_state->setRedirect('copysafe_pdf_protection.copysafe_pdf');
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    return new Url('copysafe_pdf_protection.copysafe_pdf');
  }

  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    if (is_null($this->fid) || !is_numeric($this->fid)) {
      return '';
    }
    else {
      $file = File::load($this->fid);

      if (!empty($file)) {
        return t('Are you sure that you want to delete %id?', ['%id' => $file->getFilename()]);
      }
    }

  }

}
