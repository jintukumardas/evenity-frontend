import Header from './Header';
import { useState, useEffect } from 'react';
import '../index.scss';
import Modal from 'react-modal';
import EventPage from './EventPage';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ViewEvents = (props: any) => {
  type Event = {
    id: string;
    eventName: string;
    assetDescription: string;
    endDate: string;
    startDate: string;
    eventTime: string;
    maxNFTs: string;
    image: string;
    ownerId: string;
    status: string;
    speakers: string;
    location: string;
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    },
    content: {
      backgroundColor: 'white', // White background for the modal content
      border: 'none', // Remove border
      borderRadius: '8px', // Rounded corners
      padding: '20px', // Padding inside the modal
      maxWidth: '600px', // Max width of the modal
      margin: 'auto', // Center the modal
    },
  };

  const owner = props.owner;
  const eventCanister = props.eventCanister;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function fetchEvents() {
    const response = await props.eventCanister.getAllEvents();
    const parsedEvents = response.Ok.map((event: Event) => ({
      id: event.id,
      eventName: event.eventName,
      assetDescription: event.assetDescription,
      endDate: event.endDate,
      startDate: event.startDate,
      eventTime: event.eventTime,
      maxNFTs: event.maxNFTs,
      image: event.image,
      ownerId: event.ownerId,
      status: event.status,
      speakers: event.speakers,
      location: event.location,
    }));
    setEvents(parsedEvents);
  }

  useEffect(() => {
    const loadEvents = async () => {
      try {
        await fetchEvents();
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  const getEventStatus = (event: Event) => {
    const currentDate = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    if (currentDate < startDate) return 'Upcoming';
    if (currentDate >= startDate && currentDate <= endDate) return 'Ongoing';
    if (currentDate > endDate) return 'Past';
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-white dark:text-white">
          Events List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 && <div className='text-white'>No events found.</div>}

          {events.map((event) => {
            const eventStatus = getEventStatus(event);
            const isPastEvent = eventStatus === 'Past';
            return (
              <div
                key={event.id}
                className={`relative rounded-lg shadow-lg ${
                  isPastEvent ? 'bg-gray-300' : 'bg-white dark:bg-gray-800'
                } p-4 flex flex-col`}
              >
                {isPastEvent && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-200 bg-opacity-50">
                    <span className="text-xl font-bold text-red-800">
                      Ended
                    </span>
                  </div>
                )}
                <img
                  src={event.image}
                  alt="event"
                  className="rounded-t-lg object-cover mb-4"
                  style={{ height: '200px', opacity: isPastEvent ? 0.5 : 1 }}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className={`text-xl font-semibold ${
                        isPastEvent
                          ? 'text-gray-600'
                          : 'text-gray-900 dark:text-white'
                      } mb-2`}
                    >
                      {event.eventName}
                    </h3>
                    <p
                      className={`text-gray-700 ${
                        isPastEvent
                          ? 'dark:text-gray-500'
                          : 'dark:text-gray-300'
                      } mb-4`}
                    >
                      {event.assetDescription}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Start: {new Date(event.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      End: {new Date(event.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status: {eventStatus}
                    </p>
                  </div>
                  <button
                    onClick={() => openModal(event)}
                    className={`mt-4 ${
                      isPastEvent ? 'bg-gray-400' : 'bg-blue-500'
                    } text-white py-2 px-4 rounded hover:${
                      isPastEvent ? 'bg-gray-500' : 'bg-blue-600'
                    } transition duration-200`}
                    disabled={isPastEvent}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
        className="relative bg-white rounded-lg shadow-xl p-6"
        style={customStyles}
      >
        {selectedEvent && (
          <EventPage
            event={selectedEvent}
            owner={owner}
            eventCanister={eventCanister}
          />
        )}

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-black hover:text-red-800"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </Modal>
    </>
  );
};

export default ViewEvents;
