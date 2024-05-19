import { useEffect, useState } from 'react';

const EventPage = ({
  event,
  owner,
  eventCanister,
}: {
  event: any;
  owner: any;
  eventCanister: any;
}) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [hasTicket, setHasTicket] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);

  const onUpdateEvent = () => {
    /* ... */
  };

  const onBuyTickets = async () => {
    try {
      setLoading(true);
      const result = await eventCanister.buyNFTsForEvent(event.id, owner, 1);
      if (result.Ok) {
        setStatusMessage('Ticket purchased successfully!');
        setHasTicket(true);
      } else {
        setStatusMessage('Failed to purchase the ticket!');
      }
    } catch (error) {
      console.error('An error occurred while buying NFTs:', error);
      setStatusMessage('Failed to purchase the ticket!');
    } finally {
      setRefreshComponent((prevState) => !prevState);
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="text-center text-lg text-gray-600 p-4">
        No event found...
      </div>
    );
  }

  const getEventStatus = () => {
    const currentDate = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    if (currentDate < startDate) return 'Upcoming';
    if (currentDate >= startDate && currentDate <= endDate) return 'Ongoing';
    if (currentDate > endDate) return 'Past';
  };

  useEffect(() => {
    const fetchTicketStatus = async () => {
      try {
        const result = await eventCanister.getNFTsForEventForUser(
          event.id,
          owner,
        );
        if (result.Ok && result.Ok.length > 0) {
          result.Ok.forEach((ticket: any) => {
            if (ticket.eventId === event.id && ticket.owner !== event.ownerId) {
              setStatusMessage('You have purchased tickets for this event');
              setHasTicket(true);
            } else if (
              ticket.eventId === event.id &&
              ticket.owner === event.ownerId
            ) {
              setStatusMessage('Owner cannot buy tickets for their own event!');
              setHasTicket(true);
            }
          });
        } else {
          setStatusMessage('You have not purchased any tickets for this event');
          setHasTicket(false);
        }
      } catch (error) {
        setStatusMessage('Failed to retrieve ticket status');
      }
    };

    fetchTicketStatus();
  }, [event.id, owner.id, refreshComponent]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 max-w-3xl mx-auto">
      <div className="mb-4 text-center text-lg font-semibold">
        <span
          className={`px-3 py-1 rounded-full ${
            getEventStatus() === 'Upcoming'
              ? 'bg-blue-200 text-blue-800'
              : getEventStatus() === 'Ongoing'
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {getEventStatus()}
        </span>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          {event.eventName}
          {console.log(event)}
        </h2>
        <p className="text-gray-700 mb-4">{event.assetDescription}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <img
              src={event.image || 'default-image-url.jpg'}
              alt={event.eventName}
              className="rounded-lg shadow-md"
              style={{ width: '200px', height: '200px' }}
              onError={(e) => (e.currentTarget.src = 'default-image-url.jpg')}
            />
          </div>
          <div>
            <p className="text-gray-600">
              <strong>Start Date:</strong>{' '}
              {new Date(event.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>End Date:</strong>{' '}
              {new Date(event.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> {event.location || 'Not specified'}
            </p>
            <p className="text-gray-600">
              <strong>Event Time:</strong> {event.eventTime || 'Not specified'}
            </p>
            <div className="text-gray-600 mb-2">
              <strong>Location:</strong> <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{event.location || 'Not specified'}</span>
            </div>
            <div className="text-gray-600 mb-2">
              <strong>Speakers:</strong>
              {event.speakers ? (
                <div className="flex flex-wrap gap-2">
                  {event.speakers.split(/,|and/).map((speaker: string, index: number) => (
                    <span key={index} className="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800">{speaker.trim()}</span>
                  ))}
                </div>
              ) : (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Not specified</span>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          {loading ? (
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
          ) : (
            <button
              onClick={onBuyTickets}
              className={`px-4 py-2 rounded-lg text-white ${
                hasTicket
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={hasTicket}
            >
              {hasTicket ? 'Ticket Purchased' : 'Buy Ticket'}
            </button>
          )}
        </div>
        {statusMessage && (
          <div
            className={`text-center mb-4 ${
              statusMessage.includes('Failed')
                ? 'text-red-600'
                : 'text-green-600'
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
