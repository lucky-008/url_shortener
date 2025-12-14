import { useState } from "react";
import axios from "axios";

const Shortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCopied(false);
    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        originalUrl: url,
      });
      setShortUrl(`http://localhost:5000/api/${res.data.shortId}`);
    } catch (err) {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔗 URL Shortener</h1>
        <p style={styles.subtitle}>Make your long links short & shareable</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="url"
            placeholder="Paste your long URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div style={styles.resultBox}>
            <a href={shortUrl} target="_blank" style={styles.link}>
              {shortUrl}
            </a>
            <button onClick={copyToClipboard} style={styles.copyBtn}>
              {copied ? "Copied! ✅" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  fontFamily: "Segoe UI, sans-serif",
},

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "8px",
    fontSize: "28px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "25px",
    padding: "15px",
    background: "#f4f6ff",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    wordBreak: "break-all",
    fontSize: "14px",
  },
  
};

export default Shortener;