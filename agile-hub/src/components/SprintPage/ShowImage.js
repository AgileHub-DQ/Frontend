import React from 'react';

function ShowImage({imageURL}) {
    console.log("showImage page -> imageURL: "+imageURL);

  return (
    <div className="showImage">
        <div>image</div>
      {/* <img src={imageURL} alt="Uploaded File" /> */}
    </div>
  );
}

export default ShowImage;
