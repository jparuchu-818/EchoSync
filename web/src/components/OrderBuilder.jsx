export default function OrderBuilder({ order }){
  const it = order.items?.[0] || {}
  return (
    <div style={{marginTop:12}}>
      <div>
        <span className="badge">{it.name || '—'}</span>
        <span className="badge">{it.size || '—'}</span>
        <span className="badge">{it.temp || '—'}</span>
        {(it.modifiers||[]).map(m => <span key={m} className="badge">{m}</span>)}
      </div>
      <div className="hint" style={{marginTop:6}}>Status: <b>{order.status}</b> • Confidence: <b>{Math.round((order.confidence||0)*100)}%</b> • Price: ${order.price?.toFixed?.(2) || order.price}</div>
    </div>
  )
}
