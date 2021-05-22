import React, { useCallback, useEffect } from 'react';
import CardList from './CardList';
import Store from '../Store';
import Modal from './Modal';
import { useSnapshot } from 'valtio';
import Button from './Button';
import { Info, Zap } from 'react-feather';

const App = () => {
  const snap = useSnapshot(Store);

  useEffect(() => {
    if(!localStorage.getItem('cards')) {
      localStorage.setItem('cards', JSON.stringify({
        value: []
      }));
    }

    if(!localStorage.getItem('length')) {
      localStorage.setItem('length', '1');
    }

    if(!localStorage.getItem('id')) {
      localStorage.setItem('id', '0');
    }

    try {
      const cards = JSON.parse(localStorage.getItem('cards'))?.value;

      if(cards) {
        Store.cards = cards;
      }
    } catch(e) {
      console.error(e);
    }
  }, []);

  const handleOnClick = useCallback(async () => {
    Store.isModalVisible = true;
  }, []);

  const handleOnReturn = useCallback(async (intention, data) => {
    Store.isModalVisible = false;

    if(intention) {
      let tabs = await chrome.tabs.query({
        currentWindow: true
      });

      let urls = [];
      let favicons = [];

      tabs?.forEach(tab => {
        urls.push(tab.url);
        favicons.push(tab.favIconUrl);
      });

      const {value, pick, isShowingIcons} = data;
      const cards = Store.cards;

      cards.push({
        name: value?.length === 0 ? `Snapshot #${localStorage.getItem('length')}` : value,
        urls: urls,
        color: pick.color,
        meta: new Date().toISOString(),
        visible: true,
        id: localStorage.getItem('id'),
        favicons: isShowingIcons ? favicons : [],
        isShowingIcons: isShowingIcons
      });

      localStorage.setItem('length', (parseInt(localStorage.getItem('length')) + 1).toString());
      localStorage.setItem('id', (parseInt(localStorage.getItem('id')) + 1).toString());
      localStorage.setItem('cards', JSON.stringify({value: cards}));

      Store.cards = cards;
    }
  }, []);

  const handleOnClickInfo = useCallback(() => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('licenses.html')
    });
  }, []);

  return (
    <div className={'w-full h-full relative select-none'}>
      <Modal
        isVisible={snap.isModalVisible}

        onReturn={(i, v) => handleOnReturn(i, v)}
      />

      <div className={'p-5'}>
        <CardList />
      </div>

      <div className={'flex fixed bottom-10 right-10 items-center'}>
        <div className={'text-gray-300 cursor-pointer mr-3'} onClick={() => handleOnClickInfo()}>
          <Info />
        </div>

        <Button onClick={() => handleOnClick()}>
          <div className={'flex items-center'}>
            <span className={'mx-1'}>Snapshot</span>
            <Zap size={18} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default App;
