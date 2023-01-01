'use client';

import { Button, Input } from 'components';
import { MESSAGE_SUCCESS } from 'pages/api/getDownloads/getDownloads.consts';
import { ResponseData } from 'pages/api/getDownloads/getDownloads.types';
import { ChangeEvent, FC, useState } from 'react';

const WebScraper: FC = () => {
  const [downloads, setDownloads] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [packageName, setPackageName] = useState<string>('');

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setPackageName(event.currentTarget.value);
  };

  const onButtonClickHandler = async (): Promise<void> => {
    setLoading(true);

    const res = await fetch(`http://localhost:3000/api/getDownloads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ packageName }),
    });
    const { downloads, message } = (await res.json()) as ResponseData;

    setDownloads(downloads);
    setMessage(message);
    setLoading(false);
  };

  return (
    <>
      <h1>Web scraper</h1>
      <Input name="packageName" onChange={onInputChangeHandler} placeholder="Package name" value={packageName} />
      <Button color="peach" isDisabled={!packageName} onClick={onButtonClickHandler}>
        {loading ? 'Loading...' : 'Get downloads count'}
      </Button>
      {!loading &&
        (message === MESSAGE_SUCCESS ? (
          <>
            <p>{message}</p>
            <p>
              This package has <strong>{downloads}</strong> downloads.
            </p>
          </>
        ) : (
          <p>{message}</p>
        ))}
    </>
  );
};

export default WebScraper;
