const Card = (props: any) => {
  const { image, description } = props;

  return (
    <div
      style={{
        width: "300px",
        height: "400px",
        border: "1px solid gray",
        borderRadius: 5,
      }}
    >
      <img
        src={image}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div style={{ padding: "5px 10px" }}>
        <p style={{ fontWeight: "bold", fontSize: "15px" }}>
          Description: {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
