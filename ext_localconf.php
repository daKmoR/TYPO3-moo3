<?php
if (!defined ("TYPO3_MODE")) 	die ("Access denied.");

t3lib_extMgm::addTypoScript($_EXTKEY, 'setup', '
plugin.tx_mootoolsessentials {
	settings {
		manifests {
			Moo3 = EXT:moo3/Resources/Public/Manifests/Moo3/
		}
	}
}
', 43);