"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Script {
  id: string;
  script_type: string;
  topic: string;
  tone: string;
  duration: string;
  language: string;
  output: string;
  created_at: string;
}

export default function ScriptDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/scripts/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        setScript(d.script);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  async function handleCopy() {
    if (!script) return;
    await navigator.clipboard.writeText(script.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!script) return;
    const blob = new Blob([script.output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scriptflow-${script.script_type.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete() {
    if (!confirm("Delete this script? This cannot be undone.")) return;
    setDeleting(true);
    const res = await fetch(`/api/scripts/${params.id}`, { method: "DELETE" });
    if (res.ok) router.push("/dashboard");
    else setDeleting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-slate-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Script not found.</p>
        <Link href="/dashboard" className="btn-secondary text-sm">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard" className="text-slate-500 hover:text-white transition-colors text-sm">
              ← Dashboard
            </Link>
          </div>

          <div className="bezel-card p-6 mb-4">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-1">
                  {script.script_type}
                </span>
                <h1 className="text-xl font-bold mt-3 mb-1">{script.topic}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{script.tone}</span>
                  <span>•</span>
                  <span>{script.duration}</span>
                  <span>•</span>
                  <span>{script.language}</span>
                  <span>•</span>
                  <span>{new Date(script.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleDownload} className="btn-secondary text-xs py-1.5 px-3">Download .txt</button>
                <button
                  onClick={handleCopy}
                  className={`text-xs py-1.5 px-3 rounded-lg font-medium border transition-all ${
                    copied
                      ? "bg-green-500/20 border-green-500/40 text-green-300"
                      : "btn-secondary"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="bezel-card-inner p-5">
              <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                {script.output}
              </pre>
            </div>
          </div>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete this script"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
