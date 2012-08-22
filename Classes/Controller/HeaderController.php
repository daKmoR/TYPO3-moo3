<?php

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2012 Thomas Allmer <thomas.allmer@webteam.at>, WEBTEAM GmbH
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 *
 *
 * @package fluidce
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class Tx_Moo3_Controller_HeaderController extends Tx_Extbase_MVC_Controller_ActionController {

	/**
	 * @var Tx_Fluidce_Domain_Repository_PageRepository
	 */
	protected $pageRepository;

	/**
	 * @param Tx_Fluidce_Domain_Repository_PageRepository $pageRepository
	 * @return void
	 */
	public function injectPageRepository(Tx_Fluidce_Domain_Repository_PageRepository $pageRepository) {
		$this->pageRepository = $pageRepository;
	}

	/**
	 *
	 */
	public function listAction() {
		$storage = $this->pageRepository->findByUid(2);
		$this->view->assign('storage', $storage);
		$contents = $storage->getContents();

		$contentsString = '<div id="clipboard" class="clearfix">';
		foreach ($contents as $content) {
			if ($this->settings[get_class($content)]) {
				$templatePathAndFilename = $this->settings[get_class($content)];
				$this->view->setTemplatePathAndFilename($templatePathAndFilename);
				$this->view->assign('content', $content);
				$contentsString .= $this->view->render();
			}
		}
		$contentsString .= '</div>';
		return $contentsString;

	}

}