import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../utils/api.js";
import Loader from "../components/Loader.jsx";
import CommentCard from "../components/CommentCard.jsx";
import LikeButton from "../components/LikeButton.jsx";
import ShareButton from "../components/ShareButton.jsx";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const fallbackPosts = {
    1: {
      id: 1,
      title: "The Future of Quantum Computing",
      content:
        "Quantum computing isn’t magic—it’s math that bends the rules we’re used to. It can tackle optimization and cryptography problems classical machines struggle with.\n\nIt’s early: error rates are high and hardware is delicate, but progress is steady—better qubits, smarter error correction, more practical algorithms.\n\nIf you build software, learn the models and follow the research. Hype fades; fundamentals stick.",
      author: { username: "science" },
      likes: 42,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200",
    },
    2: {
      id: 2,
      title: "CRISPR Gene Editing Breakthrough",
      content:
        "CRISPR keeps getting sharper—precision is up, off‑target effects are down. The exciting part isn’t science fiction; it’s practical fixes for real conditions.\n\nThe ethics aren’t optional. Transparency, oversight, and clear boundaries matter as much as the tech.\n\nUseful beats flashy: if a tool helps clinicians and patients today, it’s worth building.",
      author: { username: "science" },
      likes: 35,
      liked: false,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
    },
    3: {
      id: 3,
      title: "Mars Mission Updates",
      content:
        "The best Mars updates are the boring ones: better rovers, sturdier landers, more resilient systems. Quiet progress beats loud promises.\n\nLong‑term missions are logistics plus patience. Test, repeat, measure again.\n\nIf we go, it will be because we took a thousand small steps well, not one giant leap badly.",
      author: { username: "science" },
      likes: 38,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200",
    },
    4: {
      id: 4,
      title: "Hidden Gems of Southeast Asia",
      content:
        "Skip the crowds and find the quiet corners. The best spots are tucked behind markets, up side streets, and along rivers at sunrise.\n\nTravel slower. Talk to locals. Eat where the menu isn’t translated. The trip becomes learning how a place breathes, not checking boxes.\n\nWorking on the road? Pick cities with decent infrastructure and honest Wi‑Fi. Comfort fuels curiosity.",
      author: { username: "travel" },
      likes: 37,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    },
    5: {
      id: 5,
      title: "Digital Nomad Guide to Europe",
      content:
        "Europe works well for remote folks if you plan around costs, visas, and connectivity. Think hub cities with good rail links and co‑working spaces.\n\nSet routines. Work blocks, walking breaks, and real evenings. Availability isn’t productivity.\n\nSpend locally and learn the basics of the language—you’ll get better food and better conversations.",
      author: { username: "travel" },
      likes: 34,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200",
    },
    6: {
      id: 6,
      title: "Sustainable Travel in 2024",
      content:
        "Travel isn’t truly green, but it can be responsible: trains over short flights, reusable basics, and spending with businesses that keep places healthy.\n\nPlan fewer moves and longer stays. The planet doesn’t need your checklist; it needs restraint.\n\nIf a destination feels fragile, treat it like a home, not a backdrop.",
      author: { username: "travel" },
      likes: 29,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200",
    },
    7: {
      id: 7,
      title: "AI Revolution in Healthcare",
      content:
        "AI helps by shaving time off diagnoses and surfacing patterns clinicians can’t reasonably parse. It should augment, not replace.\n\nGuardrails matter: privacy first, auditability, and human oversight.\n\nBuild quiet tools that make real workflows better. Lives aren’t a playground for clever code.",
      author: { username: "tech" },
      likes: 33,
      liked: false,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200",
    },
    8: {
      id: 8,
      title: "Web3 and the Future of Internet",
      content:
        "Web3 gets interesting when it stops shouting—portable identities, quiet ownership, and low‑friction payments.\n\nIf you can explain the benefit without buzzwords, you might have something. If not, it’s probably noise.\n\nBuild for people, not token charts.",
      author: { username: "tech" },
      likes: 24,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200",
    },
    9: {
      id: 9,
      title: "Cybersecurity Trends 2024",
      content:
        "Security isn’t a tool list—it’s habits. Patch quickly, minimize permissions, and log with intention.\n\nHumans are the line of defense. Make secure defaults the easy path.\n\nBoring wins: backups, least privilege, and tested incident response.",
      author: { username: "tech" },
      likes: 28,
      liked: false,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200",
    },
    10: {
      id: 10,
      title: "Minimalist Living Guide",
      content:
        "Minimalism isn’t owning nothing—it’s owning intentionally. Start small: one drawer, one shelf, one app. Keep what you use, ditch what steals attention.\n\nThe reward is a clear head, not just a clean room.\n\nApply it to work too: fewer tools, fewer notifications, fewer half‑started projects.",
      author: { username: "lifestyle" },
      likes: 29,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
    },
    11: {
      id: 11,
      title: "Mental Health in Remote Work",
      content:
        "Remote works if the boundaries are real. Set hours, take walks, turn off the noise.\n\nDon’t optimize for availability—optimize for output. It’s better for your brain and your team.\n\nIf you lead, model healthy behavior. Culture is what you do.",
      author: { username: "lifestyle" },
      likes: 23,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200",
    },
    12: {
      id: 12,
      title: "Sustainable Fashion Choices",
      content:
        "A good wardrobe doesn’t need a weekly refresh. Buy fewer, better pieces. Repair instead of replace.\n\nMaterials matter: natural fibers, responsible dyeing, and brands that publish supply chains.\n\nStyle isn’t trend‑chasing—it’s consistency.",
      author: { username: "lifestyle" },
      likes: 22,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200",
    },
    13: {
      id: 13,
      title: "Wildlife Conservation Success Stories",
      content:
        "Recovery takes patience and local trust. Species come back when funding is steady, corridors are protected, and communities benefit.\n\nRangers who know every trail and scientists who share data openly make it work.\n\nSupport proven programs over viral campaigns.",
      author: { username: "animals" },
      likes: 26,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200",
    },
    14: {
      id: 14,
      title: "Urban Wildlife Adaptation",
      content:
        "Cities aren’t empty of nature—they’re a new habitat. Animals adapt fast: new diets, new routes, new rhythms.\n\nWe can help by building greener corridors and reducing barriers.\n\nWatching how wildlife adjusts teaches resilience worth copying.",
      author: { username: "animals" },
      likes: 20,
      liked: false,
      image:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200",
    },
    15: {
      id: 15,
      title: "Ocean Plastic and Marine Life",
      content:
        "Plastic is a slow disaster. The fixes are practical: less single‑use, smarter waste systems, and cleanup funded long‑term.\n\nLocal projects and international coordination both matter.\n\nSupport the teams doing the steady work; it’s how oceans heal.",
      author: { username: "animals" },
      likes: 24,
      liked: false,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
    },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Try backend first
      try {
        const [{ data: p }, { data: c }] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/posts/${id}/comments`),
        ]);
        setPost(p);
        setComments(c.items || c);
      } catch (backendErr) {
        const fp = fallbackPosts[id];
        if (fp) {
          setPost(fp);
          setComments([
            {
              id: 1,
              content: "Loved the clarity and the practical approach.",
              author: { username: "reader1" },
            },
            {
              id: 2,
              content: "This helped me clean up my own API design.",
              author: { username: "reader2" },
            },
          ]);
        } else {
          setPost({
            id,
            title: "Post",
            content: "This post will be available soon.",
            author: { username: "system" },
            likes: 0,
            liked: false,
          });
          setComments([]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const toggleLike = async () => {
    if (!user) {
      alert("Please sign in to like posts");
      return;
    }
    try {
      await api.post(`/posts/${id}/like`);
      setPost((prev) => ({
        ...prev,
        liked: !prev.liked,
        likes: (prev.likes || 0) + (prev.liked ? -1 : 1),
      }));
    } catch {}
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to comment");
      return;
    }
    if (!commentText.trim()) return;
    try {
      const { data } = await api.post(`/posts/${id}/comments`, {
        content: commentText,
      });
      setComments((prev) => [data, ...prev]);
      setCommentText("");
    } catch (err) {
      alert("Failed to add comment. Please try again.");
    }
  };

  if (loading) return <Loader />;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="space-y-6">
      {post.image && (
        <img className="w-full rounded-lg" src={post.image} alt="cover" />
      )}
      <div>
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="text-slate-600 mt-2">{post.content}</p>
        <div className="mt-3 flex items-center gap-3">
          <LikeButton
            liked={post.liked}
            count={post.likes || 0}
            onToggle={toggleLike}
          />
          <ShareButton url={window.location.href} title={post.title} />
          <span className="text-sm text-slate-500">
            by @{post.author?.username || "author"}
          </span>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Comments</h2>
        {user ? (
          <form onSubmit={addComment} className="flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md"
              placeholder="Add a comment..."
            />
            <button className="px-3 py-2 rounded-md bg-slate-900 text-white">
              Comment
            </button>
          </form>
        ) : (
          <div className="border border-slate-200 rounded-md p-4 text-center text-sm text-slate-600">
            <Link to="/login" className="text-brand-600 hover:underline">
              Sign in
            </Link>{" "}
            to comment on this post
          </div>
        )}
        <div className="space-y-2">
          {comments.length === 0 && (
            <div className="text-sm text-slate-500">No comments yet</div>
          )}
          {comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
