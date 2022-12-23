const getDownloads = async () => {
  const res = await fetch(`http://localhost:3000/api/getDownloads`);
  const { downloads } = await res.json();
  return downloads;
};

const WebScraper = async (): Promise<JSX.Element> => {
  const downloads = await getDownloads();

  return (
    <>
      <p>{downloads}</p>
    </>
  );
};

export default WebScraper;
