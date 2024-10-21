import ReactStars from "react-rating-stars-component";

function Stars({ value }) {
  return (
    <>
      <ReactStars
        count={5}
        value={value}
        edit={false}
        size={24}
        activeColor="#ffd700"
      />
    </>
  );
}
export default Stars;
