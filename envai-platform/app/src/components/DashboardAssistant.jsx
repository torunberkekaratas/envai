import { useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import { TbRobot } from 'react-icons/tb'
import { EMPTY_MESSAGES, useChatStore } from '../store/useChatStore'
import { currentUser, emissionSummary } from '../data/platformData.jsx'

// TODO: Gerçek bir LLM API'sine bağlanmak için apiKey ve apiEndpoint doldurulacak.
// apiKey boşken widget, kullanıcının dashboard verilerine dayanan kural tabanlı (mock) yanıtlar üretir.
const CHATBOT_CONFIG = { apiKey: '', apiEndpoint: '' }

function buildGreeting(user) {
  return `Merhaba ${user.name.split(' ')[0]}! Ben Envai Emisyon Danışmanınız. Toplam emisyonunuz ${emissionSummary.totalEmission} (${emissionSummary.totalDelta}). Hangi alanda azaltım fikri almak istersiniz?`
}

function findReply(message, user) {
  const lower = message.toLocaleLowerCase('tr-TR')
  const scope1 = emissionSummary.scopes[0]
  const scope2 = emissionSummary.scopes[1]
  const scope3 = emissionSummary.scopes[2]

  if (lower.includes('kapsam 1') || lower.includes('scope 1')) {
    return `Kapsam 1 emisyonunuz ${scope1.value} (toplamın %${scope1.share}'i, ${scope1.delta}). Filo ve sabit yanma kaynaklarınızda yakıt verimliliği iyileştirmeleri burada en hızlı etkiyi sağlar.`
  }
  if (lower.includes('kapsam 2') || lower.includes('scope 2')) {
    return `Kapsam 2 emisyonunuz ${scope2.value} (toplamın %${scope2.share}'i, ${scope2.delta}). Yenilenebilir enerji sertifikası (GO/REC) alımı veya tesis bazlı güneş yatırımı bu kalemi doğrudan düşürür.`
  }
  if (lower.includes('kapsam 3') || lower.includes('scope 3') || lower.includes('tedarik')) {
    return `Kapsam 3 emisyonunuz ${scope3.value}, toplam ayak izinizin %${scope3.share}'ini oluşturuyor — en büyük kalem. En yüksek emisyon kaynağınız "${emissionSummary.topSources[0][0]}". Bu tedarikçi(ler)den emisyon verisi toplamaya öncelik verin.`
  }
  if (lower.includes('en yüksek') || lower.includes('en büyük') || lower.includes('kaynak')) {
    return `En yüksek emisyon kaynağınız "${emissionSummary.topSources[0][0]}" (${emissionSummary.topSources[0][1].toLocaleString('tr-TR')} tCO₂e). Burada tedarikçi değişimi veya süreç iyileştirmesi en yüksek etkiyi sağlayacaktır.`
  }
  if (lower.includes('esg')) {
    return `ESG skorunuz ${emissionSummary.esgScore}. Skoru artırmak için Kapsam 3 veri kalitesini ve tedarikçi ESG anketlerinizi tamamlama oranını yükseltmenizi öneririm.`
  }
  if (lower.includes('uyumluluk') || lower.includes('compliance')) {
    return `Uyumluluk skorunuz ${emissionSummary.complianceScore}. CSRD ve CBAM görevlerinizdeki bekleyen kalemleri tamamlamak skoru hızla yükseltir.`
  }
  if (lower.includes('nasıl azalt') || lower.includes('azaltabilirim') || lower.includes('düşürebilirim') || lower.includes('öneri')) {
    return `Toplam emisyonunuz ${emissionSummary.totalEmission}, geçen aya göre ${emissionSummary.totalDelta}. En büyük pay Kapsam 3'te (%${scope3.share}). Önceliğiniz tedarikçi veri kalitesini artırmak olmalı; ardından Kapsam 2 için yenilenebilir enerji seçeneklerini değerlendirebilirsiniz.`
  }
  if (lower.includes('merhaba') || lower.includes('selam')) {
    return buildGreeting(user)
  }
  if (lower.includes('emisyon') || lower.includes('karbon') || lower.includes('enerji')) {
    return 'Size dashboard verilerinize göre daha net bir öneri sunabilmem için: Kapsam 1, 2 ya da 3 emisyonlarınızdan hangisiyle ilgileniyorsunuz, ya da en yüksek emisyon kaynağınızı mı öğrenmek istersiniz?'
  }
  return 'Ben sadece sizin dashboard verilerinize dayanarak karbon emisyonu azaltma konusunda yardımcı oluyorum. Kapsam 1/2/3 emisyonlarınız, en yüksek emisyon kaynağınız veya ESG skorunuz hakkında soru sorabilirsiniz.'
}

async function getReply(message, user) {
  if (CHATBOT_CONFIG.apiKey && CHATBOT_CONFIG.apiEndpoint) {
    // Gerçek API entegrasyonu buraya eklenecek.
    try {
      const res = await fetch(CHATBOT_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CHATBOT_CONFIG.apiKey}` },
        body: JSON.stringify({ message, userId: user.id, context: emissionSummary })
      })
      const data = await res.json()
      return data.reply || findReply(message, user)
    } catch {
      return findReply(message, user)
    }
  }
  return findReply(message, user)
}

export default function DashboardAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const messages = useChatStore((state) => state.conversations[currentUser.id] || EMPTY_MESSAGES)
  const addMessage = useChatStore((state) => state.addMessage)

  function open() {
    setIsOpen(true)
    if (messages.length === 0) {
      addMessage(currentUser.id, { role: 'bot', text: buildGreeting(currentUser) })
    }
  }

  async function handleSend() {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    addMessage(currentUser.id, { role: 'user', text })
    const reply = await getReply(text, currentUser)
    addMessage(currentUser.id, { role: 'bot', text: reply })
  }

  return (
    <>
      <button
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 transition"
        aria-label="Emisyon Danışmanını Aç"
      >
        {isOpen ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a1f29]">
          <div className="flex items-center justify-between bg-slate-950 px-4 py-3 text-white dark:bg-[#071922]">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/20 text-emerald-400"><TbRobot /></div>
              <div>
                <p className="text-sm font-bold leading-tight">Emisyon Danışmanı</p>
                <p className="text-[11px] text-slate-400">{currentUser.name} için kişiselleştirildi</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><FiX size={16} /></button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto bg-slate-50 p-3 dark:bg-white/[0.02]">
            {messages.map((message, index) => (
              <p key={index} className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-5 ${message.role === 'user' ? 'ml-auto bg-emerald-600 text-white' : 'bg-white text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200'}`}>{message.text}</p>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-white/10">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSend()}
              placeholder="Emisyonlarınız hakkında sorun..."
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-white/5"
            />
            <button onClick={handleSend} className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white"><FiSend size={14} /></button>
          </div>
        </div>
      )}
    </>
  )
}
