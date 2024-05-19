import React, { useState } from 'react';
import '../index.scss';

const HostEvent = (props: any) => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    endDate: '',
    startDate: '',
    eventTime: '',
    maxNFTs: '',
    image: '',
    speakers: '',
    location: '',
  });

  const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitEvent(formData); // Function to process and store the data
    setFormData({
      eventName: '',
      description: '',
      endDate: '',
      startDate: '',
      eventTime: '',
      maxNFTs: '',
      image: '',
      speakers: '',
      location: '',
    });
  };

  type Event = {
    eventName: string;
    description: string;
    endDate: string;
    startDate: string;
    eventTime: string;
    maxNFTs: string;
    image: string;
    speakers: string;
    location: string;
  };

  // Placeholder function for event submission
  const submitEvent = (data: Event) => {
    try {
      props.eventCanister.createEvent({
        eventName: data.eventName,
        ownerId: props.owner,
        status: 'active',
        assetDescription: data.description,
        endDate: data.endDate,
        startDate: data.startDate,
        eventTime: data.eventTime,
        maxNFTs: data.maxNFTs,
        image: data.image,
        speakers: data.speakers,
        location: data.location,
      });
      const event = {
        eventName: '',
        description: '',
        endDate: '',
        startDate: '',
        eventTime: '',
        maxNFTs: '',
        image: '',
        speakers: '',
        location: '',
      };
      setFormData(event); // Clear the form data
      setSubmitStatus({
        status: 'success',
        message: 'Event submitted successfully!',
      });
    } catch (error) {
      console.error('Failed to submit event:', error);
      setSubmitStatus({
        status: 'error',
        message: 'Failed to submit event!',
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">Host an Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-300"
            >
              Event Name:
            </label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Short Description:
            </label>
            <textarea
              name="description"
              id="description"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-300"
            >
              Expiry Date:
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-300"
            >
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="eventTime"
              className="block text-sm font-medium text-gray-300"
            >
              Event Time:
            </label>
            <input
              type="time"
              name="eventTime"
              id="eventTime"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="maxNFTs"
              className="block text-sm font-medium text-gray-300"
            >
              Max Ticket NFTs:
            </label>
            <input
              type="number"
              name="maxNFTs"
              id="maxNFTs"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="speakers"
              className="block text-sm font-medium text-gray-300"
            >
              Speakers:
            </label>
            <input
              type="text"
              name="speakers"
              id="speakers"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-300"
            >
              Location:
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-300"
            >
              Event Image URL:
            </label>
            <input
              type="url"
              name="image"
              id="image"
              required
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
        {submitStatus.status && (
          <div
            className={`mt-4 p-4 rounded-md ${
              submitStatus.status === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>
    </>
  );
};

export default HostEvent;
