import React, { useEffect } from 'react'
import { useDeferredValue } from 'react';
import '../img/icon-128.png'
import '../img/icon-34.png'

export default function background() {
    chrome.runtime.onInstalled.addListener(() => {
        chrome.contextMenus.create({
          "id": "sampleContextMenu",
          "title": "Sample Context Menu",
          "contexts": ["selection"]
        });
      });
  return null;
}
