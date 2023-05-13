import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Character from './components/Character/Character';

import styles from './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className={styles['app-container']}>
        <header className={styles['app-header']}>
          <h1>Character Sheet</h1>
        </header>
        <main className={styles['app-main']}>
          <Character  />
        </main>
      </div>
    </Provider>
  );
}

export default App;
