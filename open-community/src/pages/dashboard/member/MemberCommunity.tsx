import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, MessageSquare, Heart, Trash2, Edit } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

interface Comment {
  id: number;
  author_email: string;
  content: string;
  created_at: string;
  like_count: number;
}

interface Post {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
  like_count: number;
  comments: Comment[];
}

export default function MemberCommunity() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [openComments, setOpenComments] = useState<number[]>([]);
  const [editingPost, setEditingPost] = useState<{ id: number; content: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.getPosts();
      setPosts(data);
    } catch {
      setError('Erreur lors du chargement des posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    if (!message.trim()) return;
    setIsPosting(true);
    try {
      const newPost = await api.createPost(message);
      setPosts([newPost, ...posts]);
      setMessage('');
    } catch {
      setError('Erreur lors de la publication');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const res = await api.likePost(postId);
      setLikedPosts((prev) =>
        res.liked
          ? [...prev, postId]
          : prev.filter((id) => id !== postId)
      );
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, like_count: res.liked ? p.like_count + 1 : p.like_count - 1 }
            : p
        )
      );
    } catch {
      setError('Erreur lors du like');
    }
  };

  const handleComment = async (postId: number) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;
    try {
      const newComment = await api.commentPost(postId, content);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, comments: [...p.comments, newComment] }
            : p
        )
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    } catch {
      setError('Erreur lors du commentaire');
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await api.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  const handleEdit = async (postId: number) => {
    if (!editingPost) return;
    try {
      const updated = await api.updatePost(postId, editingPost.content);
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, content: updated.content } : p))
      );
      setEditingPost(null);
    } catch {
      setError('Erreur lors de la modification');
    }
  };

  const toggleComments = (postId: number) => {
    setOpenComments((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${Math.floor(hours / 24)} j`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const colors = [
    'bg-teal-dark', 'bg-navy-deep', 'bg-lime-bright',
  ];
  const getColor = (name: string) => colors[name.charCodeAt(0) % colors.length];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Communauté</h1>
          <p className="text-slate-500 text-sm mt-1">
            Échange, partage et progresse avec les membres.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-lime-bright/10 text-teal-dark px-4 py-2 rounded-full">
          <Users size={14} />
          <span className="text-xs font-bold">{posts.length} posts</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-500 text-sm font-semibold px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

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
          <span className="text-xs text-slate-400">
            {message.length}/500 caractères
          </span>
          <button
            onClick={handlePost}
            disabled={isPosting || !message.trim()}
            className="bg-teal-dark text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-40"
          >
            {isPosting ? 'Publication...' : 'Publier'}
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Feed */}
      {posts.length === 0 ? (
        <div className="text-center py-16 text-slate-400 font-semibold">
          Aucun post pour l'instant. Sois le premier à partager !
        </div>
      ) : (
        posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border border-slate-100 rounded-2xl p-5"
          >
            {/* Post header */}
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-full ${getColor(post.author_name)} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                {getInitials(post.author_name)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-slate-900">
                    {post.author_name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {formatTime(post.created_at)}
                    </span>
                    {/* Edit/Delete only for own posts */}
                    {user && post.author_name === `${user.first_name} ${user.last_name}` && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingPost({ id: post.id, content: post.content })}
                          className="text-slate-300 hover:text-teal-dark transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-slate-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit mode */}
                {editingPost?.id === post.id ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      rows={3}
                      value={editingPost.content}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, content: e.target.value })
                      }
                      className="w-full text-sm border-2 border-teal-dark rounded-xl p-3 focus:outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post.id)}
                        className="text-xs font-bold text-white bg-teal-dark px-4 py-2 rounded-xl hover:opacity-90 transition-all"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingPost(null)}
                        className="text-xs font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    {post.content}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      likedPosts.includes(post.id)
                        ? 'text-red-400'
                        : 'text-slate-400 hover:text-red-400'
                    }`}
                  >
                    <Heart
                      size={13}
                      className={likedPosts.includes(post.id) ? 'fill-red-400' : ''}
                    />
                    {post.like_count}
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-teal-dark transition-colors"
                  >
                    <MessageSquare size={13} />
                    {post.comments.length} commentaire(s)
                  </button>
                </div>

                {/* Comments */}
                {openComments.includes(post.id) && (
                  <div className="mt-4 flex flex-col gap-3">

                    {/* Comment list */}
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className={`w-7 h-7 rounded-full ${getColor(comment.author_email)} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                          {comment.author_email[0].toUpperCase()}
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-xl px-3 py-2">
                          <p className="text-xs font-bold text-slate-700">
                            {comment.author_email}
                          </p>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Comment input */}
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleComment(post.id);
                        }}
                        placeholder="Ajouter un commentaire..."
                        className="flex-1 text-xs border-2 border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-dark transition-colors"
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                        className="bg-teal-dark text-white px-3 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all disabled:opacity-40"
                      >
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}