'use client';

import { Button, Input } from 'components';
import { ChangeEvent, FC, useState } from 'react';

const WebScraper: FC = () => {
  const [packageName, setPackageName] = useState<string>('');
  const [downloads, setDownloads] = useState<number>(0);

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPackageName(event.currentTarget.value);
  };

  const onButtonClickHandler = async () => {
    const res = await fetch(`http://localhost:3000/api/getDownloads`, {
      method: 'POST',
      body: JSON.stringify({ packageName }),
    });
    const { downloads } = await res.json();

    downloads && setDownloads(downloads);
  };

  return (
    <>
      <Input
        name="packageName"
        onChange={onInputChangeHandler}
        placeholder="Package name"
        value={packageName}
      />
      <Button color="peach" onClick={onButtonClickHandler}>
        Reload
      </Button>
      <p>{downloads}</p>
    </>
  );
};

export default WebScraper;
