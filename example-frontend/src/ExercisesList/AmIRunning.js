import React from "react";

const AmIRunning = () => {
  const secretMessage = window.atob(
    "Q29uZ3JhdHVsYXRpb25zISBZb3UgY29uZmlndXJlZCB5b3VyIHBvcnRzIGNvcnJlY3RseSE="
  );
  return <span>{secretMessage}</span>;
};

export default AmIRunning;
