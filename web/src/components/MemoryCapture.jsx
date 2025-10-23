import { useState } from 'react'

export default function MemoryCapture({ onSave }){
  const [note, setNote] = useState('Race is in two weeks, she is excited')
  return (
    <div>
      <div className="row" style={{marginTop:8}}>
        <input className="input" value={note} onChange={e=>setNote(e.target.value)} placeholder="5-second voice note (text sim)" />
        <button className="btn" onClick={()=>onSave(note)}>Save</button>
      </div>
      <div className="hint" style={{marginTop:6}}>(In MVP we type; production would use Transcribe.)</div>
    </div>
  )
}
