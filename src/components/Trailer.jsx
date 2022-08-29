import ReactPlayer from "react-player/youtube"

const Trailer = ({trailer}) => {

  return (
    <div>
      <ReactPlayer 
        url={`http://www.youtube.com/watch?v=${trailer}`}
        controls={true}    
        />
    </div>
  )

}

export default Trailer