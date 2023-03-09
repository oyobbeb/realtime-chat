import React from "react";

export default function CurrentUsersChatListsByDate({ date }) {
  const time = new Date(date).toLocaleString();

  return (
    <div>
      {time}
    </div>
  )
}
