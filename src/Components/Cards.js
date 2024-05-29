export default function Cards(props) {
    return (
        <div>
          <p>{props.name}</p>
        </div>
    );
}


{/* <div style={{
    backgroundImage: `url(${props.img})`,
    width: "300px",
    height: "300px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "12px"
}}>
</div>
<div style={{ marginBottom: "0", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <h1>{props.country}</h1>
    <h4><i className="fa-solid fa-star" style = {{color : "gold"}}></i> {props.reivew}</h4>
</div>
<h2 style={{ fontWeight: "normal", color: "gray", marginTop: "0" }}>{props.dec}</h2>
<h3>{props.price}$ <span style={{ fontWeight: "normal" }}>night</span></h3> */}