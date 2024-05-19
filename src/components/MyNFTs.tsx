import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import qrcode from 'qrcode';

export default function MyNFTs(props: any) {
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [transferTo, setTransferTo] = useState('');
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const [nfts, setNFTs] = useState<any[]>([]);
  const owner = props.owner;

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const result = await props.eventCanister.getNFTsForUser(owner);
        if (result.Ok) {
          const uniqueNFTs = result.Ok.reduce((acc: any[], nft: any) => {
            if (
              !acc.some((existingNFT) => existingNFT.eventId === nft.eventId)
            ) {
              acc.push(nft);
            }
            return acc;
          }, []);
          setNFTs(uniqueNFTs);
        } else {
          console.error(result.Err);
        }
      } catch (error) {
        console.error('Failed to fetch NFTs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNFTs();
  }, [owner, props.eventCanister]);

  const handleViewQR = (nft: any) => {
    setSelectedNFT(nft);
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
    setSelectedNFT(null);
  };

  const handleSaveQR = async (id: string) => {
    try {
      const url = await qrcode.toDataURL(id);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QRCode_${id}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const handleTransferNFT = async () => {
    if (!selectedNFT || !transferTo) return;
    try {
      const result = props.eventCanister.transferNFT(
        selectedNFT.id,
        owner,
        transferTo,
      );
      console.log('Transfer NFT result:', await result);
      if (result.Ok) {
        alert('NFT transferred successfully!');
        setTransferTo('');
        setShowTransferPopup(false);
        setSelectedNFT(null);
      } else {
        console.error('Failed to transfer NFT:', result.Err);
        alert('Failed to transfer NFT!');
        setTransferTo('');
        setShowTransferPopup(false);
        setSelectedNFT(null);
      }
    } catch (error) {
      console.error('Failed to transfer NFT:', error);
    }
  };

  const handleOpenTransferPopup = (nft: any) => {
    setSelectedNFT(nft);
    setShowTransferPopup(true);
  };

  const handleCloseTransferPopup = () => {
    setShowTransferPopup(false);
    setSelectedNFT(null);
    setTransferTo('');
  };

  if (loading) return <div>Loading NFTs...</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">My Event NFTs (Tickets)</h2>
      {nfts.length === 0 ? (
        <div className="text-center text-white">
          No NFTs found. Buy event tickets to get your NFTs.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="border rounded-lg p-4 shadow-lg bg-gray-800"
            >
              <img
                src={nft.imageUrl}
                className="w-full h-auto object-cover rounded-t-lg"
              />
              <div className="p-2">
                <p className="text-md font-semibold">Event ID: {nft.eventId}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleViewQR(nft)}
                  >
                    View QR
                  </button>
                  <button
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => handleOpenTransferPopup(nft)}
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showQR && selectedNFT && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <QRCode value={selectedNFT.id} size={256} />{' '}
            {/* Increased QR size */}
            <div className="mt-4 flex justify-between space-x-4">
              {' '}
              {/* Added space between buttons */}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleSaveQR(selectedNFT.id)}
              >
                Save QR
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleCloseQR}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showTransferPopup && selectedNFT && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-6">Transfer NFT</h3>
            <input
              type="text"
              placeholder="Enter User ID"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              className="w-full p-3 border rounded mb-6 text-black"
            />
            <div className="flex justify-between space-x-6">
              <button
                className="px-6 py-3 bg-green-500 text-white rounded"
                onClick={handleTransferNFT}
              >
                Transfer
              </button>
              <button
                className="px-6 py-3 bg-red-500 text-white rounded"
                onClick={handleCloseTransferPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
