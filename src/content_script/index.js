import { initialize } from 'client';

if (SAKA_DEBUG) {
  console.log('client loaded for content script');
}

initialize('cs');
