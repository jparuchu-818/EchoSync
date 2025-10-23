import { useState } from 'react'
import './styles.css'
import { orderSync, relationshipSync, smartWhisper, memoryCapture } from './api'
import CustomerCard from './components/CustomerCard.jsx'
import OrderBuilder from './components/OrderBuilder.jsx'
import WhisperBox from './components/WhisperBox.jsx'
import MemoryCapture from './components/MemoryCapture.jsx'

export default function App(){
  const [customerId, setCustomerId] = useState('cust_sarah')
  const [text, setText] = useState('can i get a medium iced golden eagle with oat milk and light ice')
  const [order, setOrder] = useState(null)
  const [card, setCard] = useState(null)
  const [whisper, setWhisper] = useState(null)
  const [busy, setBusy] = useState(false)

  async function fetchCard(){
    setBusy(true)
    try{
      const r = await relationshipSync(customerId)
      setCard(r.card)
    } finally { setBusy(false) }
  }

  async function buildOrder(){
    setBusy(true)
    try{
      const o = await orderSync(text)
      setOrder(o)
    } finally { setBusy(false) }
  }

  async function triggerWhisper(){
    setBusy(true)
    try{
      const w = await smartWhisper(customerId, { hesitation: false, days_since_last: 15 })
      setWhisper(w.whisper)
    } finally { setBusy(false) }
  }

  async function saveNote(note){
    setBusy(true)
    try{
      await memoryCapture({ customer_id: customerId, broista_id: 'broista_demo', note_text: note, tags: ['demo'], priority: 'normal' })
      alert('Saved!')
    } finally { setBusy(false) }
  }

  return (
    <div className="container">
      <h1 className="h1">Echo+ — The Broista's Superpower</h1>
      <div className="grid">
        <div className="card">
          <div className="kicker">RelationshipSync</div>
          <div className="row" style={{marginTop:8}}>
            <input className="input" value={customerId} onChange={e=>setCustomerId(e.target.value)} />
            <button className="btn" onClick={fetchCard} disabled={busy}>Load Customer</button>
          </div>
          {card && <CustomerCard card={card} />}
        </div>

        <div className="card">
          <div className="kicker">OrderSync</div>
          <div className="row" style={{marginTop:8}}>
            <input className="input" value={text} onChange={e=>setText(e.target.value)} />
            <button className="btn" onClick={buildOrder} disabled={busy}>Build Order</button>
          </div>
          {order && <OrderBuilder order={order} />}
        </div>

        <div className="card">
          <div className="kicker">SmartWhisper</div>
          <div className="row" style={{marginTop:8}}>
            <button className="btn" onClick={triggerWhisper} disabled={busy}>Simulate App Scan</button>
          </div>
          {whisper && <WhisperBox whisper={whisper} />}
        </div>

        <div className="card">
          <div className="kicker">Memory Capture</div>
          <MemoryCapture onSave={saveNote} />
        </div>
      </div>
    </div>
  )
}
