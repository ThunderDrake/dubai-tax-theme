<?php
/**
 * Шаблон главной страницы
 */

 ct()->header()
?>
<?php ct()->template('/front-page/parts/hero-section.php') ?>
<?php ct()->template('/front-page/parts/services-section.php') ?>
<?php ct()->template('/front-page/parts/advantages-section.php') ?>
<?php
ct()->footer();
