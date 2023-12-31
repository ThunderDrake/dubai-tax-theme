<div class="graph-modal__container service-modal service-modal--consult" role="dialog" aria-modal="true"
  data-graph-target="consult-modal">
  <button class="btn-reset js-modal-close graph-modal__close" aria-label="Закрыть модальное окно"></button>
  <div class="graph-modal__content service-modal__content">
    <div class="service-modal__header">
    </div>
    <form class="service-modal__form" action="" data-form="consult-form">
      <div class="service-modal__form-title">Leave a request</div>
      <div class="service-modal__form-subtitle">and we will contact you shortly</div>
      <input class="service-modal__form-input input-reset service-modal__form-input--name" type="text" name="name" placeholder="Your name">
      <input class="service-modal__form-input input-reset service-modal__form-input--tel" name="phone"
        data-phone-country type="tel">
      <div class="service-modal__form-select-title">We will send you a Guide by email</div>
      <input class="service-modal__form-input input-reset service-modal__form-input--mail" type="email" name="email" placeholder="Your e-mail">
      <button class="btn-reset service-modal__form-button">Get a consultation</button>
      <div class="service-modal__form-legal">By submitting the form you agree to the terms <a href="<?= get_privacy_policy_url() ?>" target="_blank">data privacy policies</a></div>
    </form>
  </div>
</div>
