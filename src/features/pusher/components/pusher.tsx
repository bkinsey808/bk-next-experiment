"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { sendMessage } from "../actions/send-message";
import { pusherClient } from "../helpers/pusherClient";

const YOUR_CHANNEL_NAME = "my-channel2";
const YOUR_EVENT_NAME = "my-event";

export default function PusherPage() {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(YOUR_CHANNEL_NAME);

    channel.bind(YOUR_EVENT_NAME, ({ message }: { message: string }) => {
      setNotifications([...notifications, message]);
    });

    return () => {
      pusherClient.unsubscribe(YOUR_CHANNEL_NAME);
    };
  }, [notifications]);

  return (
    <main>
      <h1>pusher2!</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const message = event.currentTarget.message.value;
          sendMessage({
            channel: YOUR_CHANNEL_NAME,
            event: YOUR_EVENT_NAME,
            message,
          });
        }}
      >
        <input
          type="text"
          name="message"
          id="message"
          className="m-2 rounded border-2 border-gray-300 bg-transparent p-2"
        />
        <button>Send event</button>
      </form>
      <div>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((message, index: number) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>

      <br />
      <Link href="/dashboard">dashboard</Link>
      <br />
      <Link href="/nested">nested</Link>
    </main>
  );
}
