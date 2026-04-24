import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, MessageSquare } from 'lucide-react';

const feedItems = [
  {
    initials: 'KD',
    name: 'Kofi Diallo',
    role: 'Dev Web',
    text: 'Je viens de terminer le module CSS — merci à tous pour l\'aide ! C\'est vraiment une super communauté.',
    time: 'Il y a 12 min',
    likes: 8,
    replies: 3,
    color: 'bg-teal-dark',
  },
  {
    initials: 'FT',
    name: 'Fatou Traoré',
    role: 'Data Analyst',
    text: 'Quelqu\'un a des ressources sur les API REST pour débutants ? Je bloque sur la gestion des erreurs.',
    time: 'Il y a 34 min',
    likes: 4,
    replies: 6,
    color: 'bg-navy-deep',
  },
  {
    initials: 'MB',
    name: 'Moussa Ba',
    role: 'Entrepreneur',
    text: 'Mon projet portfolio est enfin en ligne ! Des semaines de travail. Feedback bienvenu 🙏',
    time: 'Il y a 1h',
    likes: 21,
    replies: 9,
    color: 'bg-lime-bright',
  },
  {
    initials: 'SA',
    name: 'Salimata Amadou',
    role: 'UI/UX Designer',
    text: 'Je partage un article super intéressant sur le design system en Figma. Très utile pour nos projets.',
    time: 'Il y a 2h',
    likes: 15,
    replies: 2,
    color: 'bg-teal-dark',
  },
  {
    initials: 'YC',
    name: 'Youssef Cherif',
    role: 'Dev Web',
    text: 'Rappel : le Tech Meetup d\'Abidjan est dans 2 semaines. Qui vient ? On peut s\'organiser en groupe !',
    time: 'Il y a 3h',
    likes: 12,
    replies: 7,
    color: 'bg-navy-deep',
  },
];

const onlineMembers = [
  { initials: 'SA', name: 'Salimata Amadou', role: 'UI/UX Designer', color: 'bg-lime-bright' },
  { initials: 'YC', name: 'Youssef Cherif', role: 'Dev Web', color: 'bg-navy-deep' },
  { initials: 'ND', name: 'Nadia Diop', role: 'Data Analyst', color: 'bg-teal-dark' },
  { initials: 'IB', name: 'Ibrahim Bah', role: 'Entrepreneur', color: 'bg-lime-bright' },
  { initials: 'AM', name: 'Awa Mbaye', role: 'Dev Mobile', color: 'bg-teal-dark' },
];

export default function MemberCommunity() {
  const [message, setMessage] = useState('');
  const [posted, setPosted] = useState(false);

  const handlePost = () => {
    if (!message.trim()) return;
    setPosted(true);
    setMessage('');
    setTimeout(() => setPosted(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Communauté</h1>
          <p className="text-slate-500 text-sm mt-1">Échange, partage et progresse avec les membres.</p>
        </div>
        <div className="flex items-center gap-2 bg-lime-bright/10 text-teal-dark px-4 py-2 rounded-full">
          <Users size={14} />
          <span className="text-xs font-bold">127 membres en ligne</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Feed */}
        <div className="md:col-span-2 flex flex-col gap-4">

          {/* Post input */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Partage quelque chose avec la communauté..."
              className="w-full text-sm text-slate-700 placeholder:text-slate-300 resize-none focus:outline-none"
            />
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-3">
              {posted && (
                <span className="text-xs text-lime-bright font-semibold">
                  Message publié !
                </span>
              )}
              {!posted && <span />}
              <button
                onClick={handlePost}
                className="bg-teal-dark text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
              >
                Publier
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Feed items */}
          {feedItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white border border-slate-100 rounded-2xl p-5"
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full ${item.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                  {item.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-900">{item.name}</span>
                    <span className="text-xs text-slate-400">{item.role}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">{item.text}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-dark transition-colors font-semibold">
                      ♥ {item.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-dark transition-colors font-semibold">
                      <MessageSquare size={12} />
                      {item.replies} réponses
                    </button>
                    <span className="text-xs text-slate-300 ml-auto">{item.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Online Members */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Membres en ligne</h3>
            <div className="flex flex-col gap-3">
              {onlineMembers.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${member.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.role}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-lime-bright shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Stats communauté</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Membres total', value: '500+' },
                { label: 'Posts cette semaine', value: '134' },
                { label: 'Questions répondues', value: '89%' },
                { label: 'Pays représentés', value: '12' },
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{stat.label}</span>
                  <span className="text-xs font-black text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}