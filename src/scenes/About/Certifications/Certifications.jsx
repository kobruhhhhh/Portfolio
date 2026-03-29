import { useEffect } from 'react';
import s from './Certifications.module.scss';

const badges = [
  { id: 'bf19bb50-5216-4a2d-918d-fc620768e644' },
  { id: '7eb484e9-89fc-4b36-867f-ce6e48923b8c' },
  { id: 'c831f5c0-6d7f-4608-b80d-9896eebf0e4d' },
  { id: 'f7fc0af5-53fb-46d1-96bb-a507030fae56' },
  { id: 'f688bb4e-9b81-49f8-b955-94e3e61b23e7' },
  { id: '38d8c043-3a26-4b7f-bb01-185677dd4673' },
  { id: '5db34e75-7a49-410a-9eee-545d2305cde9' },
  { id: 'bf5d5d1f-1b0a-4b77-ac6e-fd5548f7db98' },
];

const CREDLY_SCRIPT_SRC = '//cdn.credly.com/assets/utilities/embed.js';

const Certifications = () => {
  useEffect(() => {
    // Disable pointer events on all Credly iframes to allow page scroll
    const disableIframePointerEvents = () => {
      document.querySelectorAll('iframe').forEach(iframe => {
        if (iframe.src?.includes('credly.com')) {
          iframe.style.pointerEvents = 'none';
        }
      });
    };

    // Watch for dynamically injected iframes
    const observer = new MutationObserver(disableIframePointerEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    // Always remove and re-add script to force full reload
    const existingScript = document.querySelector(`script[src="${CREDLY_SCRIPT_SRC}"]`);
    if (existingScript) existingScript.remove();

    // Remove existing Credly iframes to force fresh render
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src?.includes('credly.com')) iframe.remove();
    });

    const script = document.createElement('script');
    script.src = `${CREDLY_SCRIPT_SRC}?t=${Date.now()}`;
    script.async = true;
    document.body.appendChild(script);

    // Disable pointer events after iframes load
    setTimeout(disableIframePointerEvents, 3000);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={s.container}>
      {badges.map((badge) => (
        <div key={badge.id} className={s.badgeWrapper}>
          <div
            data-iframe-width="150"
            data-iframe-height="270"
            data-share-badge-id={badge.id}
            data-share-badge-host="https://www.credly.com"
          />
        </div>
      ))}
    </div>
  );
};

export default Certifications;
