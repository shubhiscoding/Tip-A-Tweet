import React, { useState, useEffect } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const TweetPreview = ({ url, payTip }) => {
  const [tweetId, setTweetId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Username, setUsername] = useState("");

  useEffect(() => {
    const extractTweetId = (url) => {
      const parts = url.split("/");
      setUsername(parts[3]);
      return parts[parts.length - 1];
    };

    if (url) {
      const id = extractTweetId(url);
      if (id === null || isNaN(id)) {
        alert("Please enter a valid tweet URL");
        return;
      }
      setTweetId(id);
      setLoading(true);
    }
  }, [url]);

  const handleTweetLoad = () => {
    console.log(payTip);
    setLoading(false);
    const container = document.getElementsByClassName("twitter-tweet")[0];
    if (container) {
      const button = document.createElement("button");
      const createUsr = document.createElement("h3");
      createUsr.innerText = "Username: " + Username;
      container.appendChild(createUsr);
      button.classList.add("confirm-btn");
      button.innerText = "Confirm";
      container.appendChild(button);
      button.addEventListener("click", () => payTip());
    }
  };

  return (
    <div className="TweetPreview">
      {loading && <p>Loading...</p>}
      {tweetId && (
        <div>
          <TwitterTweetEmbed tweetId={tweetId} onLoad={handleTweetLoad} />
        </div>
      )}
      {!loading && !tweetId && (
        <p>Enter a valid tweet URL to see the preview.</p>
      )}
    </div>
  );
};

export default TweetPreview;
