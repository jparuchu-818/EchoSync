export default function CustomerCard({ card }){
  return (
    <div style={{marginTop:12}}>
      <h3 className="h2">{card.header}</h3>
      <div className="hint">{card.stats}</div>
      {card.usual && (
        <div style={{marginTop:8}}>
          <span className="badge">{card.usual.drink}</span>
          <span className="badge">{card.usual.size}</span>
          <span className="badge">{card.usual.temp}</span>
        </div>
      )}
      {card.last_note && <div style={{marginTop:8}} className="hint">Last note: {card.last_note}</div>}
    </div>
  )
}
