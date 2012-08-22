<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

t3lib_extMgm::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Moo3');

Tx_Extbase_Utility_Extension::registerPlugin(
	$_EXTKEY,
	'Header',
	'show header'
);