export default function CommentCard({ comment }) {
  return (
    <div className="border border-slate-200 rounded-md p-3">
      <div className="text-sm text-slate-500">@{comment.author?.username || 'user'}</div>
      <div className="mt-1 text-slate-800">{comment.content}</div>
    </div>
  )
}
