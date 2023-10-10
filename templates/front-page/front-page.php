<?php
/**
 * Шаблон главной страницы
 */

 ct()->header()
?>
<div class="hero">
  <div class="content-container hero__container">
    <div class="hero__content">
      <h1 class="hero__title"><span>Зарегистрируем ваш бизнес в ОАЭ</span> с дальнейшей стратегией ведения за <span>2
          недели</span> под ключ</h1>
      <div class="hero__subtitle">
        Поможем в открытии счета в банке.<br>
        <span>С нами вы станете резидентом ОАЭ.</span>
      </div>
      <div class="hero__footer">
        <button class="hero__button btn-reset btn--main">
          Рассчитать стоимость услуг
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <path d="M26.3582 12.7588L1.3584 12.7588L1.3584 15.4762L26.3582 15.4762L26.3582 12.7588Z" fill="white" />
            <path
              d="M21.5898 20.8462L19.6684 18.9247L24.4336 14.1594L19.6684 9.39414L21.5898 7.47266L28.2766 14.1594L21.5898 20.8462Z"
              fill="white" />
          </svg>
        </button>
        <div class="hero__small-text">Бесплатно получите гайд после расчета <span>“Как открыть свой бизнес в ОАЭ”</span></div>
      </div>
      <div class="hero__advantages">
        <div class="hero__advantages-item">
          <div class="hero__advantages-title">9300 +</div>
          <div class="hero__advantages-text">Проведенных консультаций нашими экспертами</div>
        </div>
        <div class="hero__advantages-item">
          <div class="hero__advantages-title">15</div>
          <div class="hero__advantages-text">Глобальных партнеров в ОАЭ</div>
        </div>
        <div class="hero__advantages-item">
          <div class="hero__advantages-title">700+</div>
          <div class="hero__advantages-text">Компаний зарегистрировано</div>
        </div>
      </div>
    </div>
    <img loading="lazy" src="<?= ct()->get_assets_url() ?>/img/hero-persons.png" class="hero__persons-image" width="849" height="769" alt="">
  </div>
</div>
<?php
ct()->footer();
