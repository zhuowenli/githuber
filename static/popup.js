/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-23 14:26:31
 */

'use strict';

/* eslint-disable */

var form = {};
var $title = $('#title');
var $url = $('#url');
var $img = $('#img');
var $button = $('#button');
var $notification = $('#notification');

chrome.tabs.getSelected(null, function(tab) {
    $title.val(tab.title);
    $url.val(tab.url);
    $img.html('<img src="' + tab.favIconUrl + '">')
});

$button.on('click', function() {
    chrome.runtime.sendMessage({
		name: 'add',
		message: {
            title: $title.val(),
            url: $url.val(),
            logo: $img.find('img').attr('src'),
        }
	}, function(o) {
		$notification.addClass('show');
	});
});
